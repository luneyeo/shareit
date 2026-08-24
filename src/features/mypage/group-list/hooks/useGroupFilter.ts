"use client";

import { useMemo, useState } from "react";
import { useMyGroupList } from "@/features/dashboard/hooks/useMyGroupList";
import {
  GROUP_FILTERS,
  type GroupFilter,
} from "@/features/mypage/group-list/constants/groupFilters";

/**
 * 전체 그룹 목록의 필터 탭 상태와, 선택된 필터로 걸러진 그룹 목록을 돌려주는 훅.
 *
 * 목록은 getMyGroups(useMyGroupList)로 조회하며, 필터 탭은 각 그룹의 role로 거른다.
 *
 * @example
 * const { filters, filter, setFilter, groups, total } = useGroupFilter();
 */
export function useGroupFilter() {
  const [filter, setFilter] = useState<GroupFilter>("all");
  const { data, isPending, isError, refetch } = useMyGroupList();

  const groups = useMemo(() => {
    const list = data ?? [];
    return filter === "all" ? list : list.filter((group) => group.role === filter);
  }, [data, filter]);

  return {
    filters: GROUP_FILTERS,
    filter,
    setFilter,
    groups,
    total: groups.length,
    isPending,
    isError,
    refetch,
    // 필터와 무관하게, 조회에 성공했지만 속한 그룹이 아예 없을 때만 참.
    // (로딩 중·에러일 때는 false여서 빈 상태가 에러를 가리지 않는다.)
    isEmpty: !isPending && !isError && (data?.length ?? 0) === 0,
  };
}

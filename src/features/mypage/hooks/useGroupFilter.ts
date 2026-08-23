"use client";

import { useMemo, useState } from "react";
import { GROUP_FILTERS, type GroupFilter } from "@/features/mypage/constants/groupFilters";
import { MOCK_GROUPS } from "@/features/mypage/constants/mockGroups";

/**
 * 전체 그룹 목록의 필터 탭 상태와, 선택된 필터로 걸러진 그룹 목록을 돌려주는 훅.
 *
 * TODO: 현재는 MOCK_GROUPS 기반이며, 실제 그룹 목록 조회 훅으로 교체 예정.
 *
 * @example
 * const { filters, filter, setFilter, groups, total, activeGroupId } = useGroupFilter();
 */
export function useGroupFilter() {
  const [filter, setFilter] = useState<GroupFilter>("all");

  const groups = useMemo(
    () => (filter === "all" ? MOCK_GROUPS : MOCK_GROUPS.filter((group) => group.role === filter)),
    [filter]
  );

  return {
    filters: GROUP_FILTERS,
    filter,
    setFilter,
    groups,
    total: groups.length,
  };
}

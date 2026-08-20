"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/authStore";
import { queryKeys } from "@/shared/constants/queryKey";
import { getMyGroups } from "@/shared/api/group/getMyGroups";

/**
 * 로그인한 사용자가 멤버로 속한 그룹 목록을 조회하는 훅.
 *
 * userId는 authStore에서 가져오며, 로그인 상태일 때만 조회한다.
 *
 * @example
 * const { data: groups, isLoading } = useMyGroupList();
 */
export function useMyGroupList() {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: queryKeys.groups.my,
    queryFn: () => getMyGroups(userId!),
    enabled: !!userId,
  });
}

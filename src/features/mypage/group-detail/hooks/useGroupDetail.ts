"use client";

import { useQuery } from "@tanstack/react-query";
import type { GroupDetail } from "@/features/mypage/group-detail/types/group";
import { getGroupDetail } from "@/shared/api/group/getGroupDetail";
import { queryKeys } from "@/shared/constants/queryKey";
import { useAuthStore } from "@/shared/store/authStore";

/**
 * 특정 그룹의 상세 정보를 조회하는 훅.
 *
 * userId는 authStore에서 가져오며, 로그인 상태이고 groupId가 있을 때만 조회한다.
 *
 * @example
 * const { data: group, isPending } = useGroupDetail(groupId);
 */
export function useGroupDetail(groupId: string) {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: queryKeys.groups.detail(groupId, userId),
    queryFn: () => getGroupDetail(groupId, userId!),
    enabled: !!userId && !!groupId,
    // TODO: 공유 글·좋아요 수 컬럼 추가 후 실제 값으로 대체 (현재는 0 고정)
    select: (data): GroupDetail => ({ ...data, postCount: 0, likedCount: 0 }),
  });
}

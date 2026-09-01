"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveGroup } from "@/shared/api/group/leaveGroup";
import { queryKeys } from "@/shared/constants/queryKey";
import { useAuthStore } from "@/shared/store/authStore";

/**
 * 그룹 나가기 mutation 훅. (멤버 전용)
 *
 * userId는 authStore에서 가져온다. 성공 시 내 그룹 목록 쿼리를 무효화해 목록에 반영되도록 한다.
 *
 * @example
 * const { mutateAsync, isPending } = useLeaveGroup();
 * await mutateAsync(groupId);
 */
export function useLeaveGroup() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  return useMutation({
    mutationFn: (groupId: string) => {
      if (!userId) throw new Error("로그인이 필요해요");
      return leaveGroup(groupId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.my(userId) });
    },
  });
}

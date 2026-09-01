"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "@/shared/api/group/deleteGroup";
import { queryKeys } from "@/shared/constants/queryKey";
import { useAuthStore } from "@/shared/store/authStore";

/**
 * 그룹 삭제 mutation 훅. (방장 전용)
 *
 * 성공 시 내 그룹 목록 쿼리를 무효화해 삭제가 목록에 반영되도록 한다.
 *
 * @example
 * const { mutateAsync, isPending } = useDeleteGroup();
 * await mutateAsync(groupId);
 */
export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.my(userId) });
    },
  });
}

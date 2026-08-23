"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroupName } from "@/shared/api/group/updateGroupName";
import { queryKeys } from "@/shared/constants/queryKey";
import { useAuthStore } from "@/shared/store/authStore";

interface UpdateGroupNameParams {
  groupId: string;
  name: string;
}

/**
 * 그룹 이름을 수정하는 mutation 훅.
 *
 * 성공 시 해당 그룹 상세와 내 그룹 목록 쿼리를 무효화해 새 이름이 반영되도록 한다.
 *
 * @example
 * const { mutate, isPending } = useUpdateGroupName();
 * mutate({ groupId, name });
 */
export function useUpdateGroupName() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  return useMutation({
    mutationFn: ({ groupId, name }: UpdateGroupNameParams) => updateGroupName(groupId, name),
    onSuccess: (_data, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.my(userId) });
    },
  });
}

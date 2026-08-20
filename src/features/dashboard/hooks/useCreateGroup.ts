"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "@/shared/api/group/createGroup";
import { queryKeys } from "@/shared/constants/queryKey";

interface CreateGroupParams {
  name: string;
  userId: string;
}

/**
 * 그룹 생성 mutation 훅.
 *
 * 성공 시 내 그룹 목록 쿼리를 무효화해 새 그룹이 목록에 반영되도록 한다.
 *
 * @example
 * const { mutate, isPending } = useCreateGroup();
 * mutate({ name, userId }, { onSuccess: (group) => { ... } });
 */
export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name }: CreateGroupParams) => createGroup(name),
    onSuccess: (_group, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.my(userId) });
    },
  });
}

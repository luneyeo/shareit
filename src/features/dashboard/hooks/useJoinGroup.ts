"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroup } from "@/shared/api/group/joinGroup";
import { queryKeys } from "@/shared/constants/queryKey";

interface JoinGroupParams {
  inviteCode: string;
  userId: string;
}

/**
 * 입장 코드로 그룹에 입장하는 mutation 훅.
 *
 * 성공 시 내 그룹 목록 쿼리를 무효화해 입장한 그룹이 목록에 반영되도록 한다.
 *
 * @example
 * const { mutate, isPending } = useJoinGroup();
 * mutate({ inviteCode, userId }, { onSuccess: ({ id }) => { ... } });
 */
export function useJoinGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inviteCode }: JoinGroupParams) => joinGroup(inviteCode),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.my(userId) });
    },
  });
}

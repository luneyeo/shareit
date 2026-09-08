"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GROUP_MESSAGE } from "@/features/dashboard/constants/messages";
import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";
import { useDeleteGroup } from "@/features/mypage/group-detail/hooks/useDeleteGroup";
import { useGroupDetail } from "@/features/mypage/group-detail/hooks/useGroupDetail";
import { useLeaveGroup } from "@/features/mypage/group-detail/hooks/useLeaveGroup";
import {
  GroupDetailHero,
  GroupDetailSkeleton,
  GroupManageSection,
  GroupRemoveDialog,
  GroupStatsCard,
} from "@/features/mypage/group-detail/ui";
import BackHeader from "@/shared/ui/back-header/BackHeader";
import Divider from "@/shared/ui/divider/Divider";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { toast } from "@/shared/ui/feedback";

/**
 * 마이페이지 하위 "그룹 상세" 페이지 컴포넌트
 *
 * 탭바 없이 뒤로가기로 진입하는 드릴다운 페이지입니다. (`(action)` 라우트)
 *
 * @example
 * import { GroupDetailPage } from '@/views/mypage/group-detail'
 * export default GroupDetailPage
 */
export function GroupDetailPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const router = useRouter();
  const { data: group, isPending, isError, refetch } = useGroupDetail(groupId);
  const { openEditName, dialogElement } = useGroupDialog();
  const deleteGroup = useDeleteGroup();
  const leaveGroup = useLeaveGroup();
  const isRemoving = deleteGroup.isPending || leaveGroup.isPending;
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const handleGoToDashboard = () => {
    router.push(`/dashboard/${groupId}`);
  };

  const handleConfirmRemove = async () => {
    if (!group) return;

    // 방장은 그룹 삭제, 멤버는 그룹 나가기. 이후 성공 토스트·목록 이동 흐름은 동일하다.
    const isOwner = group.role === "owner";
    const message = isOwner ? GROUP_MESSAGE.DELETE : GROUP_MESSAGE.LEAVE;

    // 처리 중에는 다이얼로그를 유지해 확인 버튼 스피너를 노출하고, 성공 시 목록으로 이동한다.
    try {
      await (isOwner ? deleteGroup.mutateAsync(groupId) : leaveGroup.mutateAsync(groupId));
      toast.success(message.SUCCESS);
      router.replace("/mypage/groups");
    } catch (error) {
      console.error(error);
      toast.error(message.ERROR);
      setIsRemoveOpen(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <BackHeader title="그룹 상세" />

      {isPending ? (
        <GroupDetailSkeleton />
      ) : isError ? (
        <EmptyState
          type="error"
          message="그룹을 불러오지 못했어요"
          description="잠시 후 다시 시도해주세요"
          className="flex-1"
          onRetry={() => refetch()}
        />
      ) : (
        <>
          <div className="flex flex-col gap-6 px-5 py-4">
            <GroupDetailHero
              name={group.name}
              role={group.role}
              openedAt={group.openedAt}
              onGoToDashboard={handleGoToDashboard}
            />
            <GroupStatsCard memberCount={group.memberCount} productCount={group.productCount} />
          </div>

          <Divider className="h-2" />

          <GroupManageSection
            role={group.role}
            inviteCode={group.inviteCode}
            onEditName={() => openEditName(group.id, group.name)}
            onRemove={() => setIsRemoveOpen(true)}
          />

          {isRemoveOpen && (
            <GroupRemoveDialog
              role={group.role}
              loading={isRemoving}
              onConfirm={handleConfirmRemove}
              onCancel={() => setIsRemoveOpen(false)}
            />
          )}
        </>
      )}

      {dialogElement}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";
import { useGroupDetail } from "@/features/mypage/group-detail/hooks/useGroupDetail";
import {
  GroupDetailHero,
  GroupManageSection,
  GroupRemoveDialog,
  GroupStatsCard,
} from "@/features/mypage/group-detail/ui";
import BackHeader from "@/shared/ui/back-header/BackHeader";
import Divider from "@/shared/ui/divider/Divider";
import EmptyState from "@/shared/ui/empty-state/EmptyState";

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
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const handleGoToDashboard = () => {
    router.push(`/dashboard/${groupId}`);
  };

  const handleConfirmRemove = () => {
    // TODO: 방장이면 그룹 삭제, 멤버이면 그룹 나가기 뮤테이션 연결
    setIsRemoveOpen(false);
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <BackHeader title="그룹 상세" />

      {isPending ? (
        <div className="flex flex-1 items-center justify-center px-5 py-16">
          <p className="typo-14-medium text-gray-500">그룹을 불러오는 중이에요.</p>
        </div>
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
            <GroupStatsCard
              memberCount={group.memberCount}
              productCount={group.productCount}
              // TODO: 저장(좋아요) 기능 구현 후 savedCount 전달
            />
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

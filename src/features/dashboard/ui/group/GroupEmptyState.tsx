"use client";

import noGroupAnimation from "@/shared/assets/lottie/lottie-no-group.json";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";

/**
 * 속한 그룹이 없을 때 대시보드 인덱스(`/dashboard`)에서 보여주는 EmptyState입니다.
 *
 * 버튼으로 그룹 생성/입장 다이얼로그(`useGroupDialog`)를 열며, 드롭다운의 액션과 동일하게 동작합니다.
 */
export default function GroupEmptyState() {
  const { openCreate, openJoin, dialogElement } = useGroupDialog();

  return (
    <>
      <EmptyState
        type="group"
        animationData={noGroupAnimation}
        message="아직 속한 그룹이 없어요"
        description="새 그룹을 만들거나 초대 코드로 입장해보세요"
        className="min-h-[calc(100dvh-3.75rem-env(safe-area-inset-bottom))] justify-center px-10 py-0"
        onCreateGroup={openCreate}
        onJoinGroup={openJoin}
      />

      {dialogElement}
    </>
  );
}

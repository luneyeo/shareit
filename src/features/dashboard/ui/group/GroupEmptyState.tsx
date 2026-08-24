"use client";

import { useSearchParams } from "next/navigation";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";

/**
 * 속한 그룹이 없을 때 대시보드 인덱스(`/dashboard`)에서 보여주는 EmptyState입니다.
 *
 * 버튼으로 그룹 생성/입장 다이얼로그(`useGroupDialog`)를 열며, 드롭다운의 액션과 동일하게 동작합니다.
 * 랜딩에서 입력한 초대 코드가 무효해 입장에 실패한 경우(`joinError=1`) 안내 문구를 함께 노출합니다.
 */
export default function GroupEmptyState() {
  const { openCreate, openJoin, dialogElement } = useGroupDialog();
  const joinFailed = useSearchParams().get("joinError") === "1";

  return (
    <>
      {/* TODO: 토스트 도입 후 인라인 안내를 토스트로 교체 (무효 코드 입장 실패 알림) */}
      {joinFailed && (
        <p role="alert" className="px-10 pt-6 text-center typo-14-medium text-error">
          입장 코드를 다시 확인해 주세요
        </p>
      )}
      <EmptyState
        type="group"
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

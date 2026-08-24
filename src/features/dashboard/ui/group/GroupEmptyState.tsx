"use client";

import { useSearchParams } from "next/navigation";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";

/**
 * 속한 그룹이 없을 때 대시보드 인덱스(`/dashboard`)에서 보여주는 EmptyState입니다.
 *
 * 버튼으로 그룹 생성/입장 다이얼로그(`useGroupDialog`)를 열며, 드롭다운의 액션과 동일하게 동작합니다.
 * 랜딩에서 입력한 초대 코드로 입장에 실패한 경우 안내 문구를 함께 노출합니다.
 * 무효 코드(`joinError=invalid`)와 서버 오류(`joinError=error`)를 구분해 문구를 다르게 보여줍니다.
 */
export default function GroupEmptyState() {
  const { openCreate, openJoin, dialogElement } = useGroupDialog();
  const joinError = useSearchParams().get("joinError");
  const joinErrorMessage =
    joinError === "invalid"
      ? "입장 코드를 다시 확인해 주세요"
      : joinError === "error"
        ? "일시적인 오류로 입장하지 못했어요. 잠시 후 다시 시도해 주세요"
        : null;

  return (
    <>
      {/* TODO: 토스트 도입 후 인라인 안내를 토스트로 교체 (입장 실패 알림) */}
      {joinErrorMessage && (
        <p role="alert" className="px-10 pt-6 text-center typo-14-medium text-error">
          {joinErrorMessage}
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

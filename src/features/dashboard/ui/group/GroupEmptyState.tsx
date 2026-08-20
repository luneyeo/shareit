"use client";

import { IcGroup, IcPlus } from "@/shared/assets/icons";
import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";

/**
 * 속한 그룹이 없을 때 대시보드 인덱스(`/dashboard`)에서 보여주는 EmptyState입니다.
 *
 * 버튼으로 그룹 생성/입장 다이얼로그(`useGroupDialog`)를 열며, 드롭다운의 액션과 동일하게 동작합니다.
 */
export default function GroupEmptyState() {
  const { openCreate, openJoin, dialogElement } = useGroupDialog();

  return (
    <div className="flex min-h-[calc(100dvh-3.75rem-env(safe-area-inset-bottom))] flex-col items-center justify-center px-10 text-center">
      {/* TODO: Lottie 애니메이션으로 변경 예정 */}
      <IcGroup className="size-10 text-[#4b5573]" />
      <p className="mt-4 typo-18-bold">아직 속한 그룹이 없어요</p>
      <p className="mt-1 typo-16-medium text-gray-500">
        새 그룹을 만들거나 초대 코드로 입장해보세요
      </p>

      <div className="mt-8 flex w-full flex-col gap-3.5 px-10">
        <button
          type="button"
          onClick={openCreate}
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary-600 py-4 text-white typo-16-semibold"
        >
          <IcPlus className="size-4" />새 그룹 만들기
        </button>
        <button
          type="button"
          onClick={openJoin}
          className="w-full rounded-full border border-primary-600 py-4 text-primary-600 typo-16-semibold"
        >
          코드로 그룹 입장하기
        </button>
      </div>

      {dialogElement}
    </div>
  );
}

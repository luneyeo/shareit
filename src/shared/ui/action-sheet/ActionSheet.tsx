"use client";

import type { ReactNode } from "react";
import OverlayPortal from "@/shared/ui/overlay/OverlayPortal";
import OverlaySurface from "@/shared/ui/overlay/OverlaySurface";
import ActionSheetItem from "./ActionSheetItem";

interface ActionSheetProps {
  /** 시트 표시 여부 */
  isOpen: boolean;
  /** 배경 클릭·Escape·취소 버튼 클릭 시 호출됩니다. */
  onClose: () => void;
  /** 상단 카드에 쌓을 항목들. `ActionSheetItem`을 나열합니다. (항목 사이에 구분선이 그려집니다.) */
  children: ReactNode;
  /** 취소 버튼 문구 */
  cancelText?: string;
  /** 시트의 접근 가능한 이름 */
  ariaLabel?: string;
}

/**
 * iOS 액션 시트 스타일의 하단 모달입니다.
 *
 * - `OverlayPortal`(딤·포탈·포커스 트랩·Escape/배경 클릭 닫기·`aria-modal`)을 토대로
 *   하단 정렬 + 2카드 레이아웃으로 확장합니다.
 * - 상단 카드에는 `children`으로 넘긴 `ActionSheetItem`들이 구분선과 함께 쌓이고,
 *   하단에는 별도 카드로 취소 버튼이 기본 제공됩니다.
 *
 * NOTE: `OverlaySurface`는 원래 `OverlayPortal` 내부에서 중첩하지 않도록 설계됐지만,
 * 여기서는 포탈이 감싸는 최상위 서피스를 투명한 컨테이너로 바꾸고(`surfaceClassName`),
 * 그 안에 보이는 두 개의 카드로 `OverlaySurface`를 의도적으로 재사용합니다.
 *
 * @example
 * ```tsx
 * <ActionSheet isOpen={isOpen} onClose={close} ariaLabel="상품 더보기 메뉴">
 *   <ActionSheetItem onClick={handleEdit}>수정하기</ActionSheetItem>
 *   <ActionSheetItem variant="destructive" onClick={handleDelete}>삭제하기</ActionSheetItem>
 * </ActionSheet>
 * ```
 */
export default function ActionSheet({
  isOpen,
  onClose,
  children,
  cancelText = "취소",
  ariaLabel = "더보기 메뉴",
}: ActionSheetProps) {
  if (!isOpen) return null;

  return (
    <OverlayPortal
      onClose={onClose}
      ariaLabel={ariaLabel}
      className="items-end"
      surfaceClassName="flex w-full max-w-120 flex-col gap-2 bg-transparent"
    >
      <OverlaySurface className="divide-y divide-gray-200 overflow-hidden">
        {children}
      </OverlaySurface>
      <OverlaySurface className="overflow-hidden">
        <ActionSheetItem onClick={onClose} className="typo-16-semibold">
          {cancelText}
        </ActionSheetItem>
      </OverlaySurface>
    </OverlayPortal>
  );
}

"use client";

import type { ReactNode } from "react";
import Button from "@/shared/ui/button/Button";
import { IcClose } from "@/shared/assets/icons";

interface DialogBaseProps {
  /** 본문 영역에 렌더링할 콘텐츠 (메시지, 입력 필드 등) */
  children: ReactNode;
  /** 헤더 제목. 전달 시 제목·닫기(X) 버튼이 있는 헤더가 표시됩니다. */
  title?: string;
  /** 확인 버튼 문구 */
  confirmText?: string;
  /** 취소 버튼 문구 */
  cancelText?: string;
  /** 확인 버튼 클릭 시 호출됩니다. */
  onConfirm: () => void;
  /** 취소 버튼 클릭 시 호출됩니다. */
  onCancel: () => void;
  /** 헤더의 닫기(X) 버튼 클릭 시 호출됩니다. 미전달 시 `onCancel`이 사용됩니다. */
  onClose?: () => void;
}

/**
 * 다이얼로그 공통 껍데기 컴포넌트입니다.
 *
 * - 바깥 패딩·정렬과 하단 확인/취소 버튼 푸터를 담당합니다.
 * - `title`을 전달하면 제목과 닫기(X) 버튼이 있는 헤더가 표시됩니다.
 * - 본문(`children`)에 메시지·입력 필드 등 케이스별 콘텐츠를 배치합니다.
 * - 배경·서피스·중앙 정렬은 `OverlayPortal`이 담당하므로 그 내부에 배치해 사용합니다.
 *
 * @example
 * ```tsx
 * <DialogBase title="새 그룹 생성" confirmText="생성" onConfirm={...} onCancel={...}>
 *   <FormField label="이름" ... />
 * </DialogBase>
 * ```
 */
export default function DialogBase({
  children,
  title,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  onClose,
}: DialogBaseProps) {
  return (
    <div className="flex flex-col gap-4 p-6">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="typo-18-bold text-gray-900">{title}</h2>
          <button
            type="button"
            aria-label="닫기"
            className="text-gray-400 transition-colors hover:text-gray-600"
            onClick={onClose ?? onCancel}
          >
            <IcClose />
          </button>
        </div>
      )}
      {children}
      <div className="flex gap-2">
        <Button theme="secondary" size="md" className="flex-1" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button theme="primary" size="md" className="flex-1" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </div>
  );
}

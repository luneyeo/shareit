import DialogBase from "@/shared/ui/dialog/DialogBase";

interface ConfirmDialogProps {
  /** 다이얼로그에 표시할 메시지 */
  message: string;
  /** 확인 버튼 문구 */
  confirmText?: string;
  /** 취소 버튼 문구 */
  cancelText?: string;
  /** 확인 버튼 클릭 시 호출됩니다. */
  onConfirm: () => void;
  /** 취소 버튼 클릭 시 호출됩니다. */
  onCancel: () => void;
}

/**
 * 확인/취소 두 가지 선택지를 제공하는 컨펌 다이얼로그의 콘텐츠 컴포넌트입니다.
 *
 * - `message`, 버튼 문구, 버튼 이벤트를 모두 외부(prop)에서 제어합니다.
 * - 배경·서피스·중앙 정렬은 `OverlayPortal`이 담당하므로 그 내부에 배치해 사용합니다.
 *
 * @example
 * ```tsx
 * <OverlayPortal
 *   ariaLabel="삭제 확인"
 *   onClose={handleCancel}
 *   surfaceClassName="w-full max-w-xs"
 * >
 *   <ConfirmDialog
 *     message="정말 삭제하시겠어요?"
 *     confirmText="삭제"
 *     cancelText="취소"
 *     onConfirm={handleDelete}
 *     onCancel={handleCancel}
 *   />
 * </OverlayPortal>
 * ```
 */
export default function ConfirmDialog({
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <DialogBase
      confirmText={confirmText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p className="typo-16-medium text-center">{message}</p>
    </DialogBase>
  );
}

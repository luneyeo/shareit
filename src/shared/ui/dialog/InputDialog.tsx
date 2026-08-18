import DialogBase from "@/shared/ui/dialog/DialogBase";
import FormInput from "@/shared/ui/form/FormInput";

interface InputDialogProps {
  /** 다이얼로그 제목 */
  title: string;
  /** 입력 필드 라벨. 생략 시 라벨 없이 입력 필드만 렌더링하며, 제목을 접근성 이름으로 사용합니다. */
  label?: string;
  /** 입력값 (제어 컴포넌트) */
  value: string;
  /** 입력값 변경 시 호출됩니다. */
  onChange: (value: string) => void;
  /** 입력 필드 placeholder */
  placeholder?: string;
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
 * 제목·입력 필드·확인/취소 버튼으로 구성된 입력형 다이얼로그의 콘텐츠 컴포넌트입니다.
 *
 * - 헤더에 제목과 닫기(X) 버튼을 두고, 본문에 `FormInput` 하나를 배치합니다.
 * - 입력값은 `value`/`onChange`로 외부에서 제어합니다.
 * - 배경·서피스·중앙 정렬은 `OverlayPortal`이 담당하므로 그 내부에 배치해 사용합니다.
 *
 * @example
 * ```tsx
 * <OverlayPortal ariaLabel="새 그룹 생성" onClose={handleCancel} surfaceClassName="w-full max-w-xs">
 *   <InputDialog
 *     title="새 그룹 생성"
 *     label="이름"
 *     value={name}
 *     onChange={setName}
 *     placeholder="송파구 공주들"
 *     confirmText="생성"
 *     onConfirm={handleCreate}
 *     onCancel={handleCancel}
 *   />
 * </OverlayPortal>
 * ```
 */
export default function InputDialog({
  title,
  label,
  value,
  onChange,
  placeholder,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  onClose,
}: InputDialogProps) {
  return (
    <DialogBase
      asForm
      title={title}
      confirmText={confirmText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      confirmDisabled={value.trim() === ""}
      onCancel={onCancel}
      onClose={onClose}
    >
      <FormInput
        label={label}
        aria-label={label ? undefined : title}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </DialogBase>
  );
}

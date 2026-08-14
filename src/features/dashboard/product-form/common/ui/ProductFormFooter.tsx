import Button from "@/shared/ui/button/Button";
import ActionFooter from "@/shared/ui/footer/action/ActionFooter";

type ProductFormFooterProps = {
  /** 제출 버튼 문구. 페이지에 따라 다르게 전달합니다. 예: "등록하기" | "수정하기" */
  submitLabel: string;
  /** 제출 버튼 클릭 핸들러 */
  onSubmit: () => void;
  /** 폼 유효성 미충족·제출 중 등으로 버튼을 비활성화합니다. (기본값: false) */
  disabled?: boolean;
};

/**
 * 상품 등록·수정 폼 하단에 고정되는 제출 액션 푸터입니다.
 *
 * 등록/수정 페이지가 레이아웃·상태 처리를 공유하되, 버튼 문구(`submitLabel`)와
 * 동작(`onSubmit`)만 다르게 주입해 재사용합니다. 하단 바 레이아웃은 공통
 * `ActionFooter`(단일 버튼 → 간격 없이 꽉 채움)를 그대로 사용합니다.
 *
 * - `submitLabel`: 버튼 문구 (예: "등록하기" | "수정하기")
 * - `onSubmit`: 클릭 핸들러
 * - `disabled`: 유효성 미충족·제출 중일 때 비활성화 (`!isValid || isSubmitting` 조합)
 *
 * @example
 * ```tsx
 * // 등록 페이지
 * <ProductFormFooter submitLabel="등록하기" onSubmit={handleCreate} disabled={!isValid} />
 *
 * // 수정 페이지
 * <ProductFormFooter submitLabel="수정하기" onSubmit={handleUpdate} disabled={!isValid || isSubmitting} />
 * ```
 */
export default function ProductFormFooter({
  submitLabel,
  onSubmit,
  disabled = false,
}: ProductFormFooterProps) {
  return (
    <ActionFooter>
      <Button
        type="button"
        theme="primary"
        size="lg"
        className="flex-1"
        onClick={onSubmit}
        disabled={disabled}
      >
        {submitLabel}
      </Button>
    </ActionFooter>
  );
}

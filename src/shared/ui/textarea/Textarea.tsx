"use client";

import { cn } from "@/shared/utils/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: React.Ref<HTMLTextAreaElement>;
  error?: boolean;
};

/**
 * 공통 텍스트영역 컴포넌트입니다. 여러 줄 입력(예: 상품 설명)에 사용합니다.
 *
 * `Input`과 외형(테두리·라운드·포커스·비활성)을 맞춘 형제 컴포넌트이며,
 * 높이만 여러 줄에 맞춰 최소 높이를 갖습니다. 크기 조절 핸들은 기본으로 끕니다.
 *
 * - `error`: 유효성 실패 시 테두리를 에러 색으로 표시하고 `aria-invalid`를 켭니다.
 * - `className`: textarea 요소에 직접 적용됩니다. (예: 최소 높이 조정 `min-h-40`)
 *
 * @example
 * ```tsx
 * <Textarea placeholder="제품 설명을 입력해주세요" />
 * ```
 */
export default function Textarea({ ref, className, disabled, error, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      disabled={disabled}
      aria-invalid={error || undefined}
      className={cn(
        "input-base min-h-28 py-3 resize-none",
        error && "border-error focus:border-error",
        className
      )}
      {...props}
    />
  );
}

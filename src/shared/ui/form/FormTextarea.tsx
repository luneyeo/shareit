"use client";

import { useId } from "react";
import FieldError from "@/shared/ui/form/FieldError";
import Label from "@/shared/ui/label/Label";
import Textarea from "@/shared/ui/textarea/Textarea";

type FormTextareaProps = Omit<React.ComponentProps<typeof Textarea>, "error"> & {
  label?: string;
  required?: boolean;
  error?: string;
};

/**
 * Label과 Textarea를 묶은 폼 필드 컴포넌트입니다. (여러 줄 입력용)
 *
 * `FormField`(Input 버전)의 textarea 형제로, 라벨·에러 메시지·접근성 연결을 동일하게
 * 처리합니다.
 *
 * - `label`: 라벨 텍스트. 생략하면 `Label`을 렌더링하지 않습니다.
 *   이때 접근성 이름을 위해 `aria-label`을 함께 전달하세요.
 * - `required`: 필수 입력 표시 (`*`)
 * - `error`: 유효성 에러 메시지. 있으면 Textarea를 에러 스타일로 표시하고 하단에 메시지를
 *   렌더하며 `aria-describedby`로 연결합니다.
 * - `id` 미전달 시 자동으로 생성됩니다.
 * - 나머지 props는 Textarea로 전달됩니다.
 *
 * @example
 * ```tsx
 * <FormTextarea label="설명" placeholder="제품 설명을 입력해주세요" {...register("description")} />
 * ```
 */
export default function FormTextarea({
  ref,
  label,
  required,
  id,
  error,
  ...textareaProps
}: FormTextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const errorId = `${textareaId}-error`;

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <Label htmlFor={textareaId} required={required}>
          {label}
        </Label>
      )}
      <Textarea
        ref={ref}
        id={textareaId}
        required={required}
        error={!!error}
        aria-describedby={error ? errorId : undefined}
        {...textareaProps}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

"use client";

import { useId } from "react";
import Input from "@/shared/ui/input/Input";
import Label from "@/shared/ui/label/Label";

type FormFieldProps = React.ComponentProps<typeof Input> & {
  label: string;
  required?: boolean;
};

/**
 * Label과 Input을 묶은 폼 필드 컴포넌트입니다.
 *
 * - `label`: 라벨 텍스트
 * - `required`: 필수 입력 표시 (`*`)
 * - `id` 미전달 시 자동으로 생성됩니다.
 * - 나머지 props는 Input으로 전달됩니다.
 *
 * @example
 * ```tsx
 * <FormField label="이메일" required placeholder="이메일을 입력해주세요" />
 * ```
 */
export default function FormField({ label, required, id, ...inputProps }: FormFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={inputId} required={required}>
        {label}
      </Label>
      <Input id={inputId} {...inputProps} />
    </div>
  );
}

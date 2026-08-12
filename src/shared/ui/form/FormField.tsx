"use client";

import { useId } from "react";
import Input from "@/shared/ui/input/Input";
import Label from "@/shared/ui/label/Label";

type FormFieldProps = React.ComponentProps<typeof Input> & {
  label?: string;
  required?: boolean;
};

/**
 * Label과 Input을 묶은 폼 필드 컴포넌트입니다.
 *
 * - `label`: 라벨 텍스트. 생략하면 `Label`을 렌더링하지 않습니다.
 *   이때 접근성 이름을 위해 `aria-label`을 함께 전달하세요.
 * - `required`: 필수 입력 표시 (`*`)
 * - `id` 미전달 시 자동으로 생성됩니다.
 * - 나머지 props는 Input으로 전달됩니다.
 *
 * @example
 * ```tsx
 * // 라벨 있음
 * <FormField label="이메일" required placeholder="이메일을 입력해주세요" />
 *
 * // 라벨 없음 (aria-label로 접근성 이름 부여)
 * <FormField aria-label="입장 코드" placeholder="입장 코드 입력하기" />
 * ```
 */
export default function FormField({ ref, label, required, id, ...inputProps }: FormFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      <Input ref={ref} id={inputId} required={required} {...inputProps} />
    </div>
  );
}

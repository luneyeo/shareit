"use client";

import Field from "@/shared/ui/form/Field";
import Input from "@/shared/ui/input/Input";

type FormInputProps = Omit<React.ComponentProps<typeof Input>, "error"> & {
  label?: string;
  required?: boolean;
  error?: string;
};

/**
 * Label과 Input을 묶은 폼 필드 컴포넌트입니다.
 *
 * - `label`: 라벨 텍스트. 생략하면 `Label`을 렌더링하지 않습니다.
 *   이때 접근성 이름을 위해 `aria-label`을 함께 전달하세요.
 * - `required`: 필수 입력 표시 (`*`)
 * - `error`: 유효성 에러 메시지. 있으면 Input을 에러 스타일로 표시하고 하단에 메시지를
 *   렌더하며 `aria-describedby`로 연결합니다.
 * - `id` 미전달 시 자동으로 생성됩니다.
 * - 나머지 props는 Input으로 전달됩니다.
 *
 * @example
 * ```tsx
 * // 라벨 있음
 * <FormInput label="이메일" required placeholder="이메일을 입력해주세요" />
 *
 * // 라벨 없음 (aria-label로 접근성 이름 부여)
 * <FormInput aria-label="입장 코드" placeholder="입장 코드 입력하기" />
 * ```
 */
export default function FormInput({
  ref,
  label,
  required,
  id,
  error,
  ...inputProps
}: FormInputProps) {
  return (
    <Field label={label} required={required} id={id} error={error}>
      {(control) => <Input ref={ref} required={required} {...control} {...inputProps} />}
    </Field>
  );
}

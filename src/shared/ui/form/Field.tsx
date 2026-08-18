"use client";

import { type ReactNode, useId } from "react";
import FieldError from "@/shared/ui/form/FieldError";
import Label from "@/shared/ui/label/Label";

/** 입력 컨트롤(Input·Textarea 등)에 연결할 접근성 속성입니다. */
type FieldControlProps = {
  id: string;
  error: boolean;
  "aria-describedby"?: string;
};

type FieldProps = {
  label?: string;
  required?: boolean;
  id?: string;
  error?: string;
  /** id·error·aria-describedby 연결 정보를 받아 입력 컨트롤을 렌더합니다. */
  children: (control: FieldControlProps) => ReactNode;
};

/**
 * 폼 필드의 공통 레이아웃과 접근성 연결을 담당하는 스캐폴드입니다.
 *
 * 라벨·에러 메시지(`FieldError`)·`aria-describedby` 연결·`id` 생성을 한곳에서 처리하고,
 * 실제 입력 컨트롤은 `children`(render prop)으로 주입받습니다.
 * `FormInput`/`FormTextarea`가 이 컴포넌트를 감싸는 얇은 어댑터입니다.
 */
export default function Field({ label, required, id, error, children }: FieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      {children({
        id: fieldId,
        error: !!error,
        "aria-describedby": error ? errorId : undefined,
      })}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

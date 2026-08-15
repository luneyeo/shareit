"use client";

import { cn } from "@/shared/utils/cn";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

/**
 * 공통 라벨 컴포넌트입니다.
 *
 * - `required`: 필수 입력 표시 (`*`)를 라벨 옆에 추가합니다.
 * - `htmlFor`: 연결할 인풋의 `id`를 지정합니다.
 *
 * @example
 * ```tsx
 * // 기본
 * <Label htmlFor="email">이메일</Label>
 *
 * // 필수 입력
 * <Label htmlFor="email" required>이메일</Label>
 * ```
 */
export default function Label({ required, children, className, ...props }: LabelProps) {
  return (
    <label
      className={cn("inline-flex items-center gap-0.5 typo-16-semibold", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-primary-600" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

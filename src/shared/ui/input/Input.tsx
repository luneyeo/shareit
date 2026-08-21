"use client";

import { cn } from "@/shared/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  suffix?: React.ReactNode;
  containerClassName?: string;
  error?: boolean;
};

/**
 * 공통 인풋 컴포넌트입니다.
 *
 * - `suffix`: 인풋 오른쪽에 표시할 아이콘, 버튼 등 (ReactNode)
 * - `containerClassName`: 외부 컨테이너 div에 적용됩니다. 너비·레이아웃 클래스는 여기에 전달해야 suffix 위치가 올바릅니다.
 * - `error`: 유효성 실패 시 테두리를 에러 색으로 표시하고 `aria-invalid`를 켭니다.
 * - `className`: 인풋 요소에 직접 적용됩니다.
 *
 * @example
 * ```tsx
 * // 기본
 * <Input placeholder="입력해주세요" />
 *
 * // 오른쪽 아이콘
 * <Input placeholder="검색어를 입력해주세요" suffix={<SearchIcon />} />
 *
 * // 오른쪽 버튼
 * <Input placeholder="인증번호를 입력해주세요" suffix={<button onClick={verify}>인증하기</button>} />
 *
 * // 비활성화
 * <Input placeholder="입력해주세요" disabled />
 * ```
 */
export default function Input({
  ref,
  suffix,
  containerClassName,
  className,
  disabled,
  error,
  ...props
}: InputProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={cn(
          "w-full h-12 px-4 rounded-xl border border-gray-400 bg-white outline-none transition-colors",
          "placeholder:text-gray-400 typo-16-medium",
          "focus:border-gray-600",
          "disabled:bg-gray-200 disabled:border-transparent disabled:pointer-events-none disabled:text-gray-500",
          error && "border-error focus:border-error",
          suffix && "pr-10",
          className
        )}
        {...props}
      />
      {suffix && (
        <span
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 flex items-center",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

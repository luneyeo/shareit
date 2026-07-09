"use client";

import { cn } from "@/shared/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  suffix?: React.ReactNode;
};

/**
 * 공통 인풋 컴포넌트입니다.
 *
 * - `suffix`: 인풋 오른쪽에 표시할 아이콘, 버튼 등 (ReactNode)
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
export default function Input({ suffix, className, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        className={cn(
          "w-full h-12 px-4 rounded-xl border border-gray-400 bg-white outline-none transition-colors",
          "text-gray-900 placeholder:text-gray-400 typo-16-medium",
          "focus:border-primary-600",
          "disabled:bg-gray-200 disabled:border-transparent disabled:pointer-events-none disabled:text-gray-500",
          suffix && "pr-10",
          className
        )}
        {...props}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
          {suffix}
        </span>
      )}
    </div>
  );
}

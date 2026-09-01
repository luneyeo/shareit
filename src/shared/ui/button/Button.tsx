"use client";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import type { ButtonProps } from "./types";

const buttonVariants = cva(
  "relative inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-full border transition-colors px-3 disabled:bg-gray-200 disabled:text-gray-600 disabled:border-transparent disabled:pointer-events-none",
  {
    variants: {
      theme: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-700 border-transparent",
        secondary: "bg-white border border-gray-300 hover:bg-gray-100",
        danger: "bg-error text-white hover:bg-error/90 active:bg-error/90 border-transparent",
      },
      size: {
        lg: "h-12.5 typo-16-medium",
        md: "h-10 typo-14-medium",
        sm: "h-7 typo-14-medium",
      },
    },
    defaultVariants: {
      theme: "primary",
      size: "md",
    },
  }
);

/**
 * 공통 버튼 컴포넌트입니다.
 *
 * - `theme`: 버튼 색상 스타일 (`primary` | `secondary` | `danger`)
 * - `size`: 버튼 높이 및 폰트 크기 (`lg` | `md` | `sm`)
 * - `icon`: 텍스트 왼쪽에 표시할 아이콘 (ReactNode)
 * - `width`: size variant에 포함되지 않으므로 `className`으로 직접 지정합니다.
 *
 * @example
 * ```tsx
 * // 기본
 * <Button theme="primary" size="md" className="w-full">확인</Button>
 *
 * // 아이콘 포함
 * <Button theme="secondary" size="sm" icon={<ShareIcon />} className="w-[120px]">공유하기</Button>
 *
 * // 비활성화
 * <Button theme="primary" size="lg" className="w-full" disabled>등록하기</Button>
 * ```
 */
export default function Button({
  icon,
  children,
  theme,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ theme, size }), className)} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

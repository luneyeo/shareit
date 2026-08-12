"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import DropdownItemBase from "./DropdownItemBase";

interface DropdownActionItemProps extends ComponentPropsWithRef<"button"> {
  /** 항목 문구 */
  children: ReactNode;
  /** 문구 왼쪽에 표시할 아이콘 (예: 새 항목 추가용 플러스 아이콘) */
  startIcon?: ReactNode;
  /** 문구 색상 강조. `primary`는 대표 액션(예: "새 그룹 만들기")에 사용합니다. */
  emphasis?: "default" | "primary";
}

/**
 * "action" 메뉴의 개별 항목입니다. (예: 상품 등록 / 그룹 입장 / 새 그룹 만들기)
 *
 * - 하나의 동작을 실행하는 단일 문구 항목으로, `onClick`으로 동작을 연결합니다.
 * - `startIcon`으로 앞쪽 아이콘을, `emphasis="primary"`로 색상 강조를 줄 수 있습니다.
 * - `DropdownActionMenu`의 자식으로 배치합니다.
 *
 * @example
 * ```tsx
 * <DropdownActionItem onClick={handleRegister}>상품 등록</DropdownActionItem>
 * <DropdownActionItem emphasis="primary" startIcon={<IcPlus />} onClick={handleCreate}>
 *   새 그룹 만들기
 * </DropdownActionItem>
 * ```
 */
export default function DropdownActionItem({
  children,
  startIcon,
  emphasis = "default",
  className,
  ...props
}: DropdownActionItemProps) {
  return (
    <DropdownItemBase
      className={cn(emphasis === "primary" && "text-primary-600", className)}
      {...props}
    >
      {startIcon && <span className="shrink-0">{startIcon}</span>}
      <span className="typo-16-medium text-center min-w-0 flex-1 truncate">{children}</span>
    </DropdownItemBase>
  );
}

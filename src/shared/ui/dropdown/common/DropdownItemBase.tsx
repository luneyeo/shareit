"use client";

import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/utils/cn";

type DropdownItemBaseProps = ComponentPropsWithRef<"button">;

/**
 * 드롭다운 항목의 공통 껍데기(shell) 컴포넌트입니다.
 *
 * - `<li role="none">`로 감싼 `<button role="menuitem">` 한 개로, 클릭 가능한 항목의
 *   공통 레이아웃(가로 정렬·패딩·hover·비활성)과 메뉴 접근성 역할을 담당합니다.
 * - 메뉴의 포커스·닫기 로직이 `role="menuitem"`에 의존하므로, 개별 항목은 이 셸 위에서
 *   내용과 성격별 스타일만 정의합니다. (`DropdownActionItem`·`DropdownSelectItem`)
 * - `children`에 항목 내용을, `className`으로 성격별 스타일을 덧입힙니다.
 */
export default function DropdownItemBase({ className, children, ...props }: DropdownItemBaseProps) {
  return (
    <li role="none">
      <button
        type="button"
        role="menuitem"
        className={cn(
          "flex w-full items-center gap-3 px-5 py-4 text-left text-gray-900 transition-colors",
          "hover:bg-gray-50 disabled:pointer-events-none disabled:text-gray-400",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

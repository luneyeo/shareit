"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { IcCheck } from "@/shared/assets/icons";
import DropdownItemBase from "../common/DropdownItemBase";

interface DropdownSelectItemProps extends ComponentPropsWithRef<"button"> {
  /** 항목 제목 */
  children: ReactNode;
  /** 제목 아래 보조 설명 (예: "멤버 26명") */
  description?: string;
  /** `true`면 선택 상태로 배경을 강조하고 오른쪽에 체크 표시를 노출합니다. */
  selected?: boolean;
}

/**
 * "select" 메뉴의 개별 옵션 항목입니다. (예: 그룹 선택 목록)
 *
 * - 제목과 보조 설명(`description`)으로 이뤄진 항목이며, 단일 선택 목록에서 사용합니다.
 * - `selected`를 켜면 배경이 강조되고 오른쪽에 체크가 표시됩니다.
 * - 보통 `DropdownSelectMenu`가 데이터로 렌더링하지만, 직접 배치할 수도 있습니다.
 *
 * @example
 * ```tsx
 * <DropdownSelectItem selected description="멤버 26명" onClick={handleSelect}>
 *   송파구 공주들
 * </DropdownSelectItem>
 * ```
 */
export default function DropdownSelectItem({
  children,
  description,
  selected = false,
  className,
  ...props
}: DropdownSelectItemProps) {
  return (
    <DropdownItemBase
      aria-current={selected || undefined}
      className={cn("rounded-xl", selected && "bg-primary-100", className)}
      {...props}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="typo-16-medium truncate">{children}</span>
        {description && (
          <span className="typo-14-medium truncate text-gray-600">{description}</span>
        )}
      </span>
      {selected && <IcCheck className="shrink-0 text-primary-600" aria-hidden />}
    </DropdownItemBase>
  );
}

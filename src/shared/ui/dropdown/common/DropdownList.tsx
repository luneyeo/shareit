import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/utils/cn";

interface DropdownListProps extends ComponentPropsWithRef<"ul"> {
  /** `true`면 항목 사이에 구분선을 그립니다. (단순 액션 메뉴에서 사용) */
  divided?: boolean;
}

/**
 * 드롭다운 항목(`DropdownActionItem`·`DropdownSelectItem`)을 담는 메뉴 리스트 컴포넌트입니다.
 *
 * - `role="menu"`를 가진 `<ul>`이며, 자식으로 항목들을 배치합니다.
 * - `divided`를 켜면 항목 사이에 얇은 구분선을 그립니다. 그룹 목록처럼 구분선이
 *   필요 없는 경우에는 기본값(`false`)으로 두세요.
 * - 배경·그림자·위치는 `DropdownSurface`가 담당하므로 그 내부에 배치해 사용합니다.
 *
 * @example
 * ```tsx
 * <DropdownList divided>
 *   <DropdownActionItem onClick={...}>상품 등록</DropdownActionItem>
 *   <DropdownActionItem onClick={...}>그룹 입장</DropdownActionItem>
 * </DropdownList>
 * ```
 */
export default function DropdownList({
  divided = false,
  className,
  children,
  ...props
}: DropdownListProps) {
  return (
    <ul
      role="menu"
      className={cn(
        "flex flex-col overflow-hidden",
        divided && "divide-y divide-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

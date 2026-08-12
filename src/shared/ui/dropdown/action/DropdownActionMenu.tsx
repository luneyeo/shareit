import type { ReactNode } from "react";
import DropdownMenuBase from "../common/DropdownMenuBase";

interface DropdownActionMenuProps {
  /** 동작을 실행하는 항목(`DropdownActionItem`)들을 배치합니다. */
  children: ReactNode;
  /** 서피스에 추가할 위치·크기 클래스명 (예: `right-0 top-full mt-2 w-40`) */
  className?: string;
  /** 항목 사이 구분선 표시 여부. 액션 메뉴는 기본으로 구분선을 그립니다. */
  divided?: boolean;
}

/**
 * "action" 성격의 드롭다운 메뉴입니다. (예: 상품 등록 / 그룹 입장)
 *
 * - 각 항목이 하나의 동작을 실행하는 메뉴로, `children`에 `DropdownActionItem`을 직접 배치합니다.
 * - 항목을 탭하면 `onClick`이 실행되고 메뉴가 닫힙니다.
 * - 값을 고르는 목록형이 필요하면 `DropdownSelectMenu`를 사용하세요.
 *
 * @example
 * ```tsx
 * <DropdownActionMenu className="right-0 top-full mt-2 w-40">
 *   <DropdownActionItem onClick={handleRegister}>상품 등록</DropdownActionItem>
 *   <DropdownActionItem onClick={handleEnter}>그룹 입장</DropdownActionItem>
 * </DropdownActionMenu>
 * ```
 */
export default function DropdownActionMenu({
  children,
  className,
  divided = true,
}: DropdownActionMenuProps) {
  return (
    <DropdownMenuBase className={className} divided={divided}>
      {children}
    </DropdownMenuBase>
  );
}

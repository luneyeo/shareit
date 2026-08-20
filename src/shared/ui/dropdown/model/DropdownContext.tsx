"use client";

import { createContext, useContext, type RefObject } from "react";

export interface DropdownContextValue {
  /** 메뉴 열림 여부 */
  isOpen: boolean;
  /** 메뉴를 엽니다. */
  open: () => void;
  /** 메뉴를 닫습니다. (포커스 이동 없음) */
  close: () => void;
  /** 열림/닫힘을 토글합니다. */
  toggle: () => void;
  /** 트리거 버튼 id. 메뉴의 `aria-labelledby`로 연결됩니다. */
  triggerId: string;
  /** 메뉴 id. 트리거의 `aria-controls`로 연결됩니다. */
  menuId: string;
  /** 트리거 버튼 ref. 닫을 때 포커스 복귀에 사용합니다. */
  triggerRef: RefObject<HTMLButtonElement | null>;
  /** 메뉴 리스트 ref. 항목 포커스 이동에 사용합니다. */
  menuRef: RefObject<HTMLUListElement | null>;
}

export const DropdownContext = createContext<DropdownContextValue | null>(null);

/**
 * `<DropdownProvider>`가 제공하는 열림 상태·id·ref에 접근하는 훅입니다.
 *
 * 하위(`DropdownTrigger`, `DropdownActionMenu`, `DropdownSelectMenu` 등)에서만
 * 사용할 수 있습니다.
 */
export function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown 하위 컴포넌트는 <DropdownProvider> 내부에서만 사용할 수 있습니다.");
  }
  return context;
}

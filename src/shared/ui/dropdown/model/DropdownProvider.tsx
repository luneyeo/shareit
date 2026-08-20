"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { useDismiss } from "@/shared/hooks/useDismiss";
import { DropdownContext } from "./DropdownContext";

interface DropdownProviderProps {
  /** 트리거와 메뉴(`DropdownActionMenu`·`DropdownSelectMenu`)를 자식으로 배치합니다. */
  children: ReactNode;
  /** 트리거·메뉴를 감싸는 래퍼(`position: relative`)에 추가할 클래스명 */
  className?: string;
}

/**
 * 드롭다운의 열림 상태를 관리하는 Provider 겸 위치 기준 컨테이너입니다.
 *
 * - 열림 상태(`isOpen`)와 열기/닫기/토글, 트리거·메뉴 id·ref를 Context로 제공합니다.
 * - 바깥 영역 클릭과 `Escape` 입력 시 닫히도록 `useDismiss`를 연결합니다.
 * - 자식으로 `DropdownTrigger`와 메뉴(`DropdownActionMenu` 또는 `DropdownSelectMenu`)를
 *   배치해 사용합니다. 메뉴는 이 컨테이너(`relative`) 기준으로 절대 위치를 잡습니다.
 *
 * @example
 * ```tsx
 * <DropdownProvider>
 *   <DropdownTrigger>메뉴</DropdownTrigger>
 *   <DropdownActionMenu className="right-0 top-full mt-2 w-40">
 *     <DropdownActionItem onClick={handleRegister}>상품 등록</DropdownActionItem>
 *     <DropdownActionItem onClick={handleEnter}>그룹 입장</DropdownActionItem>
 *   </DropdownActionMenu>
 * </DropdownProvider>
 * ```
 */
export default function DropdownProvider({ children, className }: DropdownProviderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const baseId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  // 바깥 클릭·Escape 시 닫기. (닫기 후 트리거 포커스 복귀는 메뉴 키보드 핸들러가 담당)
  useDismiss(rootRef, isOpen, close);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        triggerId: `${baseId}-trigger`,
        menuId: `${baseId}-menu`,
        triggerRef,
        menuRef,
      }}
    >
      <div ref={rootRef} className={cn("relative inline-block", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

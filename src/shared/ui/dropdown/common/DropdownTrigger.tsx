"use client";

import type { ComponentPropsWithRef, MouseEvent } from "react";
import { useDropdownContext } from "../model/DropdownContext";

type DropdownTriggerProps = ComponentPropsWithRef<"button">;

/**
 * 드롭다운을 여닫는 트리거 버튼입니다.
 *
 * - `aria-haspopup="menu"`·`aria-expanded`·`aria-controls`로 메뉴와 연결됩니다.
 * - 탭(마우스·`Enter`·`Space` 네이티브 버튼 동작) 시 열림/닫힘을 토글합니다.
 * - 스타일·내용은 자유롭게 지정할 수 있으며, 전달한 `onClick`도 함께 실행됩니다.
 *
 * @example
 * ```tsx
 * <DropdownTrigger className="rounded-full p-2 hover:bg-gray-100" aria-label="메뉴 열기">
 *   <IcMenu />
 * </DropdownTrigger>
 * ```
 */
export default function DropdownTrigger({ onClick, ref, ...props }: DropdownTriggerProps) {
  const { isOpen, toggle, triggerId, menuId, triggerRef } = useDropdownContext();

  const setRef = (node: HTMLButtonElement | null) => {
    triggerRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    toggle();
  };

  return (
    <button
      {...props}
      ref={setRef}
      id={triggerId}
      type="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? menuId : undefined}
      onClick={handleClick}
    />
  );
}

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { useDismiss } from "@/shared/hooks/useDismiss";

interface UseListboxParams {
  /** 옵션 개수 */
  itemCount: number;
  /** 열릴 때 활성화할 옵션 인덱스 (선택된 값). 없으면 -1 */
  selectedIndex: number;
  /** 옵션 확정 시 실행 (index 전달) */
  onSelect: (index: number) => void;
}

/**
 * WAI-ARIA 접기형 listbox의 열림 상태·키보드·포커스를 관리하는 훅입니다.
 *
 * `aria-activedescendant` 방식으로 활성 옵션을 추적하며, 아래 동작을 처리합니다.
 * - 트리거: `Enter`·`Space`·`↑`·`↓`로 열기 (선택 옵션에 활성)
 * - 목록: `↑`·`↓`·`Home`·`End`로 활성 이동, `Enter`·`Space`로 확정
 * - `Esc` 닫고 트리거로 포커스 복귀, `Tab`·바깥 클릭으로 닫기
 *
 * 반환하는 `triggerProps` · `listboxProps` · `getOptionProps`를 각 요소에 spread하고,
 * `containerRef`를 바깥 래퍼에 연결해 사용합니다. `aria-selected`·스타일 등 데이터에
 * 의존하는 속성은 소비 측에서 추가합니다.
 *
 * @example
 * ```tsx
 * const lb = useListbox({ itemCount, selectedIndex, onSelect });
 * <div ref={lb.containerRef}>
 *   <button {...lb.triggerProps}>...</button>
 *   {lb.isOpen && (
 *     <ul {...lb.listboxProps}>
 *       {items.map((item, i) => (
 *         <li key={item.id} {...lb.getOptionProps(i, item.id === selectedId)}>{item.name}</li>
 *       ))}
 *     </ul>
 *   )}
 * </div>
 * ```
 */
export function useListbox({ itemCount, selectedIndex, onSelect }: UseListboxParams) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const listboxId = `${baseId}-listbox`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  useDismiss(containerRef, isOpen, () => setIsOpen(false));

  // 목록이 열리면 listbox로 포커스를 옮기고, 활성 옵션을 보이도록 스크롤한다.
  useEffect(() => {
    if (!isOpen) return;
    listboxRef.current?.focus();
    document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  const open = () => {
    if (itemCount === 0) return;
    setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex);
    setIsOpen(true);
  };

  const close = ({ returnFocus }: { returnFocus: boolean }) => {
    setIsOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const select = (index: number) => {
    close({ returnFocus: true });
    onSelect(index);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      open();
    }
  };

  const handleListboxKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, itemCount - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(itemCount - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        select(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        close({ returnFocus: true });
        break;
      case "Tab":
        close({ returnFocus: false });
        break;
    }
  };

  return {
    isOpen,
    activeIndex,
    containerRef,
    triggerProps: {
      ref: triggerRef,
      id: triggerId,
      type: "button" as const,
      onClick: () => (isOpen ? close({ returnFocus: false }) : open()),
      onKeyDown: handleTriggerKeyDown,
      "aria-haspopup": "listbox" as const,
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? listboxId : undefined,
    },
    listboxProps: {
      ref: listboxRef,
      id: listboxId,
      role: "listbox" as const,
      tabIndex: -1,
      "aria-labelledby": triggerId,
      "aria-activedescendant":
        activeIndex >= 0 && activeIndex < itemCount ? optionId(activeIndex) : undefined,
      onKeyDown: handleListboxKeyDown,
    },
    getOptionProps: (index: number, selected: boolean) => ({
      id: optionId(index),
      role: "option" as const,
      "aria-selected": selected,
      onClick: () => select(index),
      onMouseMove: () => setActiveIndex(index),
    }),
  };
}

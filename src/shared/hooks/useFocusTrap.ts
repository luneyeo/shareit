import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapParams {
  /** 트랩 활성화 여부 (보통 열림 또는 마운트 상태) */
  active: boolean;
  /** `Escape` 키 입력 시 실행 */
  onEscape?: () => void;
}

/**
 * 다이얼로그·모달 영역의 포커스 접근성을 관리하는 훅입니다.
 *
 * - 활성화되면 컨테이너 내부의 첫 포커스 대상(없으면 컨테이너 자신)으로 포커스를 이동
 * - `Tab`·`Shift+Tab` 포커스를 컨테이너 내부에 가둠(포커스 트랩)
 * - `Escape` 키 입력 시 `onEscape` 실행
 * - 비활성화(언마운트) 시 직전에 포커스돼 있던 요소로 복귀
 *
 * 반환하는 ref를 트랩 대상 컨테이너에 연결하고, 컨테이너가 자체 포커스를 받을 수 있도록
 * `tabIndex={-1}`을 함께 지정하는 것을 권장합니다.
 *
 * @example
 * ```tsx
 * const surfaceRef = useFocusTrap<HTMLDivElement>({ active: isOpen, onEscape: onClose });
 * <div ref={surfaceRef} role="dialog" aria-modal="true" tabIndex={-1}>...</div>
 * ```
 */
export function useFocusTrap<T extends HTMLElement>({ active, onEscape }: UseFocusTrapParams) {
  const containerRef = useRef<T>(null);
  // 최신 onEscape를 참조해, 콜백 변경이 트랩 setup을 재실행시키지 않도록 한다.
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  });

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusables[0] ?? container).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      // 포커스 가능한 요소가 없으면 컨테이너 밖으로 나가지 않도록 이동을 막는다.
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [active]);

  return containerRef;
}

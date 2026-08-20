import { useEffect, type RefObject } from "react";

/**
 * 바깥 영역 클릭 또는 `Escape` 키 입력 시 닫기 동작을 실행하는 훅입니다.
 *
 * 드롭다운 · 모달 · 팝오버처럼 "열렸을 때 바깥을 누르거나 ESC로 닫는" UI에서
 * 재사용합니다.
 *
 * - `ref`: 바깥 클릭 판별 기준이 되는 컨테이너 ref
 * - `enabled`: 리스너 활성화 여부 (보통 열림 상태)
 * - `onDismiss`: 닫기 콜백
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 * useDismiss(ref, isOpen, () => setIsOpen(false));
 * ```
 */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  onDismiss: () => void
) {
  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onDismiss();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, enabled, onDismiss]);
}

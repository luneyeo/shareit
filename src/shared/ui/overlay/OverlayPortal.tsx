"use client";

import { useSyncExternalStore, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/utils/cn";
import { useFocusTrap } from "@/shared/hooks/useFocusTrap";
import OverlaySurface from "./OverlaySurface";

const emptySubscribe = () => () => {};

interface OverlayPortalProps {
  children: ReactNode;
  /** 배경(오버레이 영역) 클릭 또는 Escape 키 입력 시 호출됩니다. */
  onClose?: () => void;
  /** 오버레이 컨테이너에 추가할 클래스명 */
  className?: string;
  /** 내부 서피스(OverlaySurface)에 추가할 클래스명 */
  surfaceClassName?: string;
  /** 다이얼로그의 접근 가능한 이름. `ariaLabelledby`가 없을 때 사용합니다. */
  ariaLabel?: string;
  /** 다이얼로그 제목 요소의 id. 지정 시 `aria-labelledby`로 연결됩니다. */
  ariaLabelledby?: string;
}

/**
 * 모달·다이얼로그 등 전역 팝업을 감싸는 접근성 있는 오버레이 컴포넌트입니다.
 *
 * - `document.body`에 포탈로 렌더링되어 상위 요소의 stacking context에 영향을 받지 않습니다.
 * - `children`은 화면 중앙의 `OverlaySurface`(`role="dialog"`, `aria-modal`)로 감싸져 표시됩니다.
 * - 열릴 때 서피스로 포커스를 이동하고, Tab 포커스를 내부에 가두며(포커스 트랩), 닫힌 뒤 이전 포커스로 복귀합니다.
 * - 배경 클릭 또는 Escape 키 입력 시 `onClose`가 호출됩니다.
 * - 접근 가능한 이름을 위해 `ariaLabel` 또는 `ariaLabelledby` 중 하나를 지정하세요.
 *
 * @example
 * ```tsx
 * <OverlayPortal ariaLabel="삭제 확인" onClose={handleClose}>
 *   <ConfirmDialog ... />
 * </OverlayPortal>
 * ```
 */
export default function OverlayPortal({
  children,
  onClose,
  className,
  surfaceClassName,
  ariaLabel,
  ariaLabelledby,
}: OverlayPortalProps) {
  // 포탈 대상인 document.body는 클라이언트에만 존재하므로,
  // 서버/하이드레이션 시점에는 null을 렌더링해 불일치를 방지합니다.
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  // 열릴 때 서피스로 포커스 이동·트랩·Escape 닫기, 닫힐 때 이전 포커스 복귀를 담당합니다.
  const surfaceRef = useFocusTrap<HTMLDivElement>({
    active: isClient,
    onEscape: onClose,
  });

  if (!isClient) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-overlay flex items-center justify-center bg-black/50 p-4",
        className
      )}
      onClick={handleBackdropClick}
    >
      <OverlaySurface
        ref={surfaceRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabelledby ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledby}
        tabIndex={-1}
        className={cn("outline-none", surfaceClassName)}
      >
        {children}
      </OverlaySurface>
    </div>,
    document.body
  );
}

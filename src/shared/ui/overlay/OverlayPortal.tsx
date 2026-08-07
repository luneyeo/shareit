"use client";

import { useSyncExternalStore, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/utils/cn";
import OverlaySurface from "./OverlaySurface";

const emptySubscribe = () => () => {};

interface OverlayPortalProps {
  children: ReactNode;
  /** 배경(오버레이 영역)을 클릭했을 때 호출됩니다. */
  onClose?: () => void;
  /** 오버레이 컨테이너에 추가할 클래스명 */
  className?: string;
  /** 내부 서피스(OverlaySurface)에 추가할 클래스명 */
  surfaceClassName?: string;
}

/**
 * 모달·다이얼로그 등 전역 팝업의 뒤에 깔리는 반투명 배경 컴포넌트입니다.
 *
 * - `document.body`에 포탈로 렌더링되어 상위 요소의 stacking context에 영향을 받지 않습니다.
 * - 배경 영역을 클릭하면 `onClose`가 호출됩니다. (내부 콘텐츠 클릭은 무시)
 * - `children`은 화면 중앙에 위치한 `OverlaySurface`로 감싸져 표시됩니다.
 *
 * @example
 * ```tsx
 * <OverlayPortal onClose={handleClose}>
 *   <ConfirmDialog ... />
 * </OverlayPortal>
 * ```
 */
export default function OverlayPortal({
  children,
  onClose,
  className,
  surfaceClassName,
}: OverlayPortalProps) {
  // 포탈 대상인 document.body는 클라이언트에만 존재하므로,
  // 서버/하이드레이션 시점에는 null을 렌더링해 불일치를 방지합니다.
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

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
      <OverlaySurface className={surfaceClassName}>{children}</OverlaySurface>
    </div>,
    document.body
  );
}

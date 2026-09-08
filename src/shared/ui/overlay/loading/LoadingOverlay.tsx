"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/utils/cn";
import Spinner from "@/shared/ui/spinner/Spinner";

const emptySubscribe = () => () => {};

interface LoadingOverlayProps {
  /** 스크린리더로 읽어줄 로딩 설명. 기본값은 "로딩 중"입니다. */
  label?: string;
  /** 오버레이 컨테이너에 추가할 클래스명 */
  className?: string;
}

/**
 * 비동기 작업 동안 전체 화면을 덮어 상호작용을 막는 로딩 오버레이입니다.
 *
 * - `document.body`에 포탈로 렌더링되며, 어두운 배경 위에 중앙 스피너를 표시합니다.
 * - 화면 전체를 덮으므로 배경 요소로의 클릭·포커스가 차단됩니다.
 * - 표시 여부는 부모가 조건부 렌더링으로 제어합니다. (`{isPending && <LoadingOverlay />}`)
 * - `role="status"`로 로딩 상태를 알리며, `label`로 스크린리더 문구를 지정할 수 있습니다.
 *
 * @example
 * ```tsx
 * {isPending && <LoadingOverlay label="등록 중" />}
 * ```
 */
export default function LoadingOverlay({ label = "로딩 중", className }: LoadingOverlayProps) {
  // 포탈 대상인 document.body는 클라이언트에만 존재하므로,
  // 서버/하이드레이션 시점에는 null을 렌더링해 불일치를 방지합니다.
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) return null;

  return createPortal(
    <div
      role="status"
      aria-label={label}
      className={cn(
        "fixed inset-0 z-overlay flex items-center justify-center bg-black/50 text-white",
        className
      )}
    >
      <Spinner size="lg" />
    </div>,
    document.body
  );
}

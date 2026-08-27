"use client";

import { cn } from "@/shared/utils/cn";
import { useToastStore } from "@/shared/store/toastStore";
import Toast from "./Toast";

/**
 * 앱 전역에 하나만 마운트하는 토스트 렌더러입니다.
 *
 * store의 현재 토스트를 헤더 아래(`top: 56px`, 좌우 12px)에 노출합니다.
 * 노출 시간·자동 소멸·교체 타이밍은 store가 조율하고, 이 컴포넌트는 그 상태를
 * 위→아래 슬라이드 + 페이드로 그려주기만 합니다.
 *
 * 라이브 영역(`role="status"` `aria-live="polite"`)은 항상 마운트해 두어
 * 내용이 바뀔 때 스크린리더가 안정적으로 읽도록 합니다.
 */
export default function Toaster() {
  const item = useToastStore((state) => state.item);
  const isVisible = useToastStore((state) => state.isVisible);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed top-14 right-3 left-3 z-toast"
    >
      {item && (
        <div
          className={cn(
            "transition-all duration-200 ease-out",
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          )}
        >
          <Toast status={item.status} message={item.message} />
        </div>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/shared/utils/cn";
import { useToastStore } from "@/shared/store/toastStore";
import Toast from "./Toast";

/**
 * 앱 전역에 하나만 마운트하는 토스트 렌더러입니다.
 *
 * store의 현재 토스트를 하단 탭바 위, 모바일 프레임 폭(max-w-120) 중앙에 노출합니다.
 * (상단 헤더·카테고리 탭 등 콘텐츠와 겹치지 않도록 하단에 띄웁니다.)
 * 오버레이 위에 뜨도록 프레임(transform-gpu) 밖 body 직속에 마운트해야 합니다. (layout.tsx 참고)
 * 노출 시간·자동 소멸·교체 타이밍은 store가 조율하고, 이 컴포넌트는 그 상태를
 * 아래→위 슬라이드 + 페이드로 그려주기만 합니다.
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
      className="pointer-events-none fixed inset-x-0 bottom-[calc(3.75rem+env(safe-area-inset-bottom)+0.75rem)] z-toast flex justify-center px-3"
    >
      {item && (
        <div
          className={cn(
            "w-full max-w-120 transition-all duration-200 ease-out",
            isVisible ? "-translate-y-5 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          <Toast status={item.status} message={item.message} />
        </div>
      )}
    </div>
  );
}

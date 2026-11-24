"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { getSessionUserId } from "@/shared/api/auth/getSessionUserId";
import OverlayPortal from "@/shared/ui/overlay/OverlayPortal";
import { useScrolledToBottom } from "@/shared/hooks/useScrolledToBottom";

/**
 * 랜딩 페이지 맨 아래까지 스크롤하면 슬라이드업 팝업으로 데모 모드 진입을 안내합니다.
 * 닫으면 세션 내에서 재노출되지 않으며, 로그인한 사용자에게는 노출하지 않습니다.
 */
export default function DemoCallout() {
  const { sentinelRef, reached } = useScrolledToBottom();
  // 세션 확인이 끝나 비로그인으로 판명된 경우에만 true. 확인 전 노출로 깜빡이지 않도록 false로 시작한다.
  const [isGuest, setIsGuest] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return (
        typeof window !== "undefined" && sessionStorage.getItem("demo-callout-dismissed") === "true"
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    getSessionUserId().then((userId) => setIsGuest(!userId));
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem("demo-callout-dismissed", "true");
    } catch {
      // 저장소 접근 실패해도 닫기는 계속 진행
    }
    setDismissed(true);
  };

  const isOpen = isGuest && reached && !dismissed;

  return (
    <>
      <div ref={sentinelRef} aria-hidden />

      {isOpen && (
        <OverlayPortal
          className="items-end"
          surfaceClassName={cn(
            "w-full max-w-120 rounded-b-none rounded-t-2xl p-4",
            "animate-[slide-up_0.25s_ease-out]"
          )}
          ariaLabel="데모 체험 안내"
          onClose={dismiss}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="typo-18-bold text-gray-900">먼저 둘러볼까요?</p>
              <p className="mt-1 typo-16-medium text-gray-500">
                로그인 없이 샘플 데이터로 서비스를 체험해볼 수 있어요.
              </p>
            </div>
            <button
              type="button"
              aria-label="닫기"
              onClick={dismiss}
              className="shrink-0 typo-20-medium text-gray-400"
            >
              ✕
            </button>
          </div>

          <Link
            href="/demo"
            className={cn(
              "mt-5 block w-full rounded-full bg-primary-600 py-3",
              "text-center typo-16-bold text-white"
            )}
          >
            데모 체험하기
          </Link>
        </OverlayPortal>
      )}
    </>
  );
}

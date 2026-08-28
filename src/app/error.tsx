"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Button from "@/shared/ui/button/Button";
import ErrorFallback from "@/shared/ui/error-fallback/ErrorFallback";

/**
 * 루트 에러 바운더리(500). 하위 세그먼트에서 처리되지 않은 예외를 잡습니다.
 *
 * `reset`은 해당 세그먼트를 다시 렌더링해 복구를 시도합니다.
 * global-error.tsx와 동일하게 production 빌드에서만 Sentry로 실제 전송됩니다.
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorFallback
      animation="500"
      message="문제가 발생했어요"
      description="잠시 후 다시 시도해 주세요."
    >
      <Button theme="primary" size="md" className="w-full" onClick={reset}>
        새로 고침
      </Button>
    </ErrorFallback>
  );
}

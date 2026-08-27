"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

// App Router의 클라이언트 렌더 오류(루트 레이아웃 상위)를 Sentry로 전달한다.
// instrumentation-client.ts와 동일하게 production 빌드에서만 실제 전송된다.
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}

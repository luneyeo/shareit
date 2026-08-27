import * as Sentry from "@sentry/nextjs";

// 배포(production) 빌드에서만 모니터링을 활성화한다. `next dev`(개발) 환경에서는 비활성화된다.
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    // 성능 트레이싱 샘플링 비율(0~1). 트래픽에 맞게 조정한다.
    tracesSampleRate: 0.1,
  });
}

// App Router 클라이언트 네비게이션을 트레이싱에 연결한다.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

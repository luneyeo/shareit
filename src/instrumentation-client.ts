import * as Sentry from "@sentry/nextjs";

// 실제 Production 배포에서만 모니터링을 활성화한다.
// NODE_ENV는 Vercel Preview 배포에서도 "production"이므로, Preview·개발을 걸러내기 위해
// 클라이언트에서는 Vercel이 주입하는 NEXT_PUBLIC_VERCEL_ENV로 판별한다.
if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    // 성능 트레이싱 샘플링 비율(0~1). 트래픽에 맞게 조정한다.
    tracesSampleRate: 0.1,
  });
}

// App Router 클라이언트 네비게이션을 트레이싱에 연결한다.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

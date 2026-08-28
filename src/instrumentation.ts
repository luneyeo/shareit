import * as Sentry from "@sentry/nextjs";

// 실제 Production 배포에서만 모니터링을 활성화한다.
// NODE_ENV는 Vercel Preview 배포에서도 "production"이므로, Preview·개발을 걸러내기 위해
// 서버에서는 Vercel이 주입하는 VERCEL_ENV로 판별한다.
const enabled = process.env.VERCEL_ENV === "production";

// nodejs·edge 런타임 공통 초기화. 두 런타임 모두 register()를 호출한다.
export async function register() {
  if (!enabled) return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    // 성능 트레이싱 샘플링 비율(0~1). 트래픽에 맞게 조정한다.
    tracesSampleRate: 0.1,
  });
}

// 서버 컴포넌트·라우트 핸들러의 오류를 Sentry로 전달한다.
export const onRequestError = Sentry.captureRequestError;

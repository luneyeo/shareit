import * as Sentry from "@sentry/nextjs";

// 배포(production) 빌드에서만 모니터링을 활성화한다. `next dev`(개발) 환경에서는 비활성화된다.
const enabled = process.env.NODE_ENV === "production";

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

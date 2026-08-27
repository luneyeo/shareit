"use client";

/**
 * Sentry 연동 확인용 임시 페이지. 배포 후 검증이 끝나면 이 폴더와
 * src/app/api/sentry-test 를 함께 삭제한다.
 *
 * - 클라이언트 오류: 버튼 클릭 시 throw → Sentry 브라우저 전역 핸들러가 캡처
 * - 서버 오류: API 라우트 호출 → instrumentation.ts의 onRequestError가 캡처
 *
 * 두 오류 모두 production 빌드 + SENTRY_DSN 이 있어야 실제로 전송된다.
 */
export default function SentryTestPage() {
  return (
    <main style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      <h1>Sentry 테스트</h1>
      <button
        type="button"
        onClick={() => {
          throw new Error("Sentry client 테스트 오류");
        }}
      >
        클라이언트 오류 발생
      </button>
      <button
        type="button"
        onClick={() => {
          void fetch("/api/sentry-test");
        }}
      >
        서버 오류 발생
      </button>
    </main>
  );
}

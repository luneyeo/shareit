// Sentry 연동 확인용 임시 라우트. 검증 후 src/app/sentry-test 와 함께 삭제한다.
export function GET() {
  throw new Error("Sentry server 테스트 오류");
}

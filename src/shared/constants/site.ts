/**
 * 환경별 사이트 URL을 반환한다.
 *
 * 우선순위: 프로덕션 → 프리뷰/브랜치 배포 → 로컬.
 * 커스텀 도메인이 생기면 이 함수만 수정하면 된다. (예: 최상단에서 고정 URL 반환)
 */
export function getSiteUrl(): string {
  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" &&
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

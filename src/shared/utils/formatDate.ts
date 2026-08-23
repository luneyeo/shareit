/**
 * 날짜를 "2026년 3월 12일" 형태의 한국어 문자열로 변환합니다.
 *
 * @param date - ISO 8601 날짜 문자열 또는 Date 객체
 *
 * @example
 * ```ts
 * formatDate("2026-03-12") // "2026년 3월 12일"
 * ```
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

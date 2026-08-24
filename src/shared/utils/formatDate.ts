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
  // "YYYY-MM-DD"는 new Date()가 UTC 자정으로 해석해 로컬 시간대에 따라 하루가 밀릴 수 있으므로,
  // 시간대 변환 없이 문자열 구성 요소를 직접 사용한다.
  if (typeof date === "string") {
    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const [, year, month, day] = match;
      return `${year}년 ${Number(month)}월 ${Number(day)}일`;
    }
  }

  const d = new Date(date);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

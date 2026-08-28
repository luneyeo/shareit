/**
 * 가격을 한국어 천 단위 구분 문자열로 변환합니다.
 *
 * @example
 * ```ts
 * formatPrice(5000) // "5,000"
 * formatPrice(1000000) // "1,000,000"
 * ```
 */
export const formatPrice = (price: number): string => price.toLocaleString("ko-KR");

/**
 * 가격을 한국어 포맷 문자열로 변환합니다.
 *
 * @example
 * ```ts
 * formatPrice(5000) // "5,000원"
 * formatPrice(1000000) // "1,000,000원"
 * ```
 */
export const formatPrice = (price: number): string => `${price.toLocaleString("ko-KR")}원`;

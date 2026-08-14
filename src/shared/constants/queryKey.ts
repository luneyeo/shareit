/**
 * TanStack Query의 queryKey를 도메인별로 한곳에서 관리한다.
 * 키 중복·오타를 방지하고, 무효화(invalidate) 시 참조를 일관되게 유지한다.
 */
export const queryKeys = {} as const;

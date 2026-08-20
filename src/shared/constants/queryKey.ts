/**
 * TanStack Query의 queryKey를 도메인별로 한곳에서 관리한다.
 * 키 중복·오타를 방지하고, 무효화(invalidate) 시 참조를 일관되게 유지한다.
 */
export const queryKeys = {
  groups: {
    /** 그룹 도메인 전체 무효화용 루트 키 */
    all: ["groups"] as const,
    /** 로그인한 사용자가 속한 그룹 목록 */
    my: ["groups", "my"] as const,
  },
} as const;

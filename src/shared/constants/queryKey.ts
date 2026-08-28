/**
 * TanStack Query의 queryKey를 도메인별로 한곳에서 관리한다.
 * 키 중복·오타를 방지하고, 무효화(invalidate) 시 참조를 일관되게 유지한다.
 */
export const queryKeys = {
  groups: {
    /** 그룹 도메인 전체 무효화용 루트 키 */
    all: ["groups"] as const,
    /** 특정 사용자가 속한 그룹 목록. 사용자 간 캐시가 섞이지 않도록 userId를 키에 포함한다. */
    my: (userId: string | undefined) => ["groups", "my", userId] as const,
    /** 특정 그룹 상세. 사용자별 role이 응답에 포함되므로 userId를 키에 포함한다. */
    detail: (groupId: string, userId: string | undefined) =>
      ["groups", "detail", groupId, userId] as const,
  },
  products: {
    /** 상품 도메인 전체 무효화용 루트 키 */
    all: ["products"] as const,
    /** 특정 대시보드(그룹) 안의 개별 상품 상세. 대시보드별로 캐시를 분리한다. */
    detail: (dashboardId: string, productId: string) =>
      ["products", "detail", dashboardId, productId] as const,
  },
} as const;

"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/constants/queryKey";
import { getProduct } from "@/shared/api/product/getProduct";

/**
 * 특정 대시보드(그룹) 안의 개별 상품 상세를 조회하는 훅.
 *
 * dashboardId·productId는 상세 페이지 경로에서 오며, 두 값이 모두 있을 때만 조회한다.
 * 조건에 맞는 상품이 없으면 `data`가 `null`이 되어 호출부가 "미존재" 상태를 구분한다.
 *
 * @example
 * const { data: product, isPending, isError } = useProductDetail(dashboardId, productId);
 */
export function useProductDetail(dashboardId: string, productId: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(dashboardId, productId),
    queryFn: () => getProduct(dashboardId, productId),
    enabled: !!dashboardId && !!productId,
  });
}

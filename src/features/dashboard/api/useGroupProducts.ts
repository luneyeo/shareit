"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/constants/queryKey";
import { getGroupProducts } from "@/shared/api/product/getGroupProducts";

/**
 * 특정 그룹의 상품 목록을 조회하는 훅.
 *
 * groupId가 있을 때만 조회하며, 최신순으로 정렬된 상품 카드 데이터를 반환한다.
 *
 * TODO: 카테고리 필터 연동 시 category 인자를 받아 queryKey·조회 조건에 반영할 것. (별도 이슈)
 *
 * @example
 * const { data: products, isPending, isError, refetch } = useGroupProducts(groupId);
 */
export function useGroupProducts(groupId: string) {
  return useQuery({
    queryKey: queryKeys.products.list(groupId),
    queryFn: () => getGroupProducts(groupId),
    enabled: !!groupId,
  });
}

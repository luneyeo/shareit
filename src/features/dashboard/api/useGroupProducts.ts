"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/constants/queryKey";
import { getGroupProducts } from "@/shared/api/product/getGroupProducts";

/**
 * 특정 그룹의 상품 목록을 조회하는 훅.
 *
 * groupId가 있을 때만 조회하며, 최신순으로 정렬된 상품 카드 데이터를 반환한다.
 * `category`가 주어지면(전체=null이 아니면) 해당 카테고리로만 필터한다.
 *
 * @example
 * const { data: products, isPending, isError, refetch } = useGroupProducts(groupId, category);
 */
export function useGroupProducts(groupId: string, category: string | null = null) {
  return useQuery({
    queryKey: queryKeys.products.list(groupId, category),
    queryFn: () => getGroupProducts(groupId, category),
    enabled: !!groupId,
  });
}

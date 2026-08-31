"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/constants/queryKey";
import { getGroupProducts, type ProductCursor } from "@/shared/api/product/getGroupProducts";

/**
 * 특정 그룹의 상품 목록을 커서 기반으로 무한 조회하는 훅.
 *
 * groupId가 있을 때만 조회하며, 최신순 페이지를 이어 받는다. (getNextPageParam이 null이면 끝)
 * `category`가 주어지면(전체=null이 아니면) 해당 카테고리로만 필터한다.
 *
 * @example
 * const { data, isPending, isError, fetchNextPage, hasNextPage } = useGroupProducts(groupId, category);
 * const products = data?.pages.flatMap((page) => page.items) ?? [];
 */
export function useGroupProducts(groupId: string, category: string | null = null) {
  return useInfiniteQuery({
    queryKey: queryKeys.products.list(groupId, category),
    queryFn: ({ pageParam }) => getGroupProducts(groupId, category, pageParam),
    initialPageParam: null as ProductCursor | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!groupId,
  });
}

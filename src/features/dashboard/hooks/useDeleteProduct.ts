"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/shared/api/product/deleteProduct";
import { queryKeys } from "@/shared/constants/queryKey";

/**
 * 상품 삭제 mutation 훅.
 *
 * 성공 시 상품 도메인 캐시를 무효화해 목록·상세에서 삭제가 반영되도록 한다.
 * (products.all은 접두사 매칭이라 products.detail 쿼리까지 함께 무효화된다.)
 *
 * @example
 * const { mutateAsync, isPending } = useDeleteProduct();
 * await mutateAsync(productId);
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

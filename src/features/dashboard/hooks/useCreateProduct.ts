"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/shared/api/product/createProduct";
import { queryKeys } from "@/shared/constants/queryKey";

/**
 * 상품 등록 mutation 훅.
 *
 * 성공 시 상품 도메인 캐시를 무효화해 목록·상세에 새 상품이 반영되도록 한다.
 *
 * @example
 * const { mutateAsync, isPending } = useCreateProduct();
 * await mutateAsync({ ...values, imageUrl, groupId });
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

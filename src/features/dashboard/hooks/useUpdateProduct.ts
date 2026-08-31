"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/shared/api/product/updateProduct";
import { queryKeys } from "@/shared/constants/queryKey";

/**
 * 상품 수정 mutation 훅.
 *
 * 성공 시 상품 도메인 캐시를 무효화해 상세·목록에 수정 내용이 반영되도록 한다.
 * (products.all은 접두사 매칭이라 products.detail 쿼리까지 함께 무효화된다.)
 *
 * @example
 * const { mutateAsync, isPending } = useUpdateProduct();
 * await mutateAsync({ productId, ...values, imageUrl });
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

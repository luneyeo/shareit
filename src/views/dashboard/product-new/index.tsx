"use client";

import { useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/features/dashboard/product-form/common/ui/ProductForm";
import ProductFormHeader from "@/features/dashboard/product-form/common/ui/ProductFormHeader";
import type { ProductFormValues } from "@/features/dashboard/product-form/common/schema";
import { uploadProductImages } from "@/shared/api/product/uploadProductImages";
import { useCreateProduct } from "@/features/dashboard/hooks/useCreateProduct";
import { PRODUCT_MESSAGE } from "@/features/dashboard/constants/messages";
import { toast } from "@/shared/ui/feedback";
import LoadingOverlay from "@/shared/ui/overlay/loading/LoadingOverlay";

/**
 * 대시보드 내 상품 등록 페이지 컴포넌트
 *
 * @example
 * import { ProductNewPage } from '@/views/dashboard/product-new'
 * export default ProductNewPage
 */
export function ProductNewPage() {
  const router = useRouter();
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const { mutateAsync: createProduct } = useCreateProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 이동 후 상세 페이지가 준비될 때까지 오버레이를 유지하기 위한 전환 상태
  const [isNavigating, startTransition] = useTransition();
  const isLoading = isSubmitting || isNavigating;

  const handleSubmit = async ({ imageFiles, ...rest }: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      // 1) 선택한 원본 File을 Storage에 올려 공개 URL로 대체한다.
      const imageUrl = await uploadProductImages(imageFiles);

      // 2) 받은 URL을 포함해 products 테이블에 등록한다.
      //    rest에 남은 미리보기 imageUrl은 뒤의 실제 imageUrl로 덮어쓴다.
      const productId = await createProduct({ ...rest, imageUrl, groupId: dashboardId });

      // 성공: 상세 페이지가 준비될 때까지 오버레이를 유지하도록 이동을 전환으로 감싼다.
      toast.success(PRODUCT_MESSAGE.CREATE.SUCCESS);
      startTransition(() => {
        router.replace(`/dashboard/${dashboardId}/product/${productId}`);
      });
    } catch (error) {
      // 업로드·등록 어느 단계에서 실패해도 사용자에겐 동일하게 안내한다.
      console.error(error);
      toast.error(PRODUCT_MESSAGE.CREATE.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProductFormHeader title="제품 등록" />
      <ProductForm submitLabel="등록하기" onSubmit={handleSubmit} isSubmitting={isLoading} />
      {isLoading && <LoadingOverlay label="등록 중" />}
    </>
  );
}

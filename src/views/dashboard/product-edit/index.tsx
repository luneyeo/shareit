"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/features/dashboard/product-form/common/ui/ProductForm";
import ProductFormHeader from "@/features/dashboard/product-form/common/ui/ProductFormHeader";
import type { ProductFormValues } from "@/features/dashboard/product-form/common/schema";
import { useProductDetail } from "@/features/dashboard/product-detail/apis/useProductDetail";
import { useUpdateProduct } from "@/features/dashboard/hooks/useUpdateProduct";
import type { ProductDetail } from "@/features/dashboard/types";
import { uploadProductImages } from "@/shared/api/product/uploadProductImages";
import { PRODUCT_MESSAGE } from "@/features/dashboard/constants/messages";
import { toast } from "@/shared/ui/feedback";
import EmptyState from "@/shared/ui/empty-state/EmptyState";

/**
 * 조회한 상품을 수정 폼의 초기값으로 변환한다.
 *
 * DB의 nullable 값은 폼 입력이 다루는 빈 문자열/빈 배열로 채우고, price는 폼이
 * 문자열로 다루므로 문자열로 바꾼다. 기존 이미지는 URL이라 미리보기용 imageUrl로만
 * 넣고, 업로드 대상 imageFiles는 비운 채 둔다(기본값).
 */
function toFormValues(product: ProductDetail): Partial<ProductFormValues> {
  return {
    brandName: product.brandName ?? "",
    prdName: product.prdName,
    category: product.category ?? "",
    price: product.price !== null ? String(product.price) : "",
    purchasePlace: product.store ?? "",
    description: product.description ?? "",
    imageUrl: product.imageUrl ?? [],
    tag: product.tag ?? [],
  };
}

/**
 * 대시보드 내 상품 수정 페이지 컴포넌트
 *
 * 기존 상품을 조회해 폼 초기값으로 채운다. `ProductForm`은 마운트 시점의
 * defaultValues로 폼을 초기화하므로, 조회가 끝난 뒤에 폼을 마운트한다.
 *
 * @example
 * import { ProductEditPage } from '@/views/dashboard/product-edit'
 * export default ProductEditPage
 */
export function ProductEditPage() {
  const router = useRouter();
  const { dashboardId, productId } = useParams<{ dashboardId: string; productId: string }>();
  const { data: product, isPending, isError, refetch } = useProductDetail(dashboardId, productId);
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ({ imageFiles, imageUrl, ...rest }: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      // 새로 추가한 이미지(blob: 미리보기)만 Storage에 올리고, 기존 원격 URL은 그대로 둔다.
      // imageUrl의 순서를 유지하며 blob: 항목을 업로드 결과로 자리 바꿔 최종 URL을 만든다.
      const uploaded = await uploadProductImages(imageFiles);
      let next = 0;
      const finalImageUrl = imageUrl.flatMap((url) => {
        if (!url.startsWith("blob:")) return [url];
        const uploadedUrl = uploaded[next++];
        return uploadedUrl ? [uploadedUrl] : [];
      });

      await updateProduct({ productId, ...rest, imageUrl: finalImageUrl });

      toast.success(PRODUCT_MESSAGE.UPDATE.SUCCESS);
      router.replace(`/dashboard/${dashboardId}/product/${productId}`);
    } catch (error) {
      console.error(error);
      toast.error(PRODUCT_MESSAGE.UPDATE.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProductFormHeader title="제품 수정" />

      {isPending ? (
        <div className="flex min-h-dvh items-center justify-center px-5 py-16">
          <p className="typo-14-medium text-gray-500">상품을 불러오는 중이에요.</p>
        </div>
      ) : isError ? (
        <EmptyState
          type="error"
          message="상품을 불러오지 못했어요"
          description="잠시 후 다시 시도해주세요"
          className="min-h-dvh"
          onRetry={() => refetch()}
        />
      ) : !product ? (
        <EmptyState
          type="notice"
          message="상품을 찾을 수 없어요"
          description="삭제되었거나 접근할 수 없는 상품이에요"
          className="min-h-dvh"
        />
      ) : (
        <ProductForm
          defaultValues={toFormValues(product)}
          submitLabel="수정하기"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import ProductForm from "@/features/dashboard/product-form/common/ui/ProductForm";
import ProductFormHeader from "@/features/dashboard/product-form/common/ui/ProductFormHeader";
import type { ProductFormValues } from "@/features/dashboard/product-form/common/schema";
import { uploadProductImages } from "@/shared/api/product/uploadProductImages";

/**
 * 대시보드 내 상품 등록 페이지 컴포넌트
 *
 * @example
 * import { ProductNewPage } from '@/views/dashboard/product-new'
 * export default ProductNewPage
 */
export function ProductNewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ({ imageFiles, ...rest }: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      // 선택한 원본 File을 Storage에 올려 공개 URL로 대체한다.
      const imageUrl = await uploadProductImages(imageFiles);

      // TODO: Supabase 상품 등록 mutation 연결 — 아래 payload로 상품을 생성한다.
      console.warn("상품 등록 payload (mutation 미연결):", { ...rest, imageUrl });
    } catch (error) {
      // TODO: 업로드/등록 실패 사용자 피드백(토스트 등) 연결
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProductFormHeader title="제품 등록" />
      <ProductForm submitLabel="등록하기" onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  );
}

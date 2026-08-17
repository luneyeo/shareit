"use client";

import ProductForm from "@/features/dashboard/product-form/common/ui/ProductForm";
import ProductFormHeader from "@/features/dashboard/product-form/common/ui/ProductFormHeader";

/**
 * 대시보드 내 상품 등록 페이지 컴포넌트
 *
 * @example
 * import { ProductNewPage } from '@/views/dashboard/product-new'
 * export default ProductNewPage
 */
export function ProductNewPage() {
  return (
    <>
      <ProductFormHeader title="제품 등록" />
      {/* TODO: Supabase 상품 등록 mutation 연결 */}
      <ProductForm submitLabel="등록하기" onSubmit={() => {}} />
    </>
  );
}

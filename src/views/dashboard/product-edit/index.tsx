"use client";

import ProductForm from "@/features/dashboard/product-form/common/ui/ProductForm";
import ProductFormHeader from "@/features/dashboard/product-form/common/ui/ProductFormHeader";

/**
 * 대시보드 내 상품 수정 페이지 컴포넌트
 *
 * @example
 * import { ProductEditPage } from '@/views/dashboard/product-edit'
 * export default ProductEditPage
 */
export function ProductEditPage() {
  // TODO: 기존 상품 데이터 로드 → defaultValues 전달, Supabase 수정 mutation 연결
  return (
    <>
      <ProductFormHeader title="제품 수정" />
      <ProductForm submitLabel="수정하기" onSubmit={() => {}} />
    </>
  );
}

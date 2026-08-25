"use client";

import ProductComment from "@/features/dashboard/product-detail/ui/ProductComment";
import ProductDetailFooter from "@/features/dashboard/product-detail/ui/ProductDetailFooter";
import ProductImage from "@/features/dashboard/product-detail/ui/ProductImage";
import ProductInfo from "@/features/dashboard/product-detail/ui/ProductInfo";
import ProductMeta from "@/features/dashboard/product-detail/ui/ProductMeta";
import type { ProductDetail } from "@/features/dashboard/types";
import sampleProductImage from "@/features/dashboard/assets/sample-prd.jpeg";

// INFO: 데이터 계층(조회 훅) 연결 전까지 사용하는 샘플입니다. (실제 상품 데이터 아님)
// TODO: 실제 `ProductDetail` 조회 값 + 추천인 이름·구매처로 교체한다.
const SAMPLE: ProductDetail = {
  id: "sample",
  brandName: "넘버즈인",
  prdName: "1번 판토텐산 액티브업 수딩세럼",
  price: 23500,
  description:
    "이거 썼더니 유분이 덜 올라와서 너무너무 좋아!!! 완전 물같은 세럼이라서 지성이거나 수부지라면 무조건 사셈 유분기가 전혀 없어서 여름에도 가볍게 바르기 좋아 지금 리필 기획 중이니까 기획 끝나기전에 쟁여!",
  imageUrl: [sampleProductImage.src],
  tag: ["속건조", "지성", "수부지"],
  category: null,
  userId: "sample-user",
  groupId: null,
  created_at: "",
};
const SAMPLE_RECOMMENDER = "여루나";
const SAMPLE_STORE = "올리브영";

/**
 * 대시보드 내 개별 상품 상세 페이지 컴포넌트
 *
 * 상품 사진 · 브랜드/상품 정보 · 추천인/구매처 · 코멘트 영역을 쌓고,
 * 하단에 저장·좋아요 액션 푸터를 고정 배치합니다.
 *
 * @example
 * import { ProductPage } from '@/views/dashboard/product-detail'
 * export default ProductPage
 */
export function ProductPage() {
  const handleBack = () => history.back();
  const handleSave = () => {};
  const handleLike = () => {};

  return (
    <main className="pb-17">
      <ProductImage imageUrl={SAMPLE.imageUrl} prdName={SAMPLE.prdName} onBack={handleBack} />

      <div className="flex flex-col gap-3 p-4.5">
        <ProductInfo brandName={SAMPLE.brandName} prdName={SAMPLE.prdName} price={SAMPLE.price} />
        <hr className="border-gray-200" />
        <ProductMeta recommender={SAMPLE_RECOMMENDER} store={SAMPLE_STORE} />
        <hr className="border-gray-200" />
        <ProductComment description={SAMPLE.description} tag={SAMPLE.tag} />
      </div>

      <ProductDetailFooter onSave={handleSave} onLike={handleLike} />
    </main>
  );
}

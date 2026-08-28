"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActionSheet, ActionSheetItem } from "@/shared/ui/action-sheet";
import { useProductDetail } from "@/features/dashboard/product-detail/apis/useProductDetail";
import ProductComment from "@/features/dashboard/product-detail/ui/ProductComment";
import ProductDetailTopBar from "@/features/dashboard/product-detail/ui/ProductDetailTopBar";
import ProductImage from "@/features/dashboard/product-detail/ui/ProductImage";
import ProductInfo from "@/features/dashboard/product-detail/ui/ProductInfo";
import ProductMeta from "@/features/dashboard/product-detail/ui/ProductMeta";
import EmptyState from "@/shared/ui/empty-state/EmptyState";

// INFO: 추천인·구매처는 상품(ProductDetail) 필드가 아니라 별도로 주입하는 값입니다.
// TODO: 추천인은 userId로 조회한 이름, 구매처는 상품 모델에 필드 추가 후 교체한다.
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
  const router = useRouter();
  const { dashboardId, productId } = useParams<{ dashboardId: string; productId: string }>();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: product, isPending, isError, refetch } = useProductDetail(dashboardId, productId);

  const handleBack = () => history.back();
  const handleMore = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const handleEdit = () => {
    closeSheet();
    router.push(`/dashboard/${dashboardId}/product/${productId}/edit`);
  };

  return (
    <main>
      {/* 뒤로가기는 어떤 상태에서도 가능하되, 더보기(수정)는 상품이 있을 때만 노출한다. */}
      <ProductDetailTopBar onBack={handleBack} onMore={product ? handleMore : undefined} />

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
        <>
          <ProductImage imageUrl={product.imageUrl} prdName={product.prdName} />

          <div className="flex flex-col gap-4 p-4.5">
            <ProductInfo
              brandName={product.brandName}
              prdName={product.prdName}
              price={product.price}
            />
            <hr className="border-gray-200" />
            <ProductMeta recommender={SAMPLE_RECOMMENDER} store={SAMPLE_STORE} />
            <hr className="border-gray-200" />
            <ProductComment description={product.description} tag={product.tag} />
          </div>
          {/* TODO: 좋아요 및 저장하기 기능 추가 시 ProductDetailFooter 컴포넌트 추가 */}

          <ActionSheet isOpen={isSheetOpen} onClose={closeSheet} ariaLabel="상품 더보기 메뉴">
            <ActionSheetItem onClick={handleEdit}>수정하기</ActionSheetItem>
            {/* TODO: 상품 삭제 API 연결 시 삭제하기 항목 추가 (삭제 확인 다이얼로그·실패 토스트 포함) */}
          </ActionSheet>
        </>
      )}
    </main>
  );
}

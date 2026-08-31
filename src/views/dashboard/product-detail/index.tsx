"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActionSheet, ActionSheetItem } from "@/shared/ui/action-sheet";
import OverlayPortal from "@/shared/ui/overlay/OverlayPortal";
import ConfirmDialog from "@/shared/ui/dialog/ConfirmDialog";
import { toast } from "@/shared/ui/feedback";
import { useProductDetail } from "@/features/dashboard/product-detail/apis/useProductDetail";
import { useDeleteProduct } from "@/features/dashboard/hooks/useDeleteProduct";
import { PRODUCT_MESSAGE } from "@/features/dashboard/constants/messages";
import ProductComment from "@/features/dashboard/product-detail/ui/ProductComment";
import ProductDetailTopBar from "@/features/dashboard/product-detail/ui/ProductDetailTopBar";
import ProductImage from "@/features/dashboard/product-detail/ui/ProductImage";
import ProductInfo from "@/features/dashboard/product-detail/ui/ProductInfo";
import ProductMeta from "@/features/dashboard/product-detail/ui/ProductMeta";
import EmptyState from "@/shared/ui/empty-state/EmptyState";

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
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data: product, isPending, isError, refetch } = useProductDetail(dashboardId, productId);
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const handleBack = () => router.replace(`/dashboard/${dashboardId}`);
  const handleMore = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const handleEdit = () => {
    closeSheet();
    router.push(`/dashboard/${dashboardId}/product/${productId}/edit`);
  };

  const handleDeleteClick = () => {
    closeSheet();
    setIsDeleteOpen(true);
  };
  const handleDeleteCancel = () => setIsDeleteOpen(false);

  const handleDeleteConfirm = async () => {
    setIsDeleteOpen(false);
    try {
      await deleteProduct(productId);
      toast.success(PRODUCT_MESSAGE.DELETE.SUCCESS);
      // 삭제된 상품 상세엔 더 머물 수 없으므로 대시보드로 돌아간다.
      router.replace(`/dashboard/${dashboardId}`);
    } catch (error) {
      console.error(error);
      toast.error(PRODUCT_MESSAGE.DELETE.ERROR);
    }
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
            <ProductMeta recommender={product.recommender ?? "알 수 없음"} store={product.store} />
            <hr className="border-gray-200" />
            <ProductComment description={product.description} tag={product.tag} />
          </div>
          {/* TODO: 좋아요 및 저장하기 기능 추가 시 ProductDetailFooter 컴포넌트 추가 */}

          <ActionSheet isOpen={isSheetOpen} onClose={closeSheet} ariaLabel="상품 더보기 메뉴">
            <ActionSheetItem onClick={handleEdit}>수정하기</ActionSheetItem>
            <ActionSheetItem variant="destructive" onClick={handleDeleteClick}>
              삭제하기
            </ActionSheetItem>
          </ActionSheet>

          {isDeleteOpen && (
            <OverlayPortal
              ariaLabel="상품 삭제 확인"
              onClose={handleDeleteCancel}
              surfaceClassName="w-full max-w-xs"
            >
              <ConfirmDialog
                message="정말 삭제하시겠어요?"
                confirmText="삭제"
                cancelText="취소"
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              />
            </OverlayPortal>
          )}
        </>
      )}
    </main>
  );
}

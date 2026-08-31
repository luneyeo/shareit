"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useGroupProducts } from "@/features/dashboard/api/useGroupProducts";
import ProductCard from "./ProductCard";

/**
 * 특정 그룹의 상품 목록 영역입니다.
 *
 * 유효한 그룹에 대해서만 마운트되므로, 유효하지 않은 groupId로는 조회가 실행되지 않습니다.
 * 커서 기반 무한 스크롤로, 목록 하단이 보이면 다음 페이지를 자동으로 이어 불러옵니다.
 */
export default function ProductList({
  groupId,
  category,
}: {
  groupId: string;
  /** 선택된 카테고리. null이면 전체(필터 없음). */
  category: string | null;
}) {
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useGroupProducts(groupId, category);
  const router = useRouter();

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  // 목록 하단 sentinel이 보이면 다음 페이지를 자동으로 이어 불러온다.
  // 단, 직전 페이지 요청이 실패한 동안에는 관찰을 멈춰 실패 요청이 반복되지 않게 한다.
  const sentinelRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: fetchNextPage,
    enabled: !isFetchNextPageError,
  });

  const listMinHeight = "min-h-[calc(100dvh-13rem-env(safe-area-inset-bottom))]";

  if (isPending) {
    return (
      <div className={`flex items-center justify-center ${listMinHeight}`}>
        <p className="typo-14-medium text-gray-500">상품을 불러오는 중이에요.</p>
      </div>
    );
  }

  // 첫 페이지 자체를 못 불러온 경우에만 전체 에러 화면을 보여준다.
  // (이미 불러온 페이지가 있으면 목록을 유지하고, 다음 페이지 실패는 조용히 멈춘다.)
  if (isError && products.length === 0) {
    return (
      <EmptyState
        type="error"
        message="상품을 불러오지 못했어요"
        description="잠시 후 다시 시도해주세요"
        className={listMinHeight}
        onRetry={() => refetch()}
      />
    );
  }

  if (products.length === 0) {
    // 카테고리 필터 중이면 "이 카테고리에 없음"만 안내하고(다른 카테고리엔 상품이 있을 수 있음),
    // 전체 보기에서 비었을 때만 첫 상품 등록을 유도한다.
    if (category) {
      return (
        <EmptyState
          type="product"
          message="이 카테고리에 등록된 상품이 없어요"
          description="다른 카테고리를 선택해 보세요"
          className={listMinHeight}
          onAddProduct={() => router.push(`/dashboard/${groupId}/product/new`)}
        />
      );
    }

    return (
      <EmptyState
        type="product"
        message="아직 등록된 상품이 없어요"
        description="첫 상품을 등록해보세요"
        className={listMinHeight}
        onAddProduct={() => router.push(`/dashboard/${groupId}/product/new`)}
      />
    );
  }

  return (
    <section aria-labelledby="product-list-heading" className="p-4.5">
      <h2 id="product-list-heading" className="sr-only">
        상품 목록
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/dashboard/${groupId}/product/${product.id}`}
            aria-label={`${product.prdName} 상세 보기`}
          >
            <ProductCard
              prdName={product.prdName}
              price={product.price}
              imageUrl={product.imageUrl}
              tag={product.tag}
              userId={product.userId}
            />
          </Link>
        ))}
      </div>

      {hasNextPage && (
        <div ref={sentinelRef} className="flex flex-col items-center gap-2 py-6">
          {isFetchNextPageError ? (
            <>
              <p className="typo-14-medium text-gray-500">상품을 더 불러오지 못했어요.</p>
              <button
                type="button"
                onClick={() => fetchNextPage()}
                className="typo-14-medium text-primary-600"
              >
                다시 시도
              </button>
            </>
          ) : (
            isFetchingNextPage && (
              <p className="typo-14-medium text-gray-500">상품을 더 불러오는 중이에요.</p>
            )
          )}
        </div>
      )}
    </section>
  );
}

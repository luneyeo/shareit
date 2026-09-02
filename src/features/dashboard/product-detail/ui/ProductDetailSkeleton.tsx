import Skeleton from "@/shared/ui/skeleton/Skeleton";

/**
 * 상품 상세 본문 로딩 중 자리를 채우는 스켈레톤입니다.
 *
 * 실제 상세 레이아웃(이미지 h-90 → 정보 / 추천인·구매처 / 코멘트)을 반영합니다.
 * 상단바(ProductDetailTopBar)는 로딩 중에도 항상 렌더되므로 여기에 포함하지 않습니다.
 */
export default function ProductDetailSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        상품 정보를 불러오는 중이에요
      </p>
      <div aria-hidden="true">
        {/* 상품 이미지 (풀블리드) */}
        <Skeleton className="h-90 w-full rounded-none" />

        <div className="flex flex-col gap-4.5 p-4.5">
          {/* ProductInfo: 실제 line-height(브랜드 24+mb-1.5 / 상품명 28 / 가격 32)와 gap-1을 맞춘다. */}
          <div className="flex flex-col gap-1">
            <div className="mb-1.5 flex h-6 items-center">
              <Skeleton shape="text" className="w-20" />
            </div>
            <div className="flex h-7 items-center">
              <Skeleton shape="text" className="w-2/3" />
            </div>
            <div className="flex h-8 items-center">
              <Skeleton shape="text" className="h-6 w-32" />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ProductMeta: 추천인 / 구매처 */}
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <Skeleton shape="text" className="w-12" />
              <div className="mt-1.5 flex items-center gap-2">
                <Skeleton shape="circle" className="size-6.5" />
                <Skeleton shape="text" className="w-16" />
              </div>
            </div>
            <div className="flex-1">
              <Skeleton shape="text" className="w-12" />
              <Skeleton shape="text" className="mt-2 w-20" />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ProductComment: 제목 + 설명 여러 줄 */}
          <div className="flex flex-col gap-3.5">
            <Skeleton shape="text" className="h-6 w-16" />
            <div className="flex flex-col gap-2">
              <Skeleton shape="text" className="w-full" />
              <Skeleton shape="text" className="w-full" />
              <Skeleton shape="text" className="w-3/5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

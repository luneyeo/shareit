import Skeleton from "@/shared/ui/skeleton/Skeleton";

/** 로딩 중 보여줄 카드 개수. 모바일 2열 그리드 기준 3줄을 채운다. */
const SKELETON_COUNT = 6;

/**
 * 상품 목록 로딩 중 자리를 채우는 스켈레톤입니다.
 *
 * 실제 {@link ProductList}의 그리드·{@link ProductCard} 레이아웃
 * (썸네일 h-40 → 이름/가격 텍스트 → sm 아바타)을 그대로 반영해 로딩 후 레이아웃 이동을 막습니다.
 */
export default function ProductListSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        상품 목록을 불러오는 중이에요
      </p>
      <div className="grid grid-cols-2 gap-3 p-4.5" aria-hidden="true">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <article
            key={index}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white"
          >
            <Skeleton className="h-40 w-full rounded-t-xl" />
            <div className="flex flex-col gap-2 p-2.5">
              <div className="flex flex-col">
                <div className="flex h-6 items-center">
                  <Skeleton shape="text" className="w-3/4" />
                </div>
                <div className="flex h-6 items-center">
                  <Skeleton shape="text" className="w-1/2" />
                </div>
              </div>
              <Skeleton shape="circle" className="size-5.5" />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

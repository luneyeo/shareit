import { useEffect, useRef } from "react";

interface UseInfiniteScrollParams {
  /** 더 불러올 다음 페이지가 있는지 여부 */
  hasNextPage: boolean;
  /** 다음 페이지를 불러오는 중인지 여부 (중복 호출 방지) */
  isFetching: boolean;
  /** 다음 페이지를 불러오는 함수 */
  onLoadMore: () => void;
  /** sentinel이 화면에 닿기 전 미리 불러올 여유 거리 (기본 "200px") */
  rootMargin?: string;
}

/**
 * 목록 하단의 sentinel 요소가 화면에 들어오면 다음 페이지를 불러오는 무한 스크롤 훅입니다.
 *
 * 반환하는 ref를 목록 끝의 빈 요소(sentinel)에 연결하세요. 그 요소가 뷰포트에
 * (rootMargin만큼 앞서) 들어오는 순간 `onLoadMore`를 호출합니다. 이미 불러오는 중이거나
 * 다음 페이지가 없으면 호출하지 않습니다.
 *
 * @example
 * ```tsx
 * const sentinelRef = useInfiniteScroll<HTMLDivElement>({
 *   hasNextPage,
 *   isFetching: isFetchingNextPage,
 *   onLoadMore: fetchNextPage,
 * });
 * {hasNextPage && <div ref={sentinelRef} />}
 * ```
 */
export function useInfiniteScroll<T extends HTMLElement>({
  hasNextPage,
  isFetching,
  onLoadMore,
  rootMargin = "200px",
}: UseInfiniteScrollParams) {
  const sentinelRef = useRef<T>(null);
  // 최신 onLoadMore를 참조해, 콜백 변경이 observer setup을 재실행시키지 않도록 한다.
  const onLoadMoreRef = useRef(onLoadMore);
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  });

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) onLoadMoreRef.current();
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching, rootMargin]);

  return sentinelRef;
}

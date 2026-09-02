import { useEffect, useState } from "react";

/** 스켈레톤을 노출하기까지 기다릴 기본 시간(ms). 이보다 짧게 끝나는 로딩은 스켈레톤을 건너뛴다. */
const DEFAULT_DELAY = 200;

/**
 * 로딩이 `delay`(기본 200ms) 이상 지속될 때만 `true`를 반환하는 훅입니다.
 *
 * 짧게 끝나는 요청에서 스켈레톤이 잠깐 번쩍이는(플래시) 현상을 막습니다.
 * `isLoading`이 `delay`보다 먼저 끝나면 계속 `false`를 유지하고,
 * `delay` 이상 지속되어야 비로소 `true`가 됩니다. 로딩이 끝나면 즉시 `false`로 돌아갑니다.
 *
 * @param isLoading 현재 로딩 중인지 여부 (예: React Query의 `isPending`)
 * @param delay 스켈레톤을 노출하기까지 기다릴 시간(ms). 기본 200ms
 *
 * @example
 * ```tsx
 * const showSkeleton = useDelayedLoading(isPending);
 * if (showSkeleton) return <ProductListSkeleton />;
 * ```
 */
export function useDelayedLoading(isLoading: boolean, delay = DEFAULT_DELAY): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => setIsVisible(true), delay);
    // 로딩이 끝나거나 delay 전에 다시 시작되면 타이머를 정리하고 노출 상태를 되돌린다.
    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [isLoading, delay]);

  return isVisible;
}

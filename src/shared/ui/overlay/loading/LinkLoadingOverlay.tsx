"use client";

import { useLinkStatus } from "next/link";
import LoadingOverlay from "./LoadingOverlay";

interface LinkLoadingOverlayProps {
  /** 스크린리더로 읽어줄 로딩 설명. 기본값은 "이동 중"입니다. */
  label?: string;
}

/**
 * 상위 `Link`의 이동 대기 상태를 구독해, 이동 중일 때 전체화면 로딩 오버레이를 띄웁니다.
 *
 * - `useLinkStatus`는 `Link`의 자손에서만 동작하므로 반드시 `Link` 내부에 배치합니다.
 * - `LoadingOverlay`가 포탈로 렌더링되어, 카드 등 작은 요소 안에 두어도 전체화면 오버레이로 표시됩니다.
 * - prefetch가 끝난 경로는 즉시 이동해 `pending`이 뜨지 않을 수 있습니다. (느린 이동에서만 노출)
 *
 * @example
 * ```tsx
 * <Link href={href}>
 *   <Card ... />
 *   <LinkLoadingOverlay />
 * </Link>
 * ```
 */
export default function LinkLoadingOverlay({ label = "이동 중" }: LinkLoadingOverlayProps) {
  const { pending } = useLinkStatus();
  return pending ? <LoadingOverlay label={label} /> : null;
}

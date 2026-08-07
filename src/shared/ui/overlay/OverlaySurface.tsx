import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/utils/cn";

type OverlaySurfaceProps = ComponentPropsWithRef<"div">;

/**
 * 오버레이 위에 떠 있는 콘텐츠의 배경(서피스) UI만 담당하는 컴포넌트입니다.
 *
 * - 흰 배경과 `rounded-2xl` 모서리를 가진 콘텐츠 컨테이너입니다.
 * - `OverlayPortal`이 내부적으로 `children`을 이 컴포넌트로 감싸므로,
 *   `OverlayPortal`을 쓸 때는 이 컴포넌트를 직접 중첩하지 마세요. (서피스 이중 중첩)
 * - `OverlayPortal` 밖에서 서피스 UI만 단독으로 쓰고 싶을 때 직접 사용합니다.
 *
 * @example
 * ```tsx
 * // OverlayPortal 없이 서피스만 단독 사용하는 경우
 * <OverlaySurface className="w-full max-w-xs">
 *   <ConfirmDialog ... />
 * </OverlaySurface>
 * ```
 */
export default function OverlaySurface({ className, ...props }: OverlaySurfaceProps) {
  return <div className={cn("rounded-2xl bg-white", className)} {...props} />;
}

import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/utils/cn";

type OverlaySurfaceProps = ComponentPropsWithRef<"div">;

/**
 * 오버레이 위에 떠 있는 콘텐츠의 배경(서피스) UI만 담당하는 컴포넌트입니다.
 *
 * - 흰 배경과 `rounded-2xl` 모서리를 가진 콘텐츠 컨테이너입니다.
 * - 화면 중앙 배치는 이 컴포넌트를 감싸는 `OverlayPortal`이 담당합니다.
 * - 모달, 컨펌 다이얼로그 등 오버레이 계열 UI에서 공용으로 사용합니다.
 *
 * @example
 * ```tsx
 * <OverlayPortal onClose={handleClose}>
 *   <OverlaySurface>
 *     <ConfirmDialog ... />
 *   </OverlaySurface>
 * </OverlayPortal>
 * ```
 */
export default function OverlaySurface({ className, ...props }: OverlaySurfaceProps) {
  return <div className={cn("rounded-2xl bg-white", className)} {...props} />;
}

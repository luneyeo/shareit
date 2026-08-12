import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/utils/cn";

type DropdownSurfaceProps = ComponentPropsWithRef<"div">;

/**
 * 드롭다운 메뉴가 떠 있는 배경(서피스) UI만 담당하는 컴포넌트입니다.
 *
 * - 흰 배경, `rounded-2xl` 모서리, 부드러운 그림자를 가진 플로팅 컨테이너입니다.
 * - `overflow-hidden`으로 내부 콘텐츠(항목 hover 배경 등)를 둥근 모서리에 맞춰 잘라냅니다.
 * - 위치(앵커 기준 배치)는 맥락마다 다르므로 이 컴포넌트가 아닌 호출부에서
 *   `className`(예: `absolute top-full ...`)으로 지정합니다.
 * - 내부에는 보통 `DropdownList`를 배치하지만, 어떤 콘텐츠든 담을 수 있습니다.
 *
 * @example
 * ```tsx
 * <DropdownSurface className="absolute right-0 top-full mt-2 w-40">
 *   <DropdownList>...</DropdownList>
 * </DropdownSurface>
 * ```
 */
export default function DropdownSurface({ className, ...props }: DropdownSurfaceProps) {
  return (
    <div
      className={cn(
        "z-dropdown overflow-hidden rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.12)]",
        className
      )}
      {...props}
    />
  );
}

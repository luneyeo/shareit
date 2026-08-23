import { cn } from "@/shared/utils/cn";

/**
 * 섹션 사이를 나누는 회색 구분선입니다. `className`으로 두께를 조절합니다.
 *
 * @example
 * <Divider className="h-2" />
 */
export default function Divider({ className }: { className?: string }) {
  return <div className={cn("bg-gray-100", className)} />;
}

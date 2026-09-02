import { cn } from "@/shared/utils/cn";

const SKELETON_SHAPE = {
  /** 카드·썸네일 등 일반 블록 */
  rect: "rounded-md",
  /** 아바타 등 원형 요소 */
  circle: "rounded-full",
  /** 텍스트 한 줄. 기본 높이(h-4)를 가지며 너비는 className으로 지정합니다. */
  text: "h-4 rounded",
} as const;

type SkeletonProps = {
  /** 자리표시자의 모양. 기본값은 `rect`입니다. */
  shape?: keyof typeof SKELETON_SHAPE;
  className?: string;
};

/**
 * 로딩 중 콘텐츠 자리를 채우는 스켈레톤 프리미티브입니다.
 *
 * 크기는 `className`(width/height)으로 지정하고, `shape`로 모서리 형태만 정합니다.
 * 여러 개를 조합해 페이지별 스켈레톤을 구성합니다.
 *
 * @example
 * <Skeleton className="h-40 w-full" />          // 썸네일
 * <Skeleton shape="circle" className="size-10" /> // 아바타
 * <Skeleton shape="text" className="w-32" />     // 텍스트 한 줄
 */
export default function Skeleton({ shape = "rect", className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse bg-gray-200", SKELETON_SHAPE[shape], className)}
    />
  );
}

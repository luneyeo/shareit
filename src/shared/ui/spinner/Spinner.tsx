import { cn } from "@/shared/utils/cn";

const SPINNER_SIZE = {
  /** 버튼 내부 등 인라인 요소 */
  sm: "size-4 border-2",
  /** 기본 크기 */
  md: "size-6 border-2",
  /** 전체화면 오버레이 등 강조 */
  lg: "size-9 border-[3px]",
} as const;

type SpinnerProps = {
  /** 스피너 크기. 기본값은 `md`입니다. */
  size?: keyof typeof SPINNER_SIZE;
  className?: string;
};

/**
 * 로딩 상태를 나타내는 회전 스피너 프리미티브입니다.
 *
 * 색상은 `currentColor`(테두리)를 따르므로, 감싸는 요소의 `text-*` 색으로 지정합니다.
 * 순수 시각 요소라 `aria-hidden` 처리되어 있으며, 로딩 의미(`aria-busy`·`role="status"`)는
 * 이 스피너를 사용하는 쪽(예: `Button`, `LoadingOverlay`)에서 부여합니다.
 *
 * @example
 * <Spinner />                              // 기본(md)
 * <Spinner size="sm" />                    // 버튼 내부
 * <div className="text-white"><Spinner size="lg" /></div> // 어두운 배경 위 흰 스피너
 */
export default function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent",
        SPINNER_SIZE[size],
        className
      )}
    />
  );
}

import { cn } from "@/shared/utils/cn";

type TagChipProps = {
  label: string;
  className?: string;
};

/**
 * 태그 칩 컴포넌트입니다. `#` prefix가 자동으로 붙습니다.
 *
 * @example
 * <TagChip label="속건조" />
 */
export default function TagChip({ label, className, ...props }: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-14-medium text-gray-700",
        className
      )}
      {...props}
    >
      {" "}
      #{label}
    </span>
  );
}

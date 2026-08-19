import { IcClose } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";

type TagChipProps = {
  label: string;
  className?: string;
  /** 전달하면 라벨 뒤에 삭제(x) 버튼이 노출됩니다. */
  onRemove?: () => void;
};

/**
 * 태그 칩 컴포넌트입니다. `#` prefix가 자동으로 붙습니다.
 * `onRemove`를 넘기면 삭제 버튼이 있는 칩이 됩니다.
 *
 * @example
 * <TagChip label="속건조" />
 * <TagChip label="속건조" onRemove={() => remove("속건조")} />
 */
export default function TagChip({ label, className, onRemove, ...props }: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-gray-200 px-2.5 py-1.5 typo-12-medium text-gray-700",
        className
      )}
      {...props}
    >
      #{label}
      {onRemove && (
        <button type="button" aria-label={`${label} 삭제`} onClick={onRemove} className="ml-1">
          <IcClose className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

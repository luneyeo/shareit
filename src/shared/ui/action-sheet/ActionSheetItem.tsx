"use client";

import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/utils/cn";

interface ActionSheetItemProps extends ComponentPropsWithRef<"button"> {
  /**
   * 항목 성격.
   * `destructive`는 삭제 등 되돌릴 수 없는 동작에 사용하며 빨간색으로 표시합니다.
   */
  variant?: "default" | "destructive";
}

/**
 * 액션 시트의 개별 항목입니다. (예: 수정하기 / 삭제하기 / 취소)
 *
 * - 가운데 정렬된 단일 문구 버튼으로, `onClick`으로 동작을 연결합니다.
 * - `variant="destructive"`로 삭제 등 위험 동작을 빨간색으로 강조할 수 있습니다.
 * - `ActionSheet` 카드의 자식으로 배치합니다.
 *
 * @example
 * ```tsx
 * <ActionSheetItem onClick={handleEdit}>수정하기</ActionSheetItem>
 * <ActionSheetItem variant="destructive" onClick={handleDelete}>삭제하기</ActionSheetItem>
 * ```
 */
export default function ActionSheetItem({
  variant = "default",
  className,
  ...props
}: ActionSheetItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full px-5 py-4 text-center typo-16-medium transition-colors",
        "hover:bg-gray-50 active:bg-gray-100",
        "disabled:pointer-events-none disabled:text-gray-400",
        variant === "destructive" && "text-error",
        className
      )}
      {...props}
    />
  );
}

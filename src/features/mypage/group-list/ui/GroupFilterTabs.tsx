"use client";

import type { GroupFilter } from "@/features/mypage/group-list/constants/groupFilters";
import { cn } from "@/shared/utils/cn";

type GroupFilterTabsProps = {
  filters: { value: GroupFilter; label: string }[];
  value: GroupFilter;
  onChange: (value: GroupFilter) => void;
};

/**
 * 전체 그룹 목록 상단의 세그먼트형 필터 탭입니다. (전체 / 내가 만든 / 참여 중)
 *
 * 선택된 항목만 흰 배경으로 강조되며, 값 변경은 `onChange`로 위임합니다.
 *
 * @example
 * <GroupFilterTabs filters={filters} value={filter} onChange={setFilter} />
 */
export default function GroupFilterTabs({ filters, value, onChange }: GroupFilterTabsProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-gray-200 p-1">
      {filters.map((filter) => {
        const isSelected = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(filter.value)}
            className={cn(
              "flex-1 rounded-lg py-2 typo-16-semibold text-gray-500",
              isSelected && "bg-white text-gray-900 shadow-sm"
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

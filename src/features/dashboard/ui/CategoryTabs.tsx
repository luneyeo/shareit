"use client";

import { cn } from "@/shared/utils/cn";
import { CATEGORIES } from "@/shared/constants/category";

// value가 null이면 "전체"(필터 없음), 그 외에는 해당 카테고리로 필터한다.
const TABS: { label: string; value: string | null }[] = [
  { label: "전체", value: null },
  ...CATEGORIES.map((category) => ({ label: category, value: category })),
];

type CategoryTabsProps = {
  /** 현재 선택된 카테고리. null이면 "전체"(필터 없음). */
  selected: string | null;
  onSelect: (value: string | null) => void;
};

/**
 * 대시보드 상단의 카테고리 탭입니다.
 *
 * 그룹 드롭다운 아래에 위치하며 선택한 카테고리를 강조 표시합니다.
 * 선택 상태는 상위(DashboardPage)에서 관리하며, 선택 값은 상품 목록 필터로 전달됩니다.
 */
export default function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <nav
      className="scrollbar-none flex max-w-120 overflow-x-auto border-b border-gray-200"
      aria-label="카테고리"
    >
      {TABS.map(({ label, value }) => {
        const isActive = selected === value;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(value)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "-mb-px border-b-2 px-3.5 py-2 whitespace-nowrap transition-colors",
              isActive
                ? "border-primary-600 typo-16-bold"
                : "border-transparent text-gray-700 typo-16-medium"
            )}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}

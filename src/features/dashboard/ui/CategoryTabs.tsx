"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/cn";
import { CATEGORIES } from "@/shared/constants/category";

/**
 * 대시보드 상단의 카테고리 탭입니다.
 *
 * 그룹 드롭다운 아래에 위치하며 선택한 카테고리를 강조 표시합니다.
 * TODO: 선택 시 상품 목록 필터링과 연동(현재는 로컬 상태만 관리).
 */
// value가 null이면 "전체"(필터 없음), 그 외에는 해당 카테고리로 필터한다.
const TABS: { label: string; value: string | null }[] = [
  { label: "전체", value: null },
  ...CATEGORIES.map((category) => ({ label: category, value: category })),
];

export default function CategoryTabs() {
  // TODO: 선택 상태를 DashboardPage로 끌어올려 ProductList의 필터 조건으로 전달할 것.
  //       현재는 로컬 상태라 탭을 눌러도 상품 목록에 반영되지 않는다. (별도 이슈)
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <nav className="flex border-b border-gray-200" aria-label="카테고리">
      {TABS.map(({ label, value }) => {
        const isActive = selected === value;

        return (
          <button
            key={label}
            type="button"
            onClick={() => setSelected(value)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 whitespace-nowrap transition-colors",
              isActive
                ? "border-primary-600 text-gray-900 typo-16-semibold"
                : "border-transparent text-gray-400 typo-16-medium"
            )}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}

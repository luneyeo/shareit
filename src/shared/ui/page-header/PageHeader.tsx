"use client";

import { IcSearch } from "@/shared/assets/icons";

interface PageHeaderProps {
  title: React.ReactNode;
  showSearch?: boolean;
  onSearchClick?: () => void;
  bottom?: React.ReactNode;
}

/**
 * 타이틀형 페이지 헤더 컴포넌트입니다.
 *
 * 홈 · 좋아요 · 마이페이지처럼 "타이틀 + (검색) + (하단 영역)" 형태를 공유하는
 * 페이지에서 재사용합니다. 그룹 이름 fetch나 카테고리 필터 같은 도메인 로직은
 * 갖지 않으며, 필요한 조각만 props로 켜서 사용합니다.
 *
 * - `title`: 좌측에 표시할 제목 (문자열 또는 드롭다운 같은 커스텀 노드)
 * - `showSearch`: 우측 검색 아이콘 노출 여부
 * - `onSearchClick`: 검색 아이콘 클릭 핸들러
 * - `bottom`: 타이틀 줄 아래에 붙는 영역 (예: 카테고리 필터)
 *
 * @example
 * ```tsx
 * <PageHeader title="좋아요 상품" showSearch onSearchClick={openSearch} />
 * <PageHeader title={groupName} showSearch bottom={<CategoryFilter />} />
 * ```
 */
export default function PageHeader({ title, showSearch, onSearchClick, bottom }: PageHeaderProps) {
  return (
    <header className="flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="typo-20-bold text-gray-900">{title}</h1>
        {showSearch && (
          <button type="button" aria-label="검색" onClick={onSearchClick} className="p-1">
            <IcSearch className="h-6 w-6" />
          </button>
        )}
      </div>
      {bottom}
    </header>
  );
}

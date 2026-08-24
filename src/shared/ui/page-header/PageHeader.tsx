"use client";

import { IcSearch } from "@/shared/assets/icons";

type SearchProps =
  { showSearch: true; onSearchClick: () => void } | { showSearch?: false; onSearchClick?: never };

type PageHeaderProps = {
  title: React.ReactNode;
} & SearchProps;

/**
 * 타이틀형 페이지 헤더 컴포넌트입니다.
 *
 * 홈 · 좋아요 · 마이페이지처럼 "타이틀 + (검색) + (하단 영역)" 형태를 공유하는
 * 페이지에서 재사용합니다. 그룹 이름 fetch나 카테고리 필터 같은 도메인 로직은
 * 갖지 않으며, 필요한 조각만 props로 켜서 사용합니다.
 *
 * - `title`: 좌측에 표시할 제목 (문자열 또는 드롭다운 같은 커스텀 노드)
 * - `showSearch`: 우측 검색 아이콘 노출 여부 (`true`면 `onSearchClick` 필수)
 * - `onSearchClick`: 검색 아이콘 클릭 핸들러
 *
 * @example
 * ```tsx
 * <PageHeader title="좋아요 상품" showSearch onSearchClick={openSearch} />
 * <PageHeader title="마이페이지" />
 * ```
 */
export default function PageHeader({ title, showSearch, onSearchClick }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4.5 py-6 bg-white border-b border-gray-200">
      {typeof title === "string" ? <h1 className="typo-20-bold">{title}</h1> : title}
      {showSearch && (
        <button type="button" aria-label="검색" onClick={onSearchClick} className="p-1">
          <IcSearch className="h-6 w-6" />
        </button>
      )}
    </header>
  );
}

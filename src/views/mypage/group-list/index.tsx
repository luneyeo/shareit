"use client";

import { useGroupFilter } from "@/features/mypage/hooks/useGroupFilter";
import { GroupFilterTabs, GroupListItem } from "@/features/mypage/ui";
import BackHeader from "@/shared/ui/back-header/BackHeader";

/**
 * 마이페이지 하위 "전체 그룹 목록" 페이지 컴포넌트
 *
 * 탭바 없이 뒤로가기로 진입하는 드릴다운 페이지입니다. (`(action)` 라우트)
 * 상단 필터 탭(전체/내가 만든/참여 중)에 따라 그룹 카드 목록을 보여줍니다.
 *
 * @example
 * import { GroupListPage } from '@/views/mypage/group-list'
 * export default GroupListPage
 */
export function GroupListPage() {
  const { filters, filter, setFilter, groups, total } = useGroupFilter();

  return (
    <>
      <BackHeader title="전체 그룹" />

      <div className="flex flex-col gap-4 px-5 py-4">
        <GroupFilterTabs filters={filters} value={filter} onChange={setFilter} />
        <p className="typo-14-medium text-gray-500">총 {total}개 그룹</p>
        <ul className="flex flex-col gap-3">
          {groups.map((group) => (
            <li key={group.id}>
              <GroupListItem group={group} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

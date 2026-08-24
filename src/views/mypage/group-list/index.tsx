"use client";

import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";
import { useGroupFilter } from "@/features/mypage/hooks/useGroupFilter";
import { GroupFilterTabs, GroupListItem } from "@/features/mypage/ui";
import BackHeader from "@/shared/ui/back-header/BackHeader";
import EmptyState from "@/shared/ui/empty-state/EmptyState";

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
  const { filters, filter, setFilter, groups, total, isPending, isEmpty, isError, refetch } =
    useGroupFilter();
  const { openCreate, openJoin, dialogElement } = useGroupDialog();

  return (
    <div className="flex min-h-dvh flex-col">
      <BackHeader title="전체 그룹" />

      {isPending ? (
        <div className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
          <p className="typo-14-medium text-gray-500">그룹을 불러오는 중이에요.</p>
        </div>
      ) : isError ? (
        <EmptyState
          type="error"
          message="그룹을 불러오지 못했어요"
          description="잠시 후 다시 시도해주세요"
          className="flex-1"
          onRetry={() => refetch()}
        />
      ) : isEmpty ? (
        <EmptyState
          type="group"
          message="아직 속한 그룹이 없어요"
          description="새 그룹을 만들거나 초대 코드로 입장해보세요"
          className="flex-1"
          onCreateGroup={openCreate}
          onJoinGroup={openJoin}
        />
      ) : (
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
      )}

      {dialogElement}
    </div>
  );
}

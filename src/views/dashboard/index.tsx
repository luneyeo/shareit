"use client";

import GroupDropdown from "@/features/dashboard/ui/GroupDropdown";
import { useMyGroups } from "@/shared/api/group/useMyGroups";

/**
 * 사용자 대시보드 페이지 컴포넌트
 *
 * @example
 * import { DashboardPage } from '@/views/dashboard'
 * export default DashboardPage
 */
export function DashboardPage() {
  const groups = useMyGroups();

  return (
    <div className="flex flex-col gap-5 p-5">
      <GroupDropdown groups={groups} currentGroupId={groups[0].id} />
    </div>
  );
}

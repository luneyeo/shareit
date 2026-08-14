"use client";

import { useParams } from "next/navigation";
import CategoryTabs from "@/features/dashboard/ui/CategoryTabs";
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
  // 현재 그룹은 URL(/dashboard/[dashboardId])의 dashboardId에서 파생한다.
  const { dashboardId } = useParams<{ dashboardId: string }>();

  return (
    <div className="flex flex-col gap-5 p-5">
      <GroupDropdown groups={groups} currentGroupId={dashboardId} />
      <CategoryTabs />
    </div>
  );
}

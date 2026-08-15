"use client";

import { useParams } from "next/navigation";
import CategoryTabs from "@/features/dashboard/ui/CategoryTabs";
import DashboardFab from "@/features/dashboard/ui/DashboardFab";
import GroupDropdown from "@/features/dashboard/ui/GroupDropdown";
import ProductList from "@/features/dashboard/ui/ProductList";
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
  // 그룹 목록에서 현재 그룹 ID를 검증한다. 실제 조회로 교체해도 이 검증 경로는 유지한다.
  const currentGroup = groups.find((group) => group.id === dashboardId);

  return (
    <>
      <div className="p-5 pb-3">
        <GroupDropdown groups={groups} currentGroupId={dashboardId} />
      </div>
      {currentGroup ? (
        <>
          <CategoryTabs />
          {/* TODO: 상품 조회를 비동기로 교체 시 Suspense(로딩 fallback)처리 */}
          <ProductList groupId={currentGroup.id} />
          <DashboardFab dashboardId={currentGroup.id} />
        </>
      ) : (
        // TODO: EmptyState 컴포넌트로 분리 예정
        <div className="flex flex-col items-center gap-1 px-5 py-16 text-center">
          <p className="typo-16-semibold text-gray-900">존재하지 않는 그룹이에요</p>
          <p className="typo-14-medium text-gray-500">위에서 다른 그룹을 선택해 주세요.</p>
        </div>
      )}
    </>
  );
}

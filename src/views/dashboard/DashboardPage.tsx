"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import CategoryTabs from "@/features/dashboard/ui/CategoryTabs";
import DashboardFab from "@/features/dashboard/ui/DashboardFab";
import GroupDropdown from "@/features/dashboard/ui/group/GroupDropdown";
import ProductList from "@/features/dashboard/ui/product/ProductList";
import { useMyGroupList } from "@/features/dashboard/hooks/useMyGroupList";
import { IcSettings } from "@/shared/assets/icons";
import EmptyState from "@/shared/ui/empty-state/EmptyState";

/**
 * 특정 그룹(`/dashboard/[dashboardId]`)의 대시보드 페이지 컴포넌트.
 *
 * 그룹 없음/첫 그룹 진입 분기는 DashboardIndexPage가 담당하고, 이 컴포넌트는 유효한 그룹 화면을 렌더한다.
 *
 * @example
 * import { DashboardPage } from '@/views/dashboard'
 * export default DashboardPage
 */
export function DashboardPage() {
  const { data: groups, isPending, isError, refetch } = useMyGroupList();
  // 현재 그룹은 URL(/dashboard/[dashboardId])의 dashboardId에서 파생한다.
  const { dashboardId } = useParams<{ dashboardId: string }>();
  // 그룹 목록에서 현재 그룹 ID가 내가 속한 그룹인지 검증한다.
  const currentGroup = groups?.find((group) => group.id === dashboardId);

  // 그룹 목록을 불러오는 동안에는 "존재하지 않는 그룹" 플래시를 막는다.
  // (userId 대기로 쿼리가 disabled면 isLoading이 false라 isPending으로 판별한다.)
  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-1 px-5 py-16 text-center">
        <p className="typo-14-medium text-gray-500">그룹을 불러오는 중이에요.</p>
      </div>
    );
  }

  // 조회 실패를 "존재하지 않는 그룹"으로 오인하지 않도록 재시도 가능한 에러 화면을 보여준다.
  if (isError) {
    return (
      <EmptyState
        type="error"
        message="그룹 정보를 불러오지 못했어요"
        description="잠시 후 다시 시도해 주세요."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <>
      <div className="flex items-center justify-between px-4.5 py-6">
        <GroupDropdown groups={groups ?? []} currentGroupId={dashboardId} />
        {currentGroup && (
          <Link
            href={`/mypage/groups/${currentGroup.id}`}
            aria-label="그룹 설정"
            className="shrink-0"
          >
            <IcSettings className="h-5 w-5 text-gray-700" />
          </Link>
        )}
      </div>
      {currentGroup ? (
        <>
          <CategoryTabs />
          {/* TODO: 상품 조회를 비동기로 교체 시 Suspense(로딩 fallback)처리 */}
          <ProductList groupId={currentGroup.id} />
          <DashboardFab dashboardId={currentGroup.id} />
        </>
      ) : (
        <EmptyState
          type="notice"
          message="존재하지 않는 그룹이에요"
          description="상단에서 다른 그룹을 선택해 주세요"
          className="min-h-[calc(100dvh-13rem-env(safe-area-inset-bottom))]"
        />
      )}
    </>
  );
}

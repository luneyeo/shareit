"use client";

import GroupLoadError from "@/features/dashboard/ui/group/GroupLoadError";

/**
 * 대시보드 세그먼트(`/dashboard`, `/dashboard/[dashboardId]`)의 에러 바운더리.
 *
 * 서버에서 그룹 조회가 실패해 throw되면 여기서 잡아, 재시도 가능한 화면을 보여준다.
 * `reset`은 해당 세그먼트를 다시 렌더(서버 재요청)한다.
 */
export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return <GroupLoadError onRetry={reset} />;
}

import GroupDropdown from "@/features/dashboard/ui/GroupDropdown";
import type { Group } from "@/features/dashboard/types";

// TODO: 데이터 계층 연동 전까지 사용하는 임시 목업 데이터.
const GROUPS: Group[] = [
  { id: "g1", name: "송파구 공주들" },
  { id: "g2", name: "강남 러너스" },
  { id: "g3", name: "한강 자전거" },
];

/**
 * 사용자 대시보드 페이지 컴포넌트
 *
 * @example
 * import { DashboardPage } from '@/views/dashboard'
 * export default DashboardPage
 */
export function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <GroupDropdown groups={GROUPS} currentGroupId={GROUPS[0].id} />
    </div>
  );
}

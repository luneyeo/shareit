import Divider from "@/shared/ui/divider/Divider";
import Skeleton from "@/shared/ui/skeleton/Skeleton";

/** 관리 목록에 보여줄 행 개수(입장 코드 · 그룹명 수정 · 삭제/나가기 기준). */
const MANAGE_ROW_COUNT = 3;

/**
 * 그룹 상세 본문 로딩 중 자리를 채우는 스켈레톤입니다.
 *
 * 실제 레이아웃(히어로: 이름·개설일·이동 버튼 → 통계 카드 → 구분선 → 관리 목록)을 반영하며,
 * 각 요소는 실제 컴포넌트의 line-height·높이(이름 32 / 개설일 24 / 버튼 lg 50 / 통계 값 32·라벨 24)를 따릅니다.
 * 상단바(BackHeader)는 로딩 중에도 항상 렌더되므로 여기 포함하지 않습니다.
 */
export default function GroupDetailSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex flex-col gap-6 px-5 py-4">
        {/* GroupDetailHero: 이름(32) + 개설일(24) → 대시보드 이동 버튼(lg, h-12.5) */}
        <section className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-8 items-center">
              <Skeleton shape="text" className="h-6 w-40" />
            </div>
            <div className="flex h-6 items-center">
              <Skeleton shape="text" className="h-5 w-50" />
            </div>
          </div>
          <Skeleton className="h-12.5 w-full rounded-full" />
        </section>

        {/* GroupStatsCard: 2열(값 32 + 라벨 24) */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 rounded-2xl border border-gray-200 py-5">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div className="flex h-8 items-center">
                <Skeleton shape="text" className="h-6 w-10" />
              </div>
              <div className="flex h-6 items-center">
                <Skeleton shape="text" className="w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider className="h-2" />

      {/* GroupManageSection: 관리 목록 행(py-4, typo-16 = 24px) */}
      <section className="px-5">
        <ul className="divide-y divide-gray-200">
          {Array.from({ length: MANAGE_ROW_COUNT }).map((_, index) => (
            <li key={index} className="flex items-center justify-between py-4">
              <div className="flex h-6 items-center">
                <Skeleton shape="text" className="w-28" />
              </div>
              <Skeleton shape="text" className="w-12" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

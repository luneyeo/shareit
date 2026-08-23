"use client";

import type { GroupDetail } from "@/features/mypage/group-detail/types/group";
import { IcChevronLeft } from "@/shared/assets/icons";
import Button from "@/shared/ui/button/Button";
import OwnerBadge from "@/shared/ui/owner-badge/OwnerBadge";
import { formatDate } from "@/shared/utils/formatDate";

type GroupDetailHeroProps = {
  name: string;
  role: GroupDetail["role"];
  /** 그룹 개설일 */
  openedAt: string;
  onGoToDashboard: () => void;
};

/**
 * 그룹 상세 페이지 상단 영역입니다. 그룹 이름·개설일과 대시보드 이동 버튼을 보여줍니다.
 *
 * 방장(`owner`)이면 이름 옆에 "방장" 배지를 노출합니다.
 *
 * @example
 * <GroupDetailHero name="송파구 공주들" role="owner" openedAt="2026-03-12" onGoToDashboard={goToDashboard} />
 */
export default function GroupDetailHero({
  name,
  role,
  openedAt,
  onGoToDashboard,
}: GroupDetailHeroProps) {
  return (
    <section className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <h2 className="typo-24-bold">{name}</h2>
          {role === "owner" && <OwnerBadge />}
        </div>
        <p className="typo-16-medium text-gray-500">{formatDate(openedAt)} 개설</p>
      </div>

      <Button theme="primary" size="lg" className="w-full" onClick={onGoToDashboard}>
        대시보드로 이동
        <IcChevronLeft className="h-5 w-5 rotate-180 text-white" aria-hidden />
      </Button>
    </section>
  );
}

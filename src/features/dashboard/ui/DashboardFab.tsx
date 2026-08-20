"use client";

import { useRouter } from "next/navigation";
import { IcEdit } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";

interface DashboardFabProps {
  /** 현재 대시보드(그룹) id. 상품 등록 경로 생성에 사용합니다. */
  dashboardId: string;
}

/**
 * 대시보드 우하단에 고정되는 상품 등록 플로팅 버튼입니다.
 *
 * 탭하면 현재 그룹의 상품 등록 페이지로 이동합니다.
 * `fixed`로 배치되며, 루트 레이아웃의 모바일 프레임 안에 갇혀 우하단에 고정됩니다.
 * 하단 탭바(높이 3.75rem + safe-area) 위로 띄웁니다.
 */
export default function DashboardFab({ dashboardId }: DashboardFabProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="상품 등록"
      onClick={() => router.push(`/dashboard/${dashboardId}/product/new`)}
      className={cn(
        "fixed bottom-[calc(3.75rem+env(safe-area-inset-bottom)+1rem)] right-5 z-footer",
        "flex size-14 items-center justify-center rounded-full",
        "bg-primary-600 text-white shadow-[0_4px_12px_rgba(0,0,0,0.16)]"
      )}
    >
      <IcEdit className="size-6" />
    </button>
  );
}

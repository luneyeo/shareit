"use client";

import type { SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IcHeartFilled, IcHeartOutlined, IcTabDashboard, IcTabMy } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";
import FooterBase from "../footer/FooterBase";

type TabItem = {
  href: string;
  label: string;
  /** 비활성 상태 아이콘 */
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  /** 활성 상태 아이콘 (없으면 `Icon`을 그대로 사용하며 색상만 currentColor로 변경) */
  ActiveIcon: React.FC<SVGProps<SVGSVGElement>>;
};

// TODO: 대시보드/좋아요 경로는 실제 라우트가 정해지면 교체 (마이페이지만 실제 경로 /mypage)
const TAB_ITEMS: TabItem[] = [
  { href: "/dashboard", label: "대시보드", Icon: IcTabDashboard, ActiveIcon: IcTabDashboard },
  { href: "/likes", label: "좋아요", Icon: IcHeartOutlined, ActiveIcon: IcHeartFilled },
  { href: "/mypage", label: "마이페이지", Icon: IcTabMy, ActiveIcon: IcTabMy },
];

/**
 * private 페이지 하단에 고정되는 기본 메뉴 탭바입니다.
 *
 * 공통 `FooterBase` 껍데기 위에 대시보드·좋아요·마이페이지 탭을 배치하며,
 * 현재 활성 탭은 URL(`usePathname`)에서 파생합니다. `app/(private)/layout.tsx`에서
 * 한 번 렌더해 private 전역에서 공유합니다.
 *
 * @example
 * // app/(private)/layout.tsx
 * <>
 *   {children}
 *   <TabBar />
 * </>
 */
export default function TabBar() {
  const pathname = usePathname();

  return (
    <FooterBase>
      <nav className="flex h-11 items-center justify-around" aria-label="기본 메뉴">
        {TAB_ITEMS.map(({ href, label, Icon, ActiveIcon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          const TabIcon = isActive ? ActiveIcon : Icon;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1",
                isActive ? "text-primary-600" : "text-gray-400"
              )}
            >
              <TabIcon className="h-6 w-6" />
              <span className="typo-12-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </FooterBase>
  );
}

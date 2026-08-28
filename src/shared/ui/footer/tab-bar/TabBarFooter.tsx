"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import FooterBase from "../base/FooterBase";
import { TAB_ITEMS } from "./tabItems";

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
 *   <TabBarFooter />
 * </>
 */
export default function TabBarFooter() {
  const pathname = usePathname();

  return (
    <FooterBase>
      <nav className="flex items-center justify-around" aria-label="기본 메뉴">
        {TAB_ITEMS.map(({ href, label, Icon, ActiveIcon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          const TabIcon = isActive ? ActiveIcon : Icon;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center",
                isActive ? "text-primary-600 typo-14-bold" : "text-gray-500 typo-14-medium"
              )}
            >
              <TabIcon className="h-5.5 w-5.5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </FooterBase>
  );
}

import type { SVGProps } from "react";
import { IcTabDashboard, IcTabMy } from "@/shared/assets/icons";

export type TabItem = {
  href: string;
  label: string;
  /** 비활성 상태 아이콘 */
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  /** 활성 상태 아이콘 (없으면 `Icon`을 그대로 사용하며 색상만 currentColor로 변경) */
  ActiveIcon: React.FC<SVGProps<SVGSVGElement>>;
};

export const TAB_ITEMS: TabItem[] = [
  { href: "/dashboard", label: "대시보드", Icon: IcTabDashboard, ActiveIcon: IcTabDashboard },
  { href: "/mypage", label: "마이페이지", Icon: IcTabMy, ActiveIcon: IcTabMy },
];

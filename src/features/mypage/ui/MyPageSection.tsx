import MyPageMenuItem, { type MyPageMenuItemProps } from "./MyPageMenuItem";

type MyPageSectionProps = {
  /** 섹션 제목 (예: "프로필", "그룹 관리") */
  title: string;
  /** 섹션에 표시할 부주제(메뉴) 목록 */
  items: MyPageMenuItemProps[];
};

/**
 * 마이페이지의 한 섹션입니다. "타이틀 + 부주제 리스트" 형태를 공통화합니다.
 *
 * 프로필·그룹 관리처럼 성격이 다른 메뉴 묶음을 각각 하나의 섹션으로 표현합니다.
 *
 * @example
 * ```tsx
 * <MyPageSection
 *   title="프로필"
 *   items={[
 *     { label: "프로필 수정", href: "/mypage/profile" },
 *     { label: "알림 설정", href: "/mypage/notifications" },
 *   ]}
 * />
 * ```
 */
export default function MyPageSection({ title, items }: MyPageSectionProps) {
  return (
    <section className="px-5 py-4">
      <h2 className="typo-18-bold">{title}</h2>
      <ul className="mt-3">
        {items.map((item) => (
          <li key={item.label}>
            <MyPageMenuItem {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

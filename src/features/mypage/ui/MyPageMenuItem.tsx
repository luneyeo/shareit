import Link from "next/link";

export type MyPageMenuItemProps = {
  /** 메뉴에 표시할 문구 */
  label: string;
  /** 이동할 경로 */
  href: string;
};

/**
 * 마이페이지 섹션 안에서 반복되는 부주제(메뉴) 한 줄입니다.
 *
 * 페이지 이동을 위한 `<Link>`로 렌더링합니다.
 *
 * @example
 * ```tsx
 * <MyPageMenuItem label="프로필 수정" href="/mypage/profile" />
 * ```
 */
export default function MyPageMenuItem({ label, href }: MyPageMenuItemProps) {
  return (
    <Link href={href} className="block w-full py-3 text-left typo-16-medium text-gray-800">
      {label}
    </Link>
  );
}

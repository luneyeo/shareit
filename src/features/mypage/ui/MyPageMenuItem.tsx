import Link from "next/link";

/** 메뉴 한 줄에 공통으로 표시할 문구 */
type MyPageMenuItemBaseProps = {
  /** 메뉴에 표시할 문구 */
  label: string;
};

export type MyPageMenuItemProps =
  | (MyPageMenuItemBaseProps & {
      /** 페이지 이동용 링크 메뉴 */
      type?: "link";
      /** 이동할 경로 */
      href: string;
    })
  | (MyPageMenuItemBaseProps & {
      /** 동작 실행용 버튼 메뉴 */
      type: "button";
      /** 클릭 시 실행할 함수 */
      onClick: () => void;
    });

const itemClassName = "block w-full py-3 text-left typo-16-medium text-gray-800";

/**
 * 마이페이지 섹션 안에서 반복되는 부주제(메뉴) 한 줄입니다.
 *
 * `type`이 `"link"`(기본값)이면 페이지 이동을 위한 `<Link>`로,
 * `type`이 `"button"`이면 동작 실행을 위한 `<button>`으로 렌더링합니다.
 *
 * @example
 * ```tsx
 * <MyPageMenuItem label="프로필 수정" href="/mypage/profile" />
 * <MyPageMenuItem type="button" label="로그아웃" onClick={handleLogout} />
 * ```
 */
export default function MyPageMenuItem(props: MyPageMenuItemProps) {
  if (props.type === "button") {
    return (
      <button type="button" onClick={props.onClick} className={itemClassName}>
        {props.label}
      </button>
    );
  }

  return (
    <Link href={props.href} className={itemClassName}>
      {props.label}
    </Link>
  );
}

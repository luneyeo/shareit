import type { MyPageMenuItemProps } from "../ui/MyPageMenuItem";

interface MyPageSectionData {
  /** 섹션 제목 */
  title: string;
  /** 섹션에 표시할 부주제(메뉴) 목록 */
  items: MyPageMenuItemProps[];
}

/**
 * 마이페이지에 노출되는 섹션·메뉴 구성을 한곳에서 관리한다.
 * 메뉴 추가/문구 변경 시 이 파일만 수정한다.
 */
export const MYPAGE_SECTIONS: MyPageSectionData[] = [
  {
    title: "그룹 관리",
    items: [
      { label: "전체 그룹", href: "/mypage/groups" },
      // TODO: 코드 입장 다이얼로그/라우트 연결
      { label: "코드로 그룹 입장", href: "/dashboard" },
    ],
  },
];

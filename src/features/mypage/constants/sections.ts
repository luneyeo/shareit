/** 버튼형 메뉴가 클릭 시 실행하는 동작 식별자. 실제 핸들러는 뷰에서 연결한다. */
export type MyPageMenuAction = "joinGroup";

/** 섹션에 표시할 부주제(메뉴) 한 줄의 설정. 링크 이동 또는 동작 실행 중 하나다. */
export type MyPageMenuData =
  { label: string; href: string } | { label: string; action: MyPageMenuAction };

interface MyPageSectionData {
  /** 섹션 제목 */
  title: string;
  /** 섹션에 표시할 부주제(메뉴) 목록 */
  items: MyPageMenuData[];
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
      { label: "코드로 그룹 입장", action: "joinGroup" },
    ],
  },
];

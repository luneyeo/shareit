"use client";

import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";
import {
  MYPAGE_SECTIONS,
  type MyPageMenuAction,
  type MyPageMenuData,
} from "@/features/mypage/constants/sections";
import type { MyPageMenuItemProps } from "@/features/mypage/ui/MyPageMenuItem";

/** 동작 식별자와 실제 핸들러가 연결된, 렌더링 가능한 섹션 데이터. */
interface ResolvedMyPageSection {
  title: string;
  items: MyPageMenuItemProps[];
}

/**
 * 마이페이지 섹션 설정(`MYPAGE_SECTIONS`)의 동작 식별자를 실제 핸들러로 연결해
 * 렌더링 가능한 형태로 돌려주는 훅.
 *
 * 함께 반환하는 `dialogElement`를 렌더 트리에 넣어야 그룹 입장 다이얼로그가 동작한다.
 *
 * @example
 * const { sections, dialogElement } = useMyPageSections();
 * sections.map((s) => <MyPageSection {...s} />)
 * {dialogElement}
 */
export function useMyPageSections() {
  const { openJoin, dialogElement } = useGroupDialog();

  // 버튼형 메뉴의 동작 식별자를 실제 핸들러로 연결한다.
  const actionHandlers: Record<MyPageMenuAction, () => void> = {
    joinGroup: openJoin,
  };

  const toItemProps = (item: MyPageMenuData): MyPageMenuItemProps =>
    "action" in item
      ? { type: "button", label: item.label, onClick: actionHandlers[item.action] }
      : item;

  const sections: ResolvedMyPageSection[] = MYPAGE_SECTIONS.map((section) => ({
    title: section.title,
    items: section.items.map(toItemProps),
  }));

  return { sections, dialogElement };
}

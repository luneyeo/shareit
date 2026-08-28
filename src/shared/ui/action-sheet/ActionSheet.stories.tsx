import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { fn } from "storybook/test";
import ActionSheet from "./ActionSheet";
import ActionSheetItem from "./ActionSheetItem";

/**
 * iOS 액션 시트 스타일의 하단 모달.
 *
 * `OverlayPortal`(딤·포탈·포커스 트랩·Escape/배경 클릭 닫기) 위에 하단 정렬 +
 * 2카드 레이아웃으로 얹었습니다. 상단 카드에는 `ActionSheetItem`들이 구분선과 함께
 * 쌓이고, 하단 취소 카드는 시트가 기본 제공합니다.
 *
 * 화면 전체를 덮는 포탈이므로, 아래 예시는 트리거 버튼으로 열고 닫아 확인합니다.
 */
const meta: Meta<typeof ActionSheet> = {
  title: "Shared/ActionSheet",
  component: ActionSheet,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActionSheet>;

/** 트리거로 여는 상호작용 데모 래퍼. */
function ActionSheetDemo({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center p-6">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-gray-900 px-4 py-2 text-white typo-16-medium"
      >
        더보기 열기
      </button>
      <ActionSheet isOpen={isOpen} onClose={() => setIsOpen(false)} ariaLabel="상품 더보기 메뉴">
        {children}
      </ActionSheet>
    </div>
  );
}

/** 기본 — 수정하기 / 삭제하기(destructive) + 취소. */
export const Default: Story = {
  name: "기본 / 수정·삭제",
  render: () => (
    <ActionSheetDemo>
      <ActionSheetItem onClick={fn()}>수정하기</ActionSheetItem>
      <ActionSheetItem variant="destructive" onClick={fn()}>
        삭제하기
      </ActionSheetItem>
    </ActionSheetDemo>
  ),
};

/** 항목이 여럿일 때 — 구분선이 항목 사이마다 그려집니다. */
export const MultipleItems: Story = {
  name: "항목 여럿 / 구분선",
  render: () => (
    <ActionSheetDemo>
      <ActionSheetItem onClick={fn()}>공유하기</ActionSheetItem>
      <ActionSheetItem onClick={fn()}>수정하기</ActionSheetItem>
      <ActionSheetItem variant="destructive" onClick={fn()}>
        삭제하기
      </ActionSheetItem>
    </ActionSheetDemo>
  ),
};

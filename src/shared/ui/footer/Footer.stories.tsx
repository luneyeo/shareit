import type { Meta, StoryObj } from "@storybook/react";
import Button from "../button/Button";
import Footer from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Shared/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

/** 상품 상세의 액션 푸터: 저장하기 + 좋아요. 탭바를 대체합니다. */
export const ProductAction: Story = {
  args: {
    className: "flex gap-2",
    children: (
      <>
        <Button theme="secondary" size="lg" className="flex-1">
          저장하기
        </Button>
        <Button theme="primary" size="lg" className="flex-1">
          좋아요
        </Button>
      </>
    ),
  },
};

/** 기본 메뉴 탭바: 홈 · 대시보드 · 좋아요 · 마이. (내부 아이템은 예시 placeholder) */
export const MenuNav: Story = {
  args: {
    className: "flex items-center justify-around",
    children: (
      <>
        {["홈", "대시보드", "좋아요", "마이"].map((label) => (
          <span key={label} className="text-14-medium text-gray-500">
            {label}
          </span>
        ))}
      </>
    ),
  },
};

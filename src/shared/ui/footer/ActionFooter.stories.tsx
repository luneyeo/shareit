import type { Meta, StoryObj } from "@storybook/react";
import Button from "../button/Button";
import ActionFooter from "./ActionFooter";

const meta: Meta<typeof ActionFooter> = {
  title: "Shared/ActionFooter",
  component: ActionFooter,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ActionFooter>;

/** 상품 상세: 저장하기 + 좋아요 (버튼 2개 → 사이 간격 적용) */
export const TwoActions: Story = {
  args: {
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

/** 상품 등록: 등록하기 (버튼 1개 → 간격 없이 꽉 채움) */
export const OneAction: Story = {
  args: {
    children: (
      <Button theme="primary" size="lg" className="flex-1">
        등록하기
      </Button>
    ),
  },
};

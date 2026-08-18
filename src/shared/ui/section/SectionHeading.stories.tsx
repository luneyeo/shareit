import type { Meta, StoryObj } from "@storybook/react";
import SectionHeading from "./SectionHeading";

const meta: Meta<typeof SectionHeading> = {
  title: "Shared/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: {
    eyebrow: "REAL SHARES",
    title: "이런 정보가 오가요",
    description: "친구가 직접 써보고 추천한 찐템, 그대로 공유돼요",
  },
};

export const WithoutDescription: Story = {
  args: {
    eyebrow: "HOW IT WORKS",
    title: "이렇게 시작해요",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "이미 쓰고 있어요",
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Shared/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Small: Story = { args: { seed: "홍길동", size: "sm" } };
export const Medium: Story = { args: { seed: "홍길동", size: "md" } };
export const Large: Story = { args: { seed: "홍길동", size: "lg" } };
export const Brown: Story = { args: { seed: "홍길동" } };
export const Blue: Story = { args: { seed: "김철수" } };
export const Green: Story = { args: { seed: "이영희ㅁ" } };
export const Pink: Story = { args: { seed: "박ㅁ민준" } };
export const Mint: Story = { args: { seed: "Mawint" } };

import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Shared/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    shape: {
      control: "radio",
      options: ["rect", "circle", "text"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rect: Story = {
  args: {
    shape: "rect",
    className: "h-40 w-64",
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
    className: "size-12",
  },
};

export const Text: Story = {
  args: {
    shape: "text",
    className: "w-40",
  },
};

/** 여러 프리미티브를 조합해 만든 상품 카드 스켈레톤 예시입니다. */
export const ProductCard: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton shape="text" className="w-3/4" />
      <div className="flex items-center gap-2">
        <Skeleton shape="circle" className="size-8" />
        <Skeleton shape="text" className="w-24" />
      </div>
    </div>
  ),
};

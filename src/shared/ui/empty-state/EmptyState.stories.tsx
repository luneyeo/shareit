import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import EmptyState from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Shared/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Group: Story = {
  args: {
    type: "group",
    message: "아직 속한 그룹이 없어요",
    description: "새 그룹을 만들거나 초대 코드로 입장해보세요",
    onCreateGroup: fn(),
    onJoinGroup: fn(),
  },
};

export const Product: Story = {
  args: {
    type: "product",
    message: "아직 등록된 상품이 없어요",
    description: "첫 상품을 등록해보세요",
    onAddProduct: fn(),
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "문제가 발생했어요",
    description: "잠시 후 다시 시도해주세요",
    onRetry: fn(),
  },
};

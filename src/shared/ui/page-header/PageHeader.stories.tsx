import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import PageHeader from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Shared/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: {
    onSearchClick: fn(),
  },
  argTypes: {
    showSearch: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const WithSearch: Story = { args: { title: "좋아요 상품", showSearch: true } };

export const TitleOnly: Story = { args: { title: "마이페이지" } };

export const WithBottom: Story = {
  args: {
    title: "우리 동네 모임",
    showSearch: true,
  },
};

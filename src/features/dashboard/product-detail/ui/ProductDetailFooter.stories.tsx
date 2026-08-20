import type { Meta, StoryObj } from "@storybook/nextjs";
import ProductDetailFooter from "./ProductDetailFooter";

const meta: Meta<typeof ProductDetailFooter> = {
  title: "Features/Dashboard/ProductDetailFooter",
  component: ProductDetailFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onSave: () => {},
    onLike: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ProductDetailFooter>;

/** 저장하기(북마크) + 좋아요(하트). 상세 페이지 하단에 고정됩니다. */
export const Default: Story = {};

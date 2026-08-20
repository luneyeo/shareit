import type { Meta, StoryObj } from "@storybook/nextjs";
import ProductCard from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Features/Dashboard/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const baseArgs = {
  prdName: "2인용 텐트",
  price: 5000,
  imageUrl: ["https://picsum.photos/seed/tent/400/400"],
  tag: ["캠핑"],
  userId: "user-uuid-001",
};

export const Default: Story = {
  args: baseArgs,
};

export const NoImage: Story = {
  args: { ...baseArgs, imageUrl: null },
};

export const TwoTags: Story = {
  args: { ...baseArgs, tag: ["캠핑", "아웃도어"] },
};

export const NoTag: Story = {
  args: { ...baseArgs, tag: null },
};

export const NoPrice: Story = {
  args: { ...baseArgs, price: null },
};

export const AllNullable: Story = {
  args: { ...baseArgs, imageUrl: null, tag: null, price: null },
};

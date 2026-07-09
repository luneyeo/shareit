import type { Meta, StoryObj } from "@storybook/nextjs";
import Label from "./Label";

const meta: Meta<typeof Label> = {
  title: "Shared/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "이메일",
  },
};

export const Required: Story = {
  args: {
    children: "이메일",
    required: true,
  },
};

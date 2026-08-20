import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    theme: "primary",
    size: "md",
    children: "버튼",
  },
};

export const Secondary: Story = {
  args: {
    theme: "secondary",
    size: "md",
    children: "버튼",
  },
};

export const WithIcon: Story = {
  args: {
    theme: "primary",
    size: "md",
    icon: "⬆",
    children: "공유하기",
  },
};

export const Disabled: Story = {
  args: {
    theme: "primary",
    size: "md",
    children: "버튼",
    disabled: true,
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Shared/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "입력해주세요",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "입력해주세요",
    disabled: true,
  },
};

export const WithSuffixIcon: Story = {
  args: {
    placeholder: "검색어를 입력해주세요",
    suffix: "🔍",
  },
};

export const WithSuffixButton: Story = {
  args: {
    placeholder: "인증번호를 입력해주세요",
    suffix: <button className="text-14-medium text-primary-600 whitespace-nowrap">인증하기</button>,
  },
};

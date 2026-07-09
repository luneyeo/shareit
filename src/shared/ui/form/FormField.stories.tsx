import type { Meta, StoryObj } from "@storybook/nextjs";
import FormField from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Shared/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
  },
};

export const Required: Story = {
  args: {
    label: "제품명",
    placeholder: "제품명을 입력해주세요",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
    disabled: true,
  },
};

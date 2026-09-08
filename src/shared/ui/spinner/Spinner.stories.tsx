import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Shared/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const OnDarkBackground: Story = {
  args: {
    size: "lg",
  },
  render: (args) => (
    <div className="flex items-center justify-center rounded-md bg-black/70 p-8 text-white">
      <Spinner {...args} />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import TagChip from "./TagChip";

const meta: Meta<typeof TagChip> = {
  title: "Shared/TagChip",
  component: TagChip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagChip>;

export const Default: Story = {
  args: {
    label: "속건조",
  },
};

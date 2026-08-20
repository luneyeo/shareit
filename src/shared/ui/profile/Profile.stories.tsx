import type { Meta, StoryObj } from "@storybook/nextjs";
import Profile from "./Profile";

const meta: Meta<typeof Profile> = {
  title: "Shared/Profile",
  component: Profile,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Small: Story = { args: { name: "여수경", size: "sm" } };
export const Medium: Story = { args: { name: "여수경", size: "md" } };
export const Large: Story = { args: { name: "여수경", size: "lg" } };

import type { Meta, StoryObj } from '@storybook/react';

const Button = ({ label }: { label: string }) => (
  <button className="px-4 py-2 bg-primary text-white rounded-md typo-14-medium">
    {label}
  </button>
);

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Button',
  },
};

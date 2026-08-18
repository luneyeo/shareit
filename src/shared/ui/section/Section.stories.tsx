import type { Meta, StoryObj } from "@storybook/react";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

const meta: Meta<typeof Section> = {
  title: "Shared/Section",
  component: Section,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: (args) => (
    <Section {...args}>
      <SectionHeading
        eyebrow="WHY SHAREIT"
        title="왜 Shareit인가요?"
        description="초대한 친구들끼리만 공유해요"
      />
      <div className="rounded-2xl bg-gray-100 py-16 text-center typo-14-medium text-gray-500">
        섹션 본문 영역
      </div>
    </Section>
  ),
};

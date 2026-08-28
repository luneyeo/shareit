import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import Banner from "./Banner";

/**
 * 사용자가 읽고 조치해야 하는, 지속적인 인라인 배너.
 *
 * 자동으로 사라지지 않고 ✕ 버튼 또는 조건 해소 시에만 닫힙니다. 해당 콘텐츠 영역 안에
 * 인라인으로 배치하며(폼 오류는 입력 필드 바로 위), 상태별로 배경·텍스트·닫기 색이 달라집니다.
 * error 상태만 `role="alert"`(즉시 읽기)로 처리합니다.
 */
const meta: Meta<typeof Banner> = {
  title: "Shared/Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  args: {
    onClose: fn(),
  },
  argTypes: {
    status: {
      control: "select",
      options: ["success", "error", "warning"],
    },
    children: {
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-120 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Banner>;

/** 기본 — 폼 검증 오류. */
export const Default: Story = {
  args: {
    status: "error",
    children: "네트워크 연결을 확인해주세요",
  },
};

/** 상태별 색상 — success / error / warning. */
export const AllStatuses: Story = {
  name: "상태별 색상",
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Banner {...args} status="success">
        저장 목록에 담았어요
      </Banner>
      <Banner {...args} status="error">
        그룹명을 입력해주세요
      </Banner>
      <Banner {...args} status="warning">
        이 그룹은 30일 후 삭제될 예정이에요
      </Banner>
    </div>
  ),
};

/** 닫기 버튼 없이 — `onClose`를 넘기지 않으면 ✕ 버튼이 표시되지 않습니다. (정적 안내용) */
export const WithoutClose: Story = {
  name: "닫기 버튼 없음",
  args: {
    status: "warning",
    children: "이 그룹은 30일 후 삭제될 예정이에요",
    onClose: undefined,
  },
};

/** 두 줄 이상 — 긴 문구는 줄바꿈되며 심볼은 상단이 아닌 가운데 정렬을 유지합니다. */
export const LongMessage: Story = {
  name: "긴 문구",
  args: {
    status: "error",
    children: "네트워크 연결이 원활하지 않아요. 잠시 후 다시 시도하거나 연결 상태를 확인해주세요",
  },
};

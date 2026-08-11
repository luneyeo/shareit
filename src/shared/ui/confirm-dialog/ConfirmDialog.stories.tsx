import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
// import OverlayPortal from "../overlay/OverlayPortal";
import ConfirmDialog from "./ConfirmDialog";

/**
 * 확인/취소 두 가지 선택지를 제공하는 컨펌 다이얼로그 콘텐츠.
 * - 실제 사용 시에는 배경·중앙 정렬을 담당하는 `OverlayPortal` 내부에 배치합니다.
 */
const meta: Meta<typeof ConfirmDialog> = {
  title: "Shared/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  args: {
    message: "정말 삭제하시겠어요?",
    confirmText: "삭제",
    cancelText: "취소",
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

/** 콘텐츠 단독 — 서피스 크기 감을 위해 max-w-xs 컨테이너로 감쌌습니다. */
export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-xs rounded-2xl bg-white shadow-lg">
      <ConfirmDialog {...args} />
    </div>
  ),
};

/** 기본 문구(확인/취소)를 사용하는 경우. */
export const DefaultLabels: Story = {
  args: {
    message: "변경 사항을 저장할까요?",
    confirmText: undefined,
    cancelText: undefined,
  },
  render: (args) => (
    <div className="w-full max-w-xs rounded-2xl bg-white shadow-lg">
      <ConfirmDialog {...args} />
    </div>
  ),
};

// /** OverlayPortal 안에서 실제로 열린 모습. */
// export const InOverlay: Story = {
//   parameters: { layout: "fullscreen" },
//   render: (args) => (
//     <OverlayPortal ariaLabel="삭제 확인" surfaceClassName="w-full max-w-xs">
//       <ConfirmDialog {...args} />
//     </OverlayPortal>
//   ),
// };

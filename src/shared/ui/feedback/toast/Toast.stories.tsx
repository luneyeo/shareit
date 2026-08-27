import type { Meta, StoryObj } from "@storybook/nextjs";
import { toast } from "./toastApi";
import Toast from "./Toast";
import Toaster from "./Toaster";

/**
 * 자동으로 사라지는 일시적 결과 알림.
 *
 * `Toast`는 카드를 그리는 표시용 컴포넌트이고, 실제 노출(헤더 아래 고정·3초 자동 소멸·
 * 1개만 유지·슬라이드+페이드)은 `Toaster`와 `toast` 명령형 API가 담당합니다.
 * 아래 "실제 동작" 스토리에서 버튼을 눌러 등장/교체/소멸을 확인하세요.
 */
const meta: Meta<typeof Toast> = {
  title: "Shared/Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["success", "error", "warning"],
    },
    message: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/** 기본 — 복사 완료 성공 토스트. */
export const Default: Story = {
  args: {
    status: "success",
    message: "입장 코드를 복사했어요",
  },
};

/** 상태별 아이콘 배지 — success / error / warning. */
export const AllStatuses: Story = {
  name: "상태별 배지",
  render: () => (
    <div className="flex max-w-120 flex-col gap-3">
      <Toast status="success" message="그룹명을 수정했어요" />
      <Toast status="error" message="코드가 올바르지 않아요. 다시 확인해주세요" />
      <Toast status="warning" message="그룹명은 20자까지 입력할 수 있어요" />
    </div>
  ),
};

/**
 * 실제 동작 — `toast` API로 띄우는 상호작용 데모.
 *
 * `Toaster`가 화면 상단에 고정 렌더링됩니다. 새 토스트를 띄우면 이전 것을 즉시 교체하고,
 * 3초 뒤 자동으로 사라집니다.
 */
export const Live: Story = {
  name: "실제 동작 / toast API",
  render: () => (
    <div className="flex flex-wrap gap-2 p-6">
      <Toaster />
      <button
        type="button"
        onClick={() => toast.success("입장 코드를 복사했어요")}
        className="rounded-lg bg-gray-900 px-4 py-2 text-white typo-14-medium"
      >
        success
      </button>
      <button
        type="button"
        onClick={() => toast.error("코드가 올바르지 않아요. 다시 확인해주세요")}
        className="rounded-lg bg-gray-900 px-4 py-2 text-white typo-14-medium"
      >
        error
      </button>
      <button
        type="button"
        onClick={() => toast.warning("그룹명은 20자까지 입력할 수 있어요")}
        className="rounded-lg bg-gray-900 px-4 py-2 text-white typo-14-medium"
      >
        warning
      </button>
    </div>
  ),
};

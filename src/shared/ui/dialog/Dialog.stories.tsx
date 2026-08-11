import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { fn } from "storybook/test";
import ConfirmDialog from "./ConfirmDialog";
import InputDialog from "./InputDialog";

/**
 * `DialogBase` 껍데기 위에 조합한 다이얼로그 모음.
 * - `ConfirmDialog`: 메시지 + 확인/취소
 * - `InputDialog`: 제목·닫기(X) + 입력 필드 + 확인/취소
 *
 * 실제 사용 시에는 배경·중앙 정렬을 담당하는 `OverlayPortal` 내부에 배치합니다.
 * 아래 예시는 서피스 크기 감을 위해 `max-w-xs` 컨테이너로 감쌌습니다.
 */
const meta: Meta = {
  title: "Shared/Dialog",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/** 스토리 공통 서피스 래퍼. */
function Surface({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-xs rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.12)]">
      {children}
    </div>
  );
}

/** ConfirmDialog — 삭제 확인 (커스텀 버튼 문구). */
export const Confirm: Story = {
  name: "ConfirmDialog / 삭제 확인",
  render: () => (
    <Surface>
      <ConfirmDialog
        message="정말 삭제하시겠어요?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={fn()}
        onCancel={fn()}
      />
    </Surface>
  ),
};

/** ConfirmDialog — 기본 문구(확인/취소). */
export const ConfirmDefaultLabels: Story = {
  name: "ConfirmDialog / 기본 문구",
  render: () => (
    <Surface>
      <ConfirmDialog message="변경 사항을 저장할까요?" onConfirm={fn()} onCancel={fn()} />
    </Surface>
  ),
};

/** 입력값 제어를 위해 useState로 감싼 InputDialog 데모. */
function InputDialogDemo(
  args: Omit<React.ComponentProps<typeof InputDialog>, "value" | "onChange">
) {
  const [value, setValue] = useState("");
  return (
    <Surface>
      <InputDialog {...args} value={value} onChange={setValue} />
    </Surface>
  );
}

/** InputDialog — 새 그룹 생성. 입력창에 직접 타이핑할 수 있습니다. */
export const Input: Story = {
  name: "InputDialog / 새 그룹 생성",
  render: () => (
    <InputDialogDemo
      title="새 그룹 생성"
      label="이름"
      placeholder="송파구 공주들"
      confirmText="생성"
      onConfirm={fn()}
      onCancel={fn()}
      onClose={fn()}
    />
  ),
};

/** InputDialog — 라벨 없이 입력 필드만. 제목이 접근성 이름(aria-label)으로 쓰입니다. */
export const InputNoLabel: Story = {
  name: "InputDialog / 라벨 없음 (그룹 입장)",
  render: () => (
    <InputDialogDemo
      title="그룹 입장하기"
      placeholder="입장 코드 입력하기"
      confirmText="입장"
      onConfirm={fn()}
      onCancel={fn()}
      onClose={fn()}
    />
  ),
};

/** InputDialog — 기본 문구(확인/취소). */
export const InputDefaultLabels: Story = {
  name: "InputDialog / 기본 문구",
  render: () => (
    <InputDialogDemo
      title="닉네임 변경"
      label="닉네임"
      placeholder="닉네임을 입력해주세요"
      onConfirm={fn()}
      onCancel={fn()}
      onClose={fn()}
    />
  ),
};

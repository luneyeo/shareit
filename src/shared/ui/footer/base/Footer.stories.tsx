import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../button/Button";
import FooterBase from "./FooterBase";
import ActionFooter from "../action/ActionFooter";

/**
 * 하단 고정 푸터 모음.
 * - `FooterBase`: 하단 고정 바 껍데기 (기본 메뉴 탭바 등)
 * - `ActionFooter`: `FooterBase` 위에 액션 버튼 줄을 얹은 공통 레이아웃 (상세·등록)
 */
const meta: Meta = {
  title: "Shared/Footer",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

/** FooterBase 껍데기 — 기본 메뉴 탭바: 홈 · 대시보드 · 좋아요 · 마이. (내부 아이템은 예시 placeholder) */
export const MenuNav: Story = {
  name: "FooterBase / 기본 메뉴 탭바",
  render: () => (
    <FooterBase className="flex items-center justify-around">
      {["홈", "대시보드", "좋아요", "마이"].map((label) => (
        <span key={label} className="text-14-medium text-gray-500">
          {label}
        </span>
      ))}
    </FooterBase>
  ),
};

/** ActionFooter — 상품 상세: 저장하기 + 좋아요 (버튼 2개 → 사이 간격 적용) */
export const ProductDetailAction: Story = {
  name: "ActionFooter / 상품 상세 (2개)",
  render: () => (
    <ActionFooter>
      <Button theme="secondary" size="lg" className="flex-1">
        저장하기
      </Button>
      <Button theme="primary" size="lg" className="flex-1">
        좋아요
      </Button>
    </ActionFooter>
  ),
};

/** ActionFooter — 상품 등록: 등록하기 (버튼 1개 → 간격 없이 꽉 채움) */
export const ProductRegisterAction: Story = {
  name: "ActionFooter / 상품 등록 (1개)",
  render: () => (
    <ActionFooter>
      <Button theme="primary" size="lg" className="flex-1">
        등록하기
      </Button>
    </ActionFooter>
  ),
};

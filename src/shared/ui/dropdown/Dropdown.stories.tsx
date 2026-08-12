import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { fn } from "storybook/test";
import { IcChevronDown, IcMenu, IcPlus } from "@/shared/assets/icons";
import DropdownProvider from "./model/DropdownProvider";
import DropdownTrigger from "./common/DropdownTrigger";
import DropdownActionMenu from "./action/DropdownActionMenu";
import DropdownSelectMenu, { type DropdownSelectOption } from "./select/DropdownSelectMenu";
import DropdownSurface from "./common/DropdownSurface";
import DropdownList from "./common/DropdownList";
import DropdownActionItem from "./action/DropdownActionItem";
import DropdownSelectItem from "./select/DropdownSelectItem";

/**
 * `DropdownProvider`(열림 상태) · `DropdownTrigger`(트리거) 위에 두 성격의 메뉴를
 * 올려 만드는 드롭다운 모음.
 *
 * - `DropdownActionMenu` + `DropdownActionItem` — 동작 실행형 (예: 상품 등록 / 그룹 입장)
 * - `DropdownSelectMenu` + `DropdownSelectItem` — 데이터 배열 기반 단일 선택형 (예: 그룹 선택)
 *
 * 하단 정적 예시는 `DropdownSurface`/`DropdownList`/항목 원시 조합을 보여주며,
 * 위치 클래스를 직접 지정합니다.
 */
const meta: Meta = {
  title: "Shared/Dropdown",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/** 절대 위치 메뉴가 잘리지 않도록 여백을 준 데모 래퍼. */
function DemoStage({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center p-6">{children}</div>;
}

/** action 성격 — 트리거를 탭해 열고, 항목을 탭하면 실행 후 닫힙니다. */
export const ActionMenu: Story = {
  name: "DropdownActionMenu / 액션 메뉴",
  render: () => (
    <DemoStage>
      <DropdownProvider>
        <DropdownTrigger
          aria-label="메뉴 열기"
          className="rounded-full p-2 text-gray-800 transition-colors hover:bg-gray-100"
        >
          <IcMenu />
        </DropdownTrigger>
        <DropdownActionMenu className="right-0 top-full mt-2 w-40">
          <DropdownActionItem emphasis={"primary"} onClick={fn()}>
            상품 등록
          </DropdownActionItem>
          <DropdownActionItem onClick={fn()}>그룹 입장</DropdownActionItem>
        </DropdownActionMenu>
      </DropdownProvider>
    </DemoStage>
  ),
};

const GROUP_OPTIONS: DropdownSelectOption[] = [
  { value: "g1", label: "송파구 공주들", description: "멤버 26명" },
  { value: "g2", label: "강남 러너스", description: "멤버 12명" },
  { value: "g3", label: "한강 자전거", description: "멤버 8명" },
];

/** select 성격 — 데이터 배열을 받아 렌더링하고, 고른 값에 선택 표시가 붙습니다. */
export const SelectMenu: Story = {
  name: "DropdownSelectMenu / 그룹 선택",
  render: function SelectMenuStory() {
    const [selected, setSelected] = useState("g1");
    const selectedLabel = GROUP_OPTIONS.find((option) => option.value === selected)?.label;

    return (
      <DemoStage>
        <DropdownProvider>
          <DropdownTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 typo-16-bold text-gray-900 hover:bg-gray-100">
            {selectedLabel}
            <IcChevronDown />
          </DropdownTrigger>
          <DropdownSelectMenu
            className="left-0 top-full mt-2 w-80 p-3.5"
            options={GROUP_OPTIONS}
            selectedValue={selected}
            onSelect={setSelected}
            footer={
              <button
                type="button"
                onClick={fn()}
                className="flex w-full items-center gap-3 border-t border-gray-100 px-5 py-4 text-left typo-16-medium text-primary-600 transition-colors hover:bg-gray-50"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary-600">
                  <IcPlus />
                </span>
                새 그룹 만들기
              </button>
            }
          />
        </DropdownProvider>
      </DemoStage>
    );
  },
};

/**
 * 원시 조합 (정적) — Provider 없이 `DropdownSurface`/`DropdownList`/항목을 직접 조합한 예시.
 * 같은 디자인을 상태·데이터와 함께 쓰려면 위 `SelectMenu`처럼 `DropdownSelectMenu`(+`footer`)를 사용합니다.
 */
export const RawGroupList: Story = {
  name: "원시 조합 / 그룹 목록 + 액션",
  render: () => (
    <DropdownSurface className="w-80 p-3.5">
      <DropdownList>
        <DropdownSelectItem selected description="멤버 26명" onClick={fn()}>
          송파구 공주들
        </DropdownSelectItem>
        <DropdownSelectItem description="멤버 26명" onClick={fn()}>
          송파구 공주들
        </DropdownSelectItem>
        <DropdownSelectItem description="멤버 26명" onClick={fn()}>
          송파구 공주들
        </DropdownSelectItem>
      </DropdownList>
      <button
        type="button"
        onClick={fn()}
        className="flex w-full items-center gap-3 border-t border-gray-100 px-5 py-4 text-left typo-16-medium text-primary-600 transition-colors hover:bg-gray-50"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-primary-600">
          <IcPlus />
        </span>
        새 그룹 만들기
      </button>
    </DropdownSurface>
  ),
};

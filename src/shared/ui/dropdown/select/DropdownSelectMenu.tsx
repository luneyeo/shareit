"use client";

import type { ReactNode } from "react";
import DropdownMenuBase from "../common/DropdownMenuBase";
import DropdownSelectItem from "./DropdownSelectItem";

export interface DropdownSelectOption {
  /** 선택 비교와 React key에 사용하는 고유 값 */
  value: string;
  /** 항목 제목 */
  label: string;
  /** 제목 아래 보조 설명 (예: "멤버 26명") */
  description?: string;
  /** 개별 항목 비활성화 */
  disabled?: boolean;
}

interface DropdownSelectMenuProps {
  /** 렌더링할 옵션 목록. (백엔드 등에서 받은 리스트 데이터) */
  options: DropdownSelectOption[];
  /** 현재 선택된 옵션의 `value`. 해당 항목에 선택 표시(체크·강조)가 붙습니다. */
  selectedValue?: string;
  /** 옵션 선택 시 호출됩니다. 선택한 옵션의 `value`가 전달됩니다. */
  onSelect: (value: string) => void;
  /** 서피스에 추가할 위치·크기 클래스명 (예: `left-0 top-full mt-2 w-80`) */
  className?: string;
  /** 항목 사이 구분선 표시 여부. 목록형은 기본으로 구분선이 없습니다. */
  divided?: boolean;
  /** 목록 아래에 표시할 푸터 영역. (예: "새 그룹 만들기" 액션 버튼) */
  footer?: ReactNode;
}

/**
 * "select" 성격의 드롭다운 메뉴입니다. (예: 그룹 선택 목록)
 *
 * - `options` 배열을 받아 각 요소를 `DropdownSelectItem`으로 렌더링하는 데이터 기반 메뉴입니다.
 * - 단일 선택 목록으로, `selectedValue`와 일치하는 항목에 선택 표시가 붙습니다.
 * - 항목을 탭하면 해당 `value`로 `onSelect`가 호출되고 메뉴가 닫힙니다.
 * - `footer`로 목록 아래에 "새 그룹 만들기" 같은 별도 액션을 배치할 수 있습니다.
 * - 동작을 실행하는 메뉴가 필요하면 `DropdownActionMenu`를 사용하세요.
 *
 * @example
 * ```tsx
 * <DropdownSelectMenu
 *   className="left-0 top-full mt-2 w-80"
 *   options={groups.map((group) => ({
 *     value: group.id,
 *     label: group.name,
 *     description: `멤버 ${group.memberCount}명`,
 *   }))}
 *   selectedValue={selectedGroupId}
 *   onSelect={setSelectedGroupId}
 * />
 * ```
 */
export default function DropdownSelectMenu({
  options,
  selectedValue,
  onSelect,
  className,
  divided = false,
  footer,
}: DropdownSelectMenuProps) {
  return (
    <DropdownMenuBase className={className} divided={divided} footer={footer}>
      {options.map((option) => (
        <DropdownSelectItem
          key={option.value}
          description={option.description}
          selected={option.value === selectedValue}
          disabled={option.disabled}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </DropdownSelectItem>
      ))}
    </DropdownMenuBase>
  );
}

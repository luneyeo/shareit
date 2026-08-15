"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { useDropdownContext } from "@/shared/ui/dropdown";

interface GroupActionButtonProps {
  /** 아이콘 원 안에 표시할 아이콘 */
  icon: ReactNode;
  /** 버튼 문구 */
  label: string;
  /** 클릭 시 동작. 실행 전 드롭다운이 닫힙니다. */
  onClick?: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/**
 * 그룹 드롭다운 푸터의 액션 버튼입니다. (예: 새 그룹 만들기 / 그룹 입장)
 *
 * 아이콘 원 + 문구로 구성되며, 클릭 시 드롭다운을 닫고 `onClick`을 실행합니다.
 * `useDropdownContext`에 의존하므로 `DropdownProvider` 내부에서만 사용합니다.
 */
export default function GroupActionButton({
  icon,
  label,
  onClick,
  disabled,
}: GroupActionButtonProps) {
  const { close } = useDropdownContext();

  const handleClick = () => {
    close();
    onClick?.();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "group flex w-full items-center gap-3 px-5 py-4",
        "text-left typo-16-medium text-primary-600 transition-colors",
        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"
      )}
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-primary-600 group-disabled:bg-gray-300">
        {icon}
      </span>
      {label}
    </button>
  );
}

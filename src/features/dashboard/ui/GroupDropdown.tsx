"use client";

import { useRouter } from "next/navigation";

import { IcChevronDown } from "@/shared/assets/icons";
import { useListbox } from "@/shared/hooks/useListbox";
import { cn } from "@/shared/utils/cn";
import type { Group } from "@/features/dashboard/types";

interface GroupDropdownProps {
  groups: Group[];
  currentGroupId: string;
}

/**
 * 홈 헤더의 그룹 선택 드롭다운입니다.
 *
 * 현재 그룹명을 제목처럼 노출하고, 선택하면 해당 대시보드로 이동합니다.
 * 열림 상태·키보드·포커스 등 listbox 상호작용은 `useListbox`가 담당합니다.
 *
 * - `groups`: 선택 가능한 그룹 목록
 * - `currentGroupId`: 현재 보고 있는 그룹의 id
 *
 * @example
 * ```tsx
 * <GroupDropdown groups={groups} currentGroupId={dashboardId} />
 * ```
 */
export default function GroupDropdown({ groups, currentGroupId }: GroupDropdownProps) {
  const router = useRouter();
  const currentIndex = groups.findIndex((group) => group.id === currentGroupId);
  const currentGroup = groups[currentIndex];

  const { isOpen, activeIndex, containerRef, triggerProps, listboxProps, getOptionProps } =
    useListbox({
      itemCount: groups.length,
      selectedIndex: currentIndex,
      onSelect: (index) => {
        const group = groups[index];
        if (group && group.id !== currentGroupId) {
          router.push(`/dashboard/${group.id}`);
        }
      },
    });

  return (
    <div ref={containerRef} className="relative">
      <button {...triggerProps} className="flex items-center gap-1">
        <h1 className="typo-20-bold text-gray-900">{currentGroup?.name ?? "그룹 선택"}</h1>
        <IcChevronDown className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <ul
          {...listboxProps}
          className="absolute left-0 top-full z-dropdown mt-2 max-h-72 min-w-40 overflow-auto rounded-xl bg-white py-1 shadow-lg outline-none"
        >
          {groups.map((group, index) => (
            <li
              key={group.id}
              {...getOptionProps(index, group.id === currentGroupId)}
              className={cn(
                "typo-16-medium cursor-pointer px-4 py-2.5 text-gray-800",
                index === activeIndex && "bg-gray-50",
                group.id === currentGroupId && "typo-16-semibold text-gray-900"
              )}
            >
              {group.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

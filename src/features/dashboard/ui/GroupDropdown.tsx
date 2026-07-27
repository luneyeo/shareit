"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { IcChevronDown } from "@/shared/assets/icons";
import { useDismiss } from "@/shared/hooks/useDismiss";
import { cn } from "@/shared/utils/cn";
import type { Group } from "@/features/dashboard/types";

interface GroupDropdownProps {
  groups: Group[];
  currentGroupId: string;
}

/**
 * 홈 헤더의 그룹 선택 드롭다운입니다.
 *
 * 현재 그룹명을 제목처럼 노출하고, 클릭하면 내가 속한 그룹 목록을 펼쳐
 * 다른 그룹으로 이동합니다. 열림 상태와 바깥 클릭 닫기를 자체적으로 관리합니다.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentGroup = groups.find((group) => group.id === currentGroupId);

  useDismiss(containerRef, isOpen, () => setIsOpen(false));

  const handleSelect = (groupId: string) => {
    setIsOpen(false);
    if (groupId !== currentGroupId) {
      router.push(`/dashboard/${groupId}`);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1"
      >
        <span className="typo-20-bold text-gray-900">{currentGroup?.name ?? "그룹 선택"}</span>
        <IcChevronDown className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-10 mt-2 min-w-40 overflow-hidden rounded-xl bg-white py-1 shadow-lg"
        >
          {groups.map((group) => (
            <li key={group.id} role="option" aria-selected={group.id === currentGroupId}>
              <button
                type="button"
                onClick={() => handleSelect(group.id)}
                className={cn(
                  "typo-16-medium w-full px-4 py-2.5 text-left text-gray-800 hover:bg-gray-50",
                  group.id === currentGroupId && "typo-16-semibold text-gray-900"
                )}
              >
                {group.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

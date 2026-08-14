"use client";

import { useRouter } from "next/navigation";

import { IcChevronDown } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";
import {
  DropdownProvider,
  DropdownTrigger,
  DropdownSelectMenu,
  useDropdownContext,
} from "@/shared/ui/dropdown";
import type { Group } from "@/features/dashboard/types";

interface GroupDropdownProps {
  groups: Group[];
  currentGroupId: string;
}
/** 열림 상태에 따라 회전하는 트리거 화살표 아이콘 */
function TriggerChevron() {
  const { isOpen } = useDropdownContext();
  return <IcChevronDown className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />;
}

/**
 * 홈 헤더의 그룹 선택 드롭다운입니다.
 *
 * 현재 그룹명을 제목처럼 노출하고, 선택하면 해당 대시보드로 이동합니다.
 */
export default function GroupDropdown({ groups, currentGroupId }: GroupDropdownProps) {
  const router = useRouter();
  const currentGroup = groups.find((group) => group.id === currentGroupId);

  const handleSelect = (groupId: string) => {
    if (groupId !== currentGroupId) {
      router.push(`/dashboard/${groupId}`);
    }
  };

  return (
    <DropdownProvider>
      <DropdownTrigger className="flex items-center gap-1">
        <h1 className="typo-20-bold text-gray-900">{currentGroup?.name ?? "그룹 선택"}</h1>
        <TriggerChevron />
      </DropdownTrigger>
      <DropdownSelectMenu
        className="left-0 top-full mt-2 min-w-40"
        options={groups.map((group) => ({ value: group.id, label: group.name }))}
        selectedValue={currentGroupId}
        onSelect={handleSelect}
      />
    </DropdownProvider>
  );
}

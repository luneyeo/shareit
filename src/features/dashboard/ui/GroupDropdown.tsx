"use client";

import { useRouter } from "next/navigation";
import { IcChevronDown, IcPlus } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";
import { DropdownProvider, DropdownTrigger, DropdownSelectMenu } from "@/shared/ui/dropdown";
import type { Group } from "@/features/dashboard/types";

interface GroupDropdownProps {
  groups: Group[];
  currentGroupId: string;
}
/** 열림 상태에 따라 회전하는 트리거 화살표 아이콘 */
function TriggerChevron() {
  return <IcChevronDown className={cn("h-6 w-6 text-gray-900")} />;
}

function AddToGroupButton() {
  return (
    <>
      <button
        type="button"
        disabled
        // TODO: 그룹 생성 api 연결
        className={cn(
          "group flex w-full items-center gap-3",
          "border-t border-gray-200 px-5 py-4",
          "text-left typo-16-medium text-primary-600 transition-colors",
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"
        )}
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-primary-600 group-disabled:bg-gray-300">
          <IcPlus />
        </span>
        새 그룹 만들기
      </button>
    </>
  );
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
      <DropdownTrigger className="flex items-center gap-2">
        <h1 className="typo-20-bold text-gray-900">{currentGroup?.name ?? "그룹 선택"}</h1>
        <TriggerChevron />
      </DropdownTrigger>
      <DropdownSelectMenu
        className="left-0 top-full mt-2 min-w-64 p-3.5"
        options={groups.map((group) => ({ value: group.id, label: group.name }))}
        selectedValue={currentGroupId}
        onSelect={handleSelect}
        footer={<AddToGroupButton />}
      />
    </DropdownProvider>
  );
}

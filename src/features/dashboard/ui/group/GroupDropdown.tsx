"use client";

import { useRouter } from "next/navigation";
import { IcChevronDown } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";
import { DropdownProvider, DropdownTrigger, DropdownSelectMenu } from "@/shared/ui/dropdown";
import GroupActionButton from "@/features/dashboard/ui/group/GroupActionButton";
import { useGroupDialog } from "@/features/dashboard/hooks/useGroupDialog";
import type { Group } from "@/features/dashboard/types";

interface GroupDropdownProps {
  groups: Group[];
  currentGroupId: string;
}
/** 열림 상태에 따라 회전하는 트리거 화살표 아이콘 */
function TriggerChevron() {
  return <IcChevronDown className={cn("h-6 w-6")} />;
}

/**
 * 홈 헤더의 그룹 선택 드롭다운입니다.
 *
 * 현재 그룹명을 제목처럼 노출하고, 선택하면 해당 대시보드로 이동합니다.
 * 푸터 버튼으로 그룹 생성/입장 다이얼로그(`useGroupDialog`)를 엽니다.
 */
export default function GroupDropdown({ groups, currentGroupId }: GroupDropdownProps) {
  const router = useRouter();
  const currentGroup = groups.find((group) => group.id === currentGroupId);

  const { openCreate, openJoin, dialogElement } = useGroupDialog();

  const handleSelect = (groupId: string) => {
    if (groupId !== currentGroupId) {
      router.push(`/dashboard/${groupId}`);
    }
  };

  return (
    <>
      <DropdownProvider>
        <DropdownTrigger className="flex items-center gap-2">
          <h1 className="typo-20-bold">{currentGroup?.name ?? "그룹 선택"}</h1>
          <TriggerChevron />
        </DropdownTrigger>
        <DropdownSelectMenu
          className="left-0 top-full mt-2 min-w-64 p-3.5"
          options={groups.map((group) => ({ value: group.id, label: group.name }))}
          selectedValue={currentGroupId}
          onSelect={handleSelect}
          footer={
            <div className="border-t border-gray-200">
              <GroupActionButton label="새 그룹 만들기" onClick={openCreate} />
              <GroupActionButton label="새 그룹 입장하기" onClick={openJoin} />
            </div>
          }
        />
      </DropdownProvider>

      {dialogElement}
    </>
  );
}

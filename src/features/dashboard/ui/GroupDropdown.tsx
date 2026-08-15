"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IcChevronDown, IcPlus } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";
import { DropdownProvider, DropdownTrigger, DropdownSelectMenu } from "@/shared/ui/dropdown";
import OverlayPortal from "@/shared/ui/overlay/OverlayPortal";
import InputDialog from "@/shared/ui/dialog/InputDialog";
import InviteCodeDialog from "@/features/dashboard/ui/InviteCodeDialog";
import GroupActionButton from "@/features/dashboard/ui/GroupActionButton";
import type {
  Group,
  GroupDialogType,
  GroupDialogConfig,
  GroupDialogState,
} from "@/features/dashboard/types";

interface GroupDropdownProps {
  groups: Group[];
  currentGroupId: string;
}
/** 열림 상태에 따라 회전하는 트리거 화살표 아이콘 */
function TriggerChevron() {
  return <IcChevronDown className={cn("h-6 w-6 text-gray-900")} />;
}

/** 다이얼로그 종류별 문구 설정. 키는 `InputDialog` props와 그대로 매칭됩니다. */
const GROUP_DIALOG_CONFIG = {
  create: {
    title: "새 그룹 만들기",
    label: "그룹 이름",
    placeholder: "그룹명을 입력해 주세요",
    confirmText: "생성",
  },
  join: {
    title: "새 그룹 입장하기",
    label: "입장 코드",
    placeholder: "입장 코드를 입력해 주세요",
    confirmText: "입장",
  },
} as const satisfies Record<GroupDialogType, GroupDialogConfig>;

/**
 * 홈 헤더의 그룹 선택 드롭다운입니다.
 *
 * 현재 그룹명을 제목처럼 노출하고, 선택하면 해당 대시보드로 이동합니다.
 */
export default function GroupDropdown({ groups, currentGroupId }: GroupDropdownProps) {
  const router = useRouter();
  const currentGroup = groups.find((group) => group.id === currentGroupId);

  const [dialog, setDialog] = useState<GroupDialogState | null>(null);
  const [value, setValue] = useState("");

  const handleSelect = (groupId: string) => {
    if (groupId !== currentGroupId) {
      router.push(`/dashboard/${groupId}`);
    }
  };

  const openDialog = (type: GroupDialogType) => setDialog({ type, step: "input" });

  const closeDialog = () => {
    setDialog(null);
    setValue("");
  };

  const handleConfirm = () => {
    if (dialog?.step !== "input") return;

    if (dialog.type === "create") {
      // TODO: 그룹 생성 api 연결 후 응답의 초대 코드로 교체
      setDialog({ type: "create", step: "done", inviteCode: "FA7MBG" });
      setValue("");
    } else {
      // TODO: 초대 코드로 그룹 입장 api 연결
      // TODO: 입장 완료 토스트 표시
      closeDialog();
    }
  };

  return (
    <>
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
          footer={
            <div className="border-t border-gray-200">
              <GroupActionButton
                icon={<IcPlus />}
                label="새 그룹 만들기"
                onClick={() => openDialog("create")}
              />
              <GroupActionButton
                icon={<IcPlus />}
                label="새 그룹 입장하기"
                onClick={() => openDialog("join")}
              />
            </div>
          }
        />
      </DropdownProvider>

      {dialog && (
        <OverlayPortal
          ariaLabel={
            dialog.step === "done" ? "그룹이 생성됐어요" : GROUP_DIALOG_CONFIG[dialog.type].title
          }
          onClose={closeDialog}
          surfaceClassName="w-full max-w-xs"
        >
          {dialog.step === "input" ? (
            <InputDialog
              {...GROUP_DIALOG_CONFIG[dialog.type]}
              value={value}
              onChange={setValue}
              onConfirm={handleConfirm}
              onCancel={closeDialog}
            />
          ) : (
            <InviteCodeDialog inviteCode={dialog.inviteCode} onClose={closeDialog} />
          )}
        </OverlayPortal>
      )}
    </>
  );
}

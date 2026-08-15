"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IcChevronDown, IcPlus } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";
import {
  DropdownProvider,
  DropdownTrigger,
  DropdownSelectMenu,
  useDropdownContext,
} from "@/shared/ui/dropdown";
import OverlayPortal from "@/shared/ui/overlay/OverlayPortal";
import InputDialog from "@/shared/ui/dialog/InputDialog";
import InviteCodeDialog from "@/features/dashboard/ui/InviteCodeDialog";
import type { Group } from "@/features/dashboard/types";

interface GroupDropdownProps {
  groups: Group[];
  currentGroupId: string;
}
/** 열림 상태에 따라 회전하는 트리거 화살표 아이콘 */
function TriggerChevron() {
  return <IcChevronDown className={cn("h-6 w-6 text-gray-900")} />;
}

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
 */
function GroupActionButton({ icon, label, onClick, disabled }: GroupActionButtonProps) {
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
        "group flex w-full items-center gap-3",
        " border-gray-200 px-5 py-4",
        "text-left typo-16-medium text-primary-600 transition-colors",
        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-primary-600 group-disabled:bg-gray-300">
        {icon}
      </span>
      {label}
    </button>
  );
}

/** 푸터 액션으로 열 수 있는 입력 다이얼로그 종류 (한 번에 하나만 열림) */
type GroupDialogType = "create" | "join";

/** 다이얼로그 종류별 문구 설정. 키는 `InputDialog` props와 그대로 매칭됩니다. */
const GROUP_DIALOG_CONFIG: Record<
  GroupDialogType,
  { title: string; label: string; placeholder: string; confirmText: string }
> = {
  create: {
    title: "새 그룹 만들기",
    label: "그룹 이름",
    placeholder: "송파구 공주들",
    confirmText: "생성",
  },
  join: {
    title: "그룹 입장",
    label: "초대 코드",
    placeholder: "초대 코드를 입력해 주세요",
    confirmText: "입장",
  },
};

/**
 * 다이얼로그 상태 머신. (한 번에 하나만 열림)
 * - 입력 단계: create·join 공통 `InputDialog`
 * - 완료 단계: create만 초대 코드 모달로 이어짐 (join은 완료 시 토스트)
 */
type DialogState =
  { type: GroupDialogType; step: "input" } | { type: "create"; step: "done"; inviteCode: string };

/**
 * 홈 헤더의 그룹 선택 드롭다운입니다.
 *
 * 현재 그룹명을 제목처럼 노출하고, 선택하면 해당 대시보드로 이동합니다.
 */
export default function GroupDropdown({ groups, currentGroupId }: GroupDropdownProps) {
  const router = useRouter();
  const currentGroup = groups.find((group) => group.id === currentGroupId);

  const [dialog, setDialog] = useState<DialogState | null>(null);
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
            <>
              <GroupActionButton
                icon={<IcPlus />}
                label="새 그룹 만들기"
                onClick={() => openDialog("create")}
              />
              <GroupActionButton
                icon={<IcPlus />}
                label="그룹 입장"
                onClick={() => openDialog("join")}
              />
            </>
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

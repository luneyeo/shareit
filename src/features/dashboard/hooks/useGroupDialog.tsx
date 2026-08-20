"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import OverlayPortal from "@/shared/ui/overlay/OverlayPortal";
import InputDialog from "@/shared/ui/dialog/InputDialog";
import InviteCodeDialog from "@/features/dashboard/ui/InviteCodeDialog";
import { useCreateGroup } from "@/features/dashboard/hooks/useCreateGroup";
import { useJoinGroup } from "@/features/dashboard/hooks/useJoinGroup";
import { useAuthStore } from "@/shared/store/authStore";
import type {
  GroupDialogType,
  GroupDialogConfig,
  GroupDialogState,
} from "@/features/dashboard/types";

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
 * 그룹 생성/입장 다이얼로그의 상태·동작과 오버레이 렌더링을 함께 제공하는 훅.
 *
 * `openCreate`/`openJoin`으로 다이얼로그를 열고, 반환된 `dialogElement`를 렌더 트리에 넣으면
 * 입력 → (생성 시) 초대 코드 안내까지 이어진다. 생성 완료 후 확인 시 해당 그룹으로 이동한다.
 *
 * @example
 * const { openCreate, openJoin, dialogElement } = useGroupDialog();
 * <button onClick={openCreate}>새 그룹 만들기</button>
 * {dialogElement}
 */
export function useGroupDialog() {
  const router = useRouter();
  const userId = useAuthStore((state) => state.user?.id);
  const createGroup = useCreateGroup();
  const joinGroup = useJoinGroup();

  const [dialog, setDialog] = useState<GroupDialogState | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const openCreate = () => {
    setError("");
    setDialog({ type: "create", step: "input" });
  };
  const openJoin = () => {
    setError("");
    setDialog({ type: "join", step: "input" });
  };

  const closeDialog = () => {
    setDialog(null);
    setValue("");
    setError("");
  };

  // 입력을 바꾸면 이전 에러 메시지를 지운다.
  const handleChange = (next: string) => {
    setValue(next);
    if (error) setError("");
  };

  const handleConfirm = () => {
    if (dialog?.step !== "input") return;

    if (dialog.type === "create") {
      if (!userId || createGroup.isPending) return;

      createGroup.mutate(
        { name: value.trim(), userId },
        {
          onSuccess: (group) => {
            setDialog({
              type: "create",
              step: "done",
              inviteCode: group.inviteCode,
              groupId: group.id,
            });
            setValue("");
          },
          // TODO: 토스트 도입 시 전역 알림으로 전환 (생성 실패는 필드 오류가 아니라 시스템 오류)
          onError: () => {
            setError("그룹 생성에 실패했어요. 다시 시도해 주세요.");
          },
        }
      );
    } else {
      if (!userId || joinGroup.isPending) return;

      joinGroup.mutate(
        { inviteCode: value.trim(), userId },
        {
          onSuccess: ({ id }) => {
            // 입장한 그룹 대시보드로 이동한다.
            router.push(`/dashboard/${id}`);
            closeDialog();
          },
          onError: (err) => {
            setError(err instanceof Error ? err.message : "입장에 실패했어요. 다시 시도해 주세요.");
          },
        }
      );
    }
  };

  const dialogElement: ReactNode = dialog ? (
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
          onChange={handleChange}
          error={error}
          onConfirm={handleConfirm}
          onCancel={closeDialog}
        />
      ) : (
        <InviteCodeDialog
          inviteCode={dialog.inviteCode}
          onClose={() => {
            // 확인 시 방금 만든 그룹 대시보드로 이동한다.
            router.push(`/dashboard/${dialog.groupId}`);
            closeDialog();
          }}
        />
      )}
    </OverlayPortal>
  ) : null;

  return { openCreate, openJoin, dialogElement };
}

import type { GroupDetail } from "@/features/mypage/group-detail/types/group";
import DialogBase from "@/shared/ui/dialog/DialogBase";
import OverlayPortal from "@/shared/ui/overlay/OverlayPortal";

type GroupRemoveDialogProps = {
  role: GroupDetail["role"];
  /** 확인(삭제/나가기) 클릭 시 호출됩니다. */
  onConfirm: () => void;
  /** 취소 또는 배경 클릭 시 호출됩니다. */
  onCancel: () => void;
};

const COPY = {
  owner: {
    title: "그룹을 삭제하시겠습니까?",
    description: "그룹 내 모든 정보도 함께 삭제됩니다.",
    confirmText: "삭제",
  },
  member: {
    title: "그룹에서 나가시겠습니까?",
    description: "다시 입장하려면 입장 코드가 필요해요.",
    confirmText: "나가기",
  },
} as const;

/**
 * 그룹 삭제(방장)/나가기(멤버)를 확인하는 다이얼로그입니다.
 *
 * 역할에 따라 제목·안내 문구·확인 버튼 텍스트가 바뀌며, 방장 삭제는 파괴적 동작이므로
 * 확인 버튼을 빨강(`danger`)으로 표시합니다. 오버레이·서피스는 `OverlayPortal`이 담당합니다.
 *
 * @example
 * {isRemoveOpen && (
 *   <GroupRemoveDialog role={role} onConfirm={remove} onCancel={close} />
 * )}
 */
export default function GroupRemoveDialog({ role, onConfirm, onCancel }: GroupRemoveDialogProps) {
  const isOwner = role === "owner";
  const copy = isOwner ? COPY.owner : COPY.member;

  return (
    <OverlayPortal ariaLabel={copy.title} onClose={onCancel} surfaceClassName="w-full max-w-xs">
      <DialogBase
        confirmText={copy.confirmText}
        confirmTheme={isOwner ? "danger" : "primary"}
        onConfirm={onConfirm}
        onCancel={onCancel}
      >
        <div className="flex flex-col gap-1 text-center">
          <h2 className="typo-18-semibold">{copy.title}</h2>
          <p className="typo-16-medium text-gray-600">{copy.description}</p>
        </div>
      </DialogBase>
    </OverlayPortal>
  );
}

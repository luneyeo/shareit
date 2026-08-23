import type { GroupDetail } from "@/features/mypage/group-detail/types/group";
import { IcChevronLeft } from "@/shared/assets/icons";

type GroupManageSectionProps = {
  role: GroupDetail["role"];
  inviteCode: string;
  onEditName: () => void;
  /** 방장이면 그룹 삭제, 멤버이면 그룹 나가기 동작을 연결합니다. */
  onRemove: () => void;
};

/**
 * 그룹 상세 페이지 하단의 그룹 관리 목록입니다.
 *
 * 입장 코드 복사 · 그룹명 수정 · 그룹 삭제(방장)/나가기(멤버)를 제공합니다.
 * 마지막 액션 문구는 역할에 따라 방장은 "그룹 삭제", 멤버는 "그룹 나가기"로 바뀝니다.
 *
 * @example
 * <GroupManageSection
 *   role={role}
 *   inviteCode={inviteCode}
 *   onEditName={editName}
 *   onRemove={removeGroup}
 * />
 */
export default function GroupManageSection({
  role,
  inviteCode,
  onEditName,
  onRemove,
}: GroupManageSectionProps) {
  const isOwner = role === "owner";

  return (
    <section className="px-5">
      <ul className="divide-y divide-gray-200">
        <li className="flex items-center justify-between py-4">
          <span className="typo-16-semibold">입장 코드</span>
          <span className="typo-16-semibold">{inviteCode}</span>
        </li>

        {isOwner && (
          <li>
            <button
              type="button"
              onClick={onEditName}
              className="flex w-full items-center justify-between py-4"
            >
              <span className="typo-16-semibold">그룹명 수정</span>
              <IcChevronLeft className="h-5 w-5 rotate-180 text-gray-400" aria-hidden />
            </button>
          </li>
        )}

        <li>
          <button
            type="button"
            onClick={onRemove}
            className="flex w-full items-center justify-between py-4"
          >
            <span className="typo-16-semibold text-error">
              {isOwner ? "그룹 삭제" : "그룹 나가기"}
            </span>
            <IcChevronLeft className="h-5 w-5 rotate-180 text-gray-400" aria-hidden />
          </button>
        </li>
      </ul>

      {isOwner && (
        <p className="py-3 typo-14-medium text-gray-500">
          방장만 그룹명 수정과 삭제를 할 수 있어요. 삭제하면 공유된 글도 함께 사라져요.
        </p>
      )}
    </section>
  );
}

import Link from "next/link";
import type { MyGroup } from "@/features/mypage/types/group";
import { IcChevronLeft } from "@/shared/assets/icons";

type GroupListItemProps = {
  group: MyGroup;
};

/** 역할별로 카드 하단에 표시할 문구. */
const roleLabel: Record<MyGroup["role"], string> = {
  owner: "내가 만든 그룹",
  member: "참여 중",
};

/**
 * 전체 그룹 목록의 그룹 카드 한 개입니다. 그룹 상세 페이지로 이동하는 링크입니다.
 *
 * 방장(`owner`)이면 이름 옆에 "방장" 배지를 노출합니다.
 *
 * @example
 * <GroupListItem group={group} />
 */
export default function GroupListItem({ group }: GroupListItemProps) {
  return (
    <Link
      href={`/mypage/groups/${group.id}`}
      className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4"
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="typo-16-bold">{group.name}</span>
          {group.role === "owner" && (
            <span className="border border-primary-200 bg-primary-100 rounded-xl px-1.5 py-0.5 typo-12-bold text-primary-600">
              방장
            </span>
          )}
        </div>
        <span className="typo-14-medium text-gray-500">
          멤버 {group.memberCount}명 · {roleLabel[group.role]}
        </span>
      </div>
      <IcChevronLeft className="h-5 w-5 shrink-0 rotate-180" aria-hidden />
    </Link>
  );
}

import type { GroupRole } from "@/features/mypage/types/group";

/** 전체 그룹 목록 상단 필터 탭 값. "all"은 전체, 나머지는 역할과 동일하다. */
export type GroupFilter = "all" | GroupRole;

/** 필터 탭의 노출 순서와 라벨. */
export const GROUP_FILTERS: { value: GroupFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "owner", label: "내가 만든" },
  { value: "member", label: "참여 중" },
];

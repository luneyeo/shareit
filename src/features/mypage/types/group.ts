/** 마이페이지 그룹 목록에서 사용자의 그룹 내 역할. */
export type GroupRole = "owner" | "member";

/** 마이페이지 "전체 그룹 목록" 항목. */
export interface MyGroup {
  id: string;
  name: string;
  memberCount: number;
  role: GroupRole;
}

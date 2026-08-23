export interface Group {
  id: string;
  name: string;
}

/** group_members.role 값. 그룹 내 사용자의 역할. */
export type GroupRole = "owner" | "member";

/** 현재 사용자의 그룹 내 역할을 포함한 그룹. */
export interface GroupWithRole extends Group {
  role: GroupRole;
}

/** 마이페이지 그룹 목록 항목. 역할과 전체 멤버 수를 포함한다. */
export interface MyGroupSummary extends GroupWithRole {
  memberCount: number;
}

/** 그룹 생성 응답. DB에서 발급된 초대 코드를 포함한다. */
export interface CreatedGroup extends Group {
  inviteCode: string;
}

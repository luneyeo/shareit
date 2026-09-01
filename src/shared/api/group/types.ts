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

/** 그룹 상세 화면용. 역할·개설일·전체 멤버 수·상품 수·입장 코드를 포함한다. */
export interface GroupDetailSummary extends GroupWithRole {
  /** 그룹 개설일 (groups.created_at, ISO 8601 문자열). */
  openedAt: string;
  memberCount: number;
  /** 그룹에 공유된 상품 수 (groups.product_count). */
  productCount: number;
  /** 그룹 입장 코드 (groups.invite_code). */
  inviteCode: string;
}

/** 그룹 생성 응답. DB에서 발급된 초대 코드를 포함한다. */
export interface CreatedGroup extends Group {
  inviteCode: string;
}

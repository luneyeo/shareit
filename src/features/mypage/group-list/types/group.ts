import type { GroupRole } from "@/shared/api/group/types";

export type { GroupRole };

/** 마이페이지 "전체 그룹 목록" 항목. */
export interface MyGroup {
  id: string;
  name: string;
  role: GroupRole;
  memberCount: number;
}

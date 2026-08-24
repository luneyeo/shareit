import type { GroupRole } from "@/shared/api/group/types";
export type { GroupRole };

/** 마이페이지 "그룹 상세" 페이지가 표시하는 그룹 정보. */
export interface GroupDetail {
  id: string;
  name: string;
  role: GroupRole;
  /** 그룹 개설일 (ISO 8601 날짜 문자열). */
  openedAt: string;
  memberCount: number;
  /** 그룹 입장 코드. */
  inviteCode: string;
  /** 그룹에 공유된 글 수. */
  postCount: number;
  /** 그룹에서 좋아요한 수. */
  likedCount: number;
}

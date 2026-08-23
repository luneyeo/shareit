import type { MyGroup } from "@/features/mypage/types/group";

// TODO: 실제 그룹 목록 조회 API 연결 시 제거. 화면 구현용 임시 데이터.
export const MOCK_GROUPS: MyGroup[] = [
  { id: "1", name: "송파구 공주들", memberCount: 128, role: "owner" },
  { id: "2", name: "벅뚜벅뚜", memberCount: 84, role: "member" },
  { id: "3", name: "마포 언니들", memberCount: 56, role: "owner" },
  { id: "4", name: "여의도 직장인 모임", memberCount: 41, role: "member" },
];

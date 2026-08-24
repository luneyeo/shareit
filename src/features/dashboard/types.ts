export type { Group } from "@/shared/api/group/types";

export interface ProductDetail {
  id: string;
  brandName: string | null;
  prdName: string;
  price: number | null;
  description: string | null;
  imageUrl: string[] | null;
  tag: string[] | null;
  category: string | null;
  userId: string;
  groupId: string[] | null;
  created_at: string;
}

/** 그룹 입력 다이얼로그 종류 (한 번에 하나만 열림). create·join은 그룹 드롭다운, edit는 그룹 상세에서 연다. */
export type GroupDialogType = "create" | "join" | "edit";

/** 다이얼로그 종류별 문구 설정 형태. 키는 `InputDialog` props와 그대로 매칭됩니다. */
export type GroupDialogConfig = {
  title: string;
  label: string;
  placeholder: string;
  confirmText: string;
};

/**
 * 그룹 다이얼로그 상태 머신. (한 번에 하나만 열림)
 * - 입력 단계: create·join·edit 공통 `InputDialog` (edit는 대상 groupId를 함께 가진다)
 * - 완료 단계: create만 초대 코드 모달로 이어짐 (join은 완료 시 토스트)
 */
export type GroupDialogState =
  | { type: "create" | "join"; step: "input" }
  | { type: "edit"; step: "input"; groupId: string }
  | { type: "create"; step: "done"; inviteCode: string; groupId: string };

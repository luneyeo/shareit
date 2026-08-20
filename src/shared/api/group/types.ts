export interface Group {
  id: string;
  name: string;
}

/** 그룹 생성 응답. DB에서 발급된 초대 코드를 포함한다. */
export interface CreatedGroup extends Group {
  inviteCode: string;
}

import { createClient } from "@/shared/lib/supabase/client";

/**
 * 무효한 입장 코드(해당 그룹 없음)를 나타내는 에러.
 *
 * 네트워크·DB 등 시스템 오류와 구분하기 위한 표식이다.
 * 호출부는 이 에러를 필드 검증(입력값을 고쳐야 해소)으로, 그 외 오류는 시스템 오류로 다룬다.
 */
export class InvalidInviteCodeError extends Error {
  constructor(message = "입장 코드를 다시 확인해 주세요") {
    super(message);
    this.name = "InvalidInviteCodeError";
  }
}

/**
 * 입장 코드로 그룹에 멤버로 입장한다. (원자적·멱등)
 *
 * 코드 조회와 멤버십 등록을 PostgreSQL 함수(`join_group_by_code`)로 묶어 `supabase.rpc`로 호출한다.
 * 함수는 INSERT ... ON CONFLICT DO NOTHING으로 등록하므로, 동시 요청이나 이미 속한 그룹이어도
 * 중복 행 없이 항상 같은 결과(그룹 id)를 반환한다. 사용자는 함수 내부 auth.uid()로 결정된다.
 *
 * - 조회/등록 실패(error) → 시스템 오류로 일반 Error를 throw.
 * - 잘못된 코드(빈 결과) → `InvalidInviteCodeError`를 throw.
 *
 * @param inviteCode 입장 코드
 * @returns 입장한 그룹 id
 */
export async function joinGroup(inviteCode: string): Promise<{ id: string }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc("join_group_by_code", { invite_code: inviteCode })
    .maybeSingle();

  // 조회 자체가 실패했으면(네트워크·DB 오류) 성공으로 오인하지 않고 중단한다.
  if (error) throw new Error("입장에 실패했어요. 다시 시도해 주세요.");
  // 빈 결과 = 코드에 해당하는 그룹 없음.
  if (!data) throw new InvalidInviteCodeError();

  // groups.id는 bigint라 런타임에 number로 오므로, 앱의 문자열 id 모델에 맞춰 String으로 정규화한다.
  const group = data as { id: number };
  return { id: String(group.id) };
}

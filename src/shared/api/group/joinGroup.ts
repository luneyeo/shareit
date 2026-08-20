import { createClient } from "@/shared/lib/supabase/client";

/**
 * 입장 코드로 그룹에 멤버로 입장한다. (원자적·멱등)
 *
 * 코드 조회와 멤버십 등록을 PostgreSQL 함수(`join_group_by_code`)로 묶어 `supabase.rpc`로 호출한다.
 * 함수는 INSERT ... ON CONFLICT DO NOTHING으로 등록하므로, 동시 요청이나 이미 속한 그룹이어도
 * 중복 행 없이 항상 같은 결과(그룹 id)를 반환한다. 사용자는 함수 내부 auth.uid()로 결정된다.
 *
 * - 조회/등록 실패(error) → 일반 실패 메시지로 throw.
 * - 잘못된 코드(빈 결과) → '입장 코드를 다시 확인해 주세요'로 throw.
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
  if (!data) throw new Error("입장 코드를 다시 확인해 주세요");

  const group = data as { id: string };
  return { id: group.id };
}

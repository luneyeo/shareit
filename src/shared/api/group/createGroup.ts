import { createClient } from "@/shared/lib/supabase/client";
import type { CreatedGroup } from "./types";

/**
 * 그룹을 생성하고, 생성자를 owner로 group_members에 자동 등록한다.
 *
 * groups insert와 group_members insert를 PostgreSQL 함수(`create_group_with_owner`)로 묶어
 * `supabase.rpc`로 호출한다. 함수 본문은 단일 트랜잭션이라 둘 중 하나라도 실패하면 전체가
 * 롤백되어, 멤버십 없이 그룹 행만 남는 고아 그룹이 생기지 않는다.
 * owner는 함수 내부의 auth.uid()로 결정되므로 클라이언트가 userId를 넘기지 않는다.
 *
 * 실패 시 에러를 throw해 mutation의 onError/isError로 처리할 수 있게 한다.
 *
 * @param name 그룹 이름
 * @returns 생성된 그룹 (DB에서 발급된 초대 코드 포함)
 */
export async function createGroup(name: string): Promise<CreatedGroup> {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc("create_group_with_owner", { group_name: name })
    .single();

  if (error) throw error;

  // DB 제네릭 타입이 없어 rpc 결과가 unknown이므로 반환 행 형태를 명시한다.
  const group = data as { id: string; name: string; invite_code: string };

  return { id: group.id, name: group.name, inviteCode: group.invite_code };
}

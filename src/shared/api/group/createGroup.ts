import { createClient } from "@/shared/lib/supabase/client";
import type { CreatedGroup } from "./types";

/**
 * 그룹을 생성하고, 생성자를 owner로 group_members에 자동 추가한다.
 *
 * 1) `groups`에 그룹을 insert하고 생성된 행(초대 코드 포함)을 반환받는다.
 * 2) 생성자를 해당 그룹의 owner 멤버로 등록한다.
 *
 * 두 단계 중 하나라도 실패하면 에러를 throw한다.
 * (react-query의 mutation에서 onError/isError로 처리할 수 있도록 null 반환 대신 throw한다.)
 *
 * @param name 그룹 이름
 * @param userId 생성자(=owner) 유저 id
 * @returns 생성된 그룹 (DB에서 발급된 초대 코드 포함)
 */
export async function createGroup(name: string, userId: string): Promise<CreatedGroup> {
  const supabase = createClient();

  // 1단계: 그룹 생성 (insert 후 생성된 행을 받기 위해 select().single())
  // invite_code는 DB에서 자동 발급되므로 select()로 함께 받아온다.
  const { data: group, error } = await supabase
    .from("groups")
    .insert({ name, owner_id: userId })
    .select()
    .single();

  if (error) throw error;

  // 2단계: 생성자를 group_members에 owner로 추가
  const { error: memberError } = await supabase
    .from("group_members")
    .insert({ group_id: group.id, user_id: userId, role: "owner" });

  if (memberError) throw memberError;

  return { id: group.id, name: group.name, inviteCode: group.invite_code };
}

import { createClient } from "@/shared/lib/supabase/client";

/**
 * 입장 코드로 그룹을 찾아 사용자를 멤버로 추가한다.
 *
 * 1) invite_code로 그룹을 찾고(없으면 잘못된 코드),
 * 2) 이미 속한 그룹이면 중복 등록 없이 그대로 통과시키고,
 * 3) 아니면 group_members에 member로 등록한다.
 *
 * 실패 시 에러를 throw해 mutation의 onError/isError로 처리할 수 있게 한다.
 *
 * @param inviteCode 입장 코드
 * @param userId 입장할 유저 id
 * @returns 입장한 그룹 id
 */
export async function joinGroup(inviteCode: string, userId: string): Promise<{ id: string }> {
  const supabase = createClient();

  // 1단계: 코드로 그룹 찾기
  const { data: group, error: findError } = await supabase
    .from("groups")
    .select("id")
    .eq("invite_code", inviteCode)
    .single();

  if (findError || !group) throw new Error("입장 코드를 다시 확인해 주세요");

  // 2단계: 이미 속한 그룹이면 중복 등록 없이 그대로 통과시킨다.
  const { data: existing } = await supabase
    .from("group_members")
    .select("group_id")
    .eq("group_id", group.id)
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return { id: group.id };

  // 3단계: group_members에 member로 추가
  const { error: joinError } = await supabase
    .from("group_members")
    .insert({ group_id: group.id, user_id: userId, role: "member" });

  // 원본 DB 에러 메시지가 입력창에 그대로 노출되지 않도록 친화적 메시지로 감싼다.
  if (joinError) throw new Error("입장에 실패했어요. 다시 시도해 주세요.");

  return { id: group.id };
}

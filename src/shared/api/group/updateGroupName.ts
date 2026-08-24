import { createClient } from "@/shared/lib/supabase/client";

/**
 * 그룹 이름을 수정한다.
 *
 * groups.name을 갱신하며, 방장만 수정 가능하도록 하는 권한 제어는 RLS 정책에 위임한다.
 * 실패 시 에러를 throw해 mutation의 onError/isError로 처리할 수 있게 한다.
 *
 * RLS로 대상 행이 제외되거나 groupId가 잘못되면 update가 오류 없이 0행을 갱신하므로,
 * 수정된 행을 돌려받아(maybeSingle) 없으면 실패로 처리한다.
 *
 * @param groupId 수정할 그룹 id
 * @param name 새 그룹 이름
 */
export async function updateGroupName(groupId: string, name: string): Promise<void> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("groups")
    .update({ name })
    .eq("id", groupId)
    .select("id")
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("그룹 이름을 수정할 수 없어요");
}

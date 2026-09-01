import { createClient } from "@/shared/lib/supabase/client";

/**
 * 그룹을 삭제한다.
 *
 * groups 행을 삭제하며, 방장만 삭제 가능하도록 하는 권한 제어는 RLS 정책에 위임한다.
 * 그룹에 연결된 group_members·products는 FK의 ON DELETE CASCADE로 함께 정리된다.
 *
 * RLS로 대상 행이 제외되거나 groupId가 잘못되면 delete가 오류 없이 0행을 삭제하므로,
 * 삭제된 행을 돌려받아(select) 없으면 실패로 처리한다.
 *
 * @param groupId 삭제할 그룹 id
 */
export async function deleteGroup(groupId: string): Promise<void> {
  const supabase = createClient();

  const { data, error } = await supabase.from("groups").delete().eq("id", groupId).select("id");

  if (error) throw error;
  if (!data?.length) throw new Error("그룹을 삭제할 권한이 없거나 대상이 존재하지 않습니다.");
}

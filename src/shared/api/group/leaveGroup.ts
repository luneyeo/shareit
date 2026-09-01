import { createClient } from "@/shared/lib/supabase/client";

/**
 * 그룹에서 나간다. (본인 멤버십 행 삭제)
 *
 * group_members에서 (group_id, user_id) 행을 삭제한다. 본인 행만 삭제 가능하도록 하는
 * 권한 제어는 RLS 정책에 위임한다. groups.member_count는 삭제 트리거로 함께 감소한다.
 *
 * RLS로 대상 행이 제외되거나 값이 잘못되면 delete가 오류 없이 0행을 삭제하므로,
 * 삭제된 행을 돌려받아(select) 없으면 실패로 처리한다.
 *
 * @param groupId 나갈 그룹 id
 * @param userId 나가는 사용자 id
 */
export async function leaveGroup(groupId: string, userId: string): Promise<void> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", userId)
    .select("user_id");

  if (error) throw error;
  if (!data?.length) throw new Error("그룹에서 나갈 수 없거나 대상이 존재하지 않습니다.");
}

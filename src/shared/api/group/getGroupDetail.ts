import { createClient } from "@/shared/lib/supabase/client";
import type { GroupDetailSummary, GroupRole } from "./types";

/** groups에 중첩 조회한 group_members(count) 집계 결과를 더한 형태. */
type GroupRow = {
  id: string;
  name: string;
  created_at: string;
  group_members: { count: number }[];
};

/**
 * userId가 속한 특정 그룹의 상세 정보를 역할·개설일·멤버 수와 함께 조회한다.
 *
 * group_members에서 (user_id, group_id) 멤버십 행을 찾고, 그 행의 role과 연결된
 * groups(id, name, created_at), 그리고 그룹별 전체 멤버 수(group_members(count))를 가져온다.
 * 멤버십 행이 없으면(속하지 않은/존재하지 않는 그룹) 에러를 throw한다.
 */
export async function getGroupDetail(groupId: string, userId: string): Promise<GroupDetailSummary> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("group_members")
    .select("role, groups(id, name, created_at, group_members(count))")
    .eq("user_id", userId)
    .eq("group_id", groupId)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("그룹을 찾을 수 없어요");

  // group_members → groups는 to-one 관계라 런타임에선 단일 객체지만,
  // DB 제네릭 타입이 없어 Supabase가 배열로 추론하므로 단언으로 맞춘다.
  const group = data.groups as unknown as GroupRow | null;
  if (!group) throw new Error("그룹을 찾을 수 없어요");

  return {
    id: group.id,
    name: group.name,
    role: data.role as GroupRole,
    openedAt: group.created_at,
    memberCount: group.group_members[0]?.count ?? 0,
  };
}

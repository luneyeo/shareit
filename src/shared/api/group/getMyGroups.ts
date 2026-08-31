import { createClient } from "@/shared/lib/supabase/client";
import type { Group, MyGroupSummary } from "./types";

/** groups에 중첩 조회한 group_members(count) 집계 결과를 더한 형태. */
type GroupRow = Group & { group_members: { count: number }[] };

/**
 * userId가 멤버로 속한 그룹 목록을 역할·멤버 수와 함께 조회한다.
 *
 * group_members에서 해당 유저의 멤버십 행을 찾고, 그 행의 role과 연결된
 * groups(id, name), 그리고 그룹별 전체 멤버 수(group_members(count))를 가져온다.
 */
export async function getMyGroups(userId: string): Promise<MyGroupSummary[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("group_members")
    // groups.id는 bigint라 JSON number 정밀도 한계가 있어, PostgREST 캐스트(id::text)로 문자열로 받는다.
    .select("role, groups(id::text, name, group_members(count))")
    .eq("user_id", userId);

  if (error) throw error;

  return (data ?? [])
    .map((row) => {
      // group_members → groups는 to-one 관계라 런타임에선 단일 객체지만,
      // DB 제네릭 타입이 없어 Supabase가 배열로 추론하므로 단언으로 맞춘다.
      const group = row.groups as unknown as GroupRow | null;
      if (!group) return null;
      return {
        // id는 위 select의 id::text로 이미 문자열이라 변환 없이 그대로 사용한다.
        id: group.id,
        name: group.name,
        role: row.role as MyGroupSummary["role"],
        memberCount: group.group_members[0]?.count ?? 0,
      };
    })
    .filter((group): group is MyGroupSummary => group !== null);
}

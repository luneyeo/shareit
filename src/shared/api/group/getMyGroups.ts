import { createClient } from "@/shared/lib/supabase/client";
import type { Group } from "./types";

/**
 * userId가 멤버로 속한 그룹 목록을 조회한다.
 *
 * group_members에서 해당 유저의 멤버십 행을 찾고, 연결된 groups(id, name)를 가져온다.
 */
export async function getMyGroups(userId: string): Promise<Group[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("group_members")
    .select("groups(id, name)")
    .eq("user_id", userId);

  if (error) throw error;

  // group_members → groups는 to-one 관계라 런타임에선 단일 객체지만,
  // DB 제네릭 타입이 없어 Supabase가 배열로 추론하므로 단언으로 맞춘다.
  return (data ?? [])
    .map((row) => row.groups as unknown as Group | null)
    .filter((group): group is Group => group !== null);
}

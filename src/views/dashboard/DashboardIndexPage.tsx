import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import GroupEmptyState from "@/features/dashboard/ui/group/GroupEmptyState";

/**
 * 대시보드 인덱스 페이지(`/dashboard`).
 *
 * 속한 그룹이 있으면 첫 그룹 대시보드(`/dashboard/{groupId}`)로 리다이렉트하고,
 * 없으면 EmptyState를 보여준다. 서버에서 판단해 로딩 플래시 없이 진입한다.
 */
export async function DashboardIndexPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // 미들웨어가 인증을 보장하지만, user 타입을 좁히기 위해 방어한다.
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", user.id)
    .limit(1);

  // 조회 실패를 '그룹 없음(EmptyState)'으로 오인하지 않도록 에러 바운더리(error.tsx)로 전달한다.
  if (error) throw error;

  const firstGroupId = data?.[0]?.group_id;
  if (firstGroupId) redirect(`/dashboard/${firstGroupId}`);

  return <GroupEmptyState />;
}

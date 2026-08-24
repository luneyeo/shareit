import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import GroupEmptyState from "@/features/dashboard/ui/group/GroupEmptyState";

/**
 * 대시보드 인덱스 페이지(`/dashboard`).
 *
 * 속한 그룹이 있으면 첫 그룹 대시보드(`/dashboard/{groupId}`)로 리다이렉트하고,
 * 없으면 EmptyState를 보여준다. 서버에서 판단해 로딩 플래시 없이 진입한다.
 *
 * 초대 코드 입장 실패(`joinError`) 파라미터는 리다이렉트 시에도 보존해,
 * 기존 그룹이 있는 사용자도 최종 대시보드에서 안내를 볼 수 있게 한다.
 */
export async function DashboardIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ joinError?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // 미들웨어가 인증을 보장하지만, user 타입을 좁히기 위해 방어한다.
  if (!user) redirect("/auth");

  const { data, error } = await supabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", user.id)
    .limit(1);

  // 조회 실패를 '그룹 없음(EmptyState)'으로 오인하지 않도록 에러 바운더리(error.tsx)로 전달한다.
  if (error) throw error;

  const { joinError } = await searchParams;
  const firstGroupId = data?.[0]?.group_id;
  if (firstGroupId) {
    const query = joinError ? `?joinError=${joinError}` : "";
    redirect(`/dashboard/${firstGroupId}${query}`);
  }

  // GroupEmptyState는 useSearchParams(joinError)를 읽으므로 Suspense 경계로 감싼다.
  return (
    <Suspense>
      <GroupEmptyState />
    </Suspense>
  );
}

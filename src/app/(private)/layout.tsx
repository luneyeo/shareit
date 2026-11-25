import { AuthProvider } from "@/shared/providers/AuthProvider";
import { createClient } from "@/shared/lib/supabase/server";

/**
 * 로그인이 필요한 페이지 그룹의 레이아웃.
 *
 * 서버에서 세션을 읽어 `AuthProvider`에 전달합니다.
 * 쿠키를 읽으면 동적 렌더링이 되므로, 공개 페이지(랜딩·데모)를 정적으로 생성할 수 있도록
 * 루트 레이아웃이 아닌 이 그룹에서만 조회합니다.
 */
export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthProvider initialUser={session?.user ?? null}>{children}</AuthProvider>;
}

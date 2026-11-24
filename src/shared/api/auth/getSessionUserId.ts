import { createClient } from "@/shared/lib/supabase/client";

/**
 * 현재 세션의 사용자 id를 반환한다. 비로그인 상태면 `null`을 반환한다.
 *
 * authStore는 (private) 페이지에서만 채워지므로, 공개 페이지에서 로그인 여부가 필요할 때 사용한다.
 */
export async function getSessionUserId(): Promise<string | null> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user.id ?? null;
}

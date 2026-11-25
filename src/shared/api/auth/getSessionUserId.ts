import { createClient } from "@/shared/lib/supabase/client";

/**
 * 현재 세션의 사용자 id를 반환한다. 비로그인 상태면 `userId`가 `null`이다.
 *
 * 만료된 세션의 갱신에 실패하면 `session`이 `null`이면서 `error`가 함께 오므로,
 * 호출부가 비로그인과 구분할 수 있도록 `error`를 반환한다.
 *
 * authStore는 (private) 페이지에서만 채워지므로, 공개 페이지에서 로그인 여부가 필요할 때 사용한다.
 */
export async function getSessionUserId() {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return { userId: session?.user.id ?? null, error };
}

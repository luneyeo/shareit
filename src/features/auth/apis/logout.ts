import { createClient } from "@/shared/lib/supabase/client";

/**
 * 현재 세션을 로그아웃한다.
 *
 * Supabase의 signOut으로 세션 쿠키를 제거하며,
 * onAuthStateChange가 발동해 authStore도 로그아웃 상태로 동기화된다.
 */
export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  return { error };
}

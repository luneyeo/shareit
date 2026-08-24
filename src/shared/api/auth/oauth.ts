import { createClient } from "@/shared/lib/supabase/client";

/**
 * 카카오 OAuth 로그인/회원가입을 시작한다.
 *
 * Supabase의 signInWithOAuth로 카카오 인증 페이지로 이동시키고,
 * 인증 완료 후 `/api/auth`에서 세션 교환(exchangeCodeForSession)을 처리한다.
 *
 * 초대 코드를 넘기면 `redirectTo`의 `invite` 파라미터로 로그인 왕복 뒤까지 이어지며,
 * 콜백에서 해당 그룹에 바로 입장시킨다. (그룹 입장은 로그인 세션이 필요하기 때문)
 *
 * 시작에 실패한 경우 호출부에서 오류를 처리할 수 있도록 error를 반환한다.
 */
export async function signInWithKakao(inviteCode?: string) {
  const supabase = createClient();

  const redirectTo = new URL("/api/auth", window.location.origin);
  const trimmedCode = inviteCode?.trim();
  if (trimmedCode) redirectTo.searchParams.set("invite", trimmedCode);

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: redirectTo.toString(),
      scopes: "profile_nickname profile_image",
    },
  });

  return { error };
}

/**
 * 현재 세션을 로그아웃한다.
 *
 * Supabase의 signOut으로 세션 쿠키를 제거하며,
 * onAuthStateChange가 발동해 authStore도 로그아웃 상태로 동기화된다.
 */
export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  return { error };
}

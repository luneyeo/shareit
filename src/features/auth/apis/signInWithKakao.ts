import { createClient } from "@/shared/lib/supabase/client";

/**
 * 카카오 OAuth 로그인/회원가입을 시작한다.
 *
 * Supabase의 signInWithOAuth로 카카오 인증 페이지로 이동시키고,
 * 인증 완료 후 `/api/auth`에서 세션 교환(exchangeCodeForSession)을 처리한다.
 *
 * 시작에 실패한 경우 호출부에서 오류를 처리할 수 있도록 error를 반환한다.
 */
export async function signInWithKakao() {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${window.location.origin}/api/auth`,
      scopes: "profile_nickname profile_image",
    },
  });

  return { error };
}

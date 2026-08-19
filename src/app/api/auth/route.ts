import { NextResponse } from "next/server";
import type { User, SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/shared/lib/supabase/server";

/**
 * users 테이블에 프로필을 저장한다. (이미 있으면 갱신)
 *
 * 카카오 계정 정보(user_metadata)에서 닉네임·프로필 이미지를 꺼내
 * 인증 사용자와 동일한 id로 upsert한다.
 */
async function saveUserProfile(supabase: SupabaseClient, user: User) {
  const kakao = user.user_metadata;
  const { error } = await supabase.from("users").upsert({
    id: user.id,
    email: user.email ?? null,
    nickname: kakao.name || kakao.preferred_username || "사용자",
    profile_image_url: kakao.avatar_url || kakao.picture || null,
  });

  if (error) console.error("프로필 저장 에러:", error.message);
}

/**
 * 카카오 OAuth 인증 후 리다이렉트되는 콜백 라우트.
 *
 * 전달받은 인증 코드를 세션으로 교환(exchangeCodeForSession)한 뒤,
 * 인증 사용자 정보를 users 테이블에 저장하고 홈으로 이동시킨다.
 * 코드가 없거나 교환에 실패하면 로그인 페이지로 되돌린다.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      await saveUserProfile(supabase, data.user);
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}

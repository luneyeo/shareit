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
 * 초대 코드로 그룹에 입장시키고 그룹 id를 반환한다. 무효 코드/실패면 null.
 *
 * `join_group_by_code`는 내부 auth.uid()로 사용자를 결정하므로,
 * 세션 교환이 끝난 뒤 같은 서버 클라이언트로 호출해야 한다.
 */
async function joinGroupByInvite(supabase: SupabaseClient, inviteCode: string) {
  const { data, error } = await supabase
    .rpc("join_group_by_code", { invite_code: inviteCode.trim() })
    .maybeSingle();

  if (error || !data) return null;
  return (data as { id: string }).id;
}

/**
 * 카카오 OAuth 인증 후 리다이렉트되는 콜백 라우트.
 *
 * 전달받은 인증 코드를 세션으로 교환(exchangeCodeForSession)한 뒤,
 * 인증 사용자 정보를 users 테이블에 저장하고 대시보드로 이동시킨다.
 *
 * `invite` 파라미터(랜딩에서 입력한 초대 코드)가 있으면 해당 그룹에 바로 입장시켜
 * 그룹 대시보드로 보낸다. 코드가 무효하면 로그인은 유지한 채 대시보드로 보내되
 * `joinError`로 안내한다.
 *
 * 코드가 없거나 교환에 실패하면 로그인 페이지로 되돌린다.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const invite = searchParams.get("invite");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      await saveUserProfile(supabase, data.user);

      if (invite) {
        const groupId = await joinGroupByInvite(supabase, invite);
        if (groupId) return NextResponse.redirect(`${origin}/dashboard/${groupId}`);
        // TODO: 토스트 도입 후 실패 안내를 전역 토스트로 전환하고, 그룹 보유 사용자(리다이렉트되는 경우)에게도 노출되도록 joinError 처리 범위 확대
        return NextResponse.redirect(`${origin}/dashboard?joinError=1`);
      }

      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  return NextResponse.redirect(`${origin}/auth?error=auth`);
}

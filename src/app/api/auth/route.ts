import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";

/**
 * 카카오 OAuth 인증 후 리다이렉트되는 콜백 라우트.
 *
 * 전달받은 인증 코드를 세션으로 교환(exchangeCodeForSession)한 뒤 홈으로 이동시킨다.
 * 코드가 없거나 교환에 실패하면 로그인 페이지로 되돌린다.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}

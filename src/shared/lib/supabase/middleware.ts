import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * 미들웨어에서 Supabase 세션을 갱신한다.
 * 만료된 액세스 토큰을 리프레시하고, 갱신된 세션 쿠키를 요청·응답 양쪽에 반영한다.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getClaims() 호출로 토큰을 검증·갱신한다.
  // 이 사이에 다른 로직을 넣으면 세션 동기화가 깨질 수 있으니 주의한다.
  await supabase.auth.getClaims();

  return supabaseResponse;
}

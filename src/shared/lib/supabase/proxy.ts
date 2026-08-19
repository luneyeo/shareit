import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// (private) 라우트 그룹은 URL에 드러나지 않으므로, 해당 그룹이 만들어내는 실제 경로로 판별한다.
const PRIVATE_ROUTES = ["/dashboard", "/mypage"];

/**
 * 미들웨어에서 Supabase 세션을 갱신한다.
 * 만료된 액세스 토큰을 리프레시하고, 갱신된 세션 쿠키를 요청·응답 양쪽에 반영한다.
 * 세션이 없는 상태로 (private) 경로에 접근하면 /login으로 리다이렉트한다.
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
  const { data } = await supabase.auth.getClaims();

  const isPrivateRoute = PRIVATE_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route));

  // 세션이 없는데 보호된 경로에 접근하면 로그인 페이지로 보낸다.
  if (!data?.claims && isPrivateRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

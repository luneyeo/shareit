import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// (private) 라우트 그룹은 URL에 드러나지 않으므로, 해당 그룹이 만들어내는 실제 경로로 판별한다.
const PRIVATE_ROUTES = ["/dashboard", "/mypage"];
// 로그인된 사용자는 접근할 필요가 없는 인증 경로.
const AUTH_ROUTES = ["/auth"];

// 정확히 일치하거나 "/" 하위 경로일 때만 매칭한다.
// (startsWith만 쓰면 "/dashboard"가 "/dashboard-settings"까지 잡는다.)
const matchesRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

/**
 * 미들웨어에서 Supabase 세션을 갱신한다.
 * 만료된 액세스 토큰을 리프레시하고, 갱신된 세션 쿠키를 요청·응답 양쪽에 반영한다.
 * 세션이 없는 상태로 (private) 경로에 접근하면 /auth로,
 * 세션이 있는 상태로 인증 경로(/auth)에 접근하면 /dashboard로 리다이렉트한다.
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

  const { pathname } = request.nextUrl;
  const isPrivateRoute = PRIVATE_ROUTES.some((route) => matchesRoute(pathname, route));
  const isAuthRoute = AUTH_ROUTES.some((route) => matchesRoute(pathname, route));

  // 리다이렉트 응답에도 supabaseResponse에 기록된 갱신 세션 쿠키를 복사한다.
  // 복사하지 않으면 새 redirect 응답으로 인해 갱신된 쿠키가 브라우저에 전달되지 않는다.
  const redirectTo = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    const response = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
    return response;
  };

  // 세션이 없는데 보호된 경로에 접근하면 인증 페이지로 보낸다.
  if (!data?.claims && isPrivateRoute) {
    return redirectTo("/auth");
  }

  // 세션이 있는데 인증 경로에 접근하면 대시보드로 보낸다.
  if (data?.claims && isAuthRoute) {
    return redirectTo("/dashboard");
  }

  return supabaseResponse;
}

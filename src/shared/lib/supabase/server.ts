import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * 서버 컴포넌트·서버 액션·라우트 핸들러에서 사용하는 Supabase 서버 클라이언트를 생성한다.
 * Next.js의 쿠키 스토어와 연동해 요청 단위로 세션을 읽고 갱신한다.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서 호출된 경우 쿠키를 쓸 수 없다.
            // 미들웨어에서 세션을 갱신한다면 이 예외는 무시해도 된다.
          }
        },
      },
    }
  );
}

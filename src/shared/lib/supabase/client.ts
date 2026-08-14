import { createBrowserClient } from "@supabase/ssr";

/**
 * 클라이언트 컴포넌트에서 사용하는 Supabase 브라우저 클라이언트를 생성한다.
 * 브라우저 환경에서 쿠키 기반 세션을 자동으로 관리한다.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

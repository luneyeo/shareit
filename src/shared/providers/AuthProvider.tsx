"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/shared/lib/supabase/client";
import { useAuthStore } from "@/shared/store/authStore";

/**
 * Supabase 인증 상태를 authStore에 동기화한다.
 *
 * 서버에서 읽은 initialUser로 store를 채우고,
 * onAuthStateChange를 구독해 로그인·로그아웃·토큰 갱신을 실시간으로 반영한다.
 */
export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  useEffect(() => {
    // 서버가 내려준 사용자 정보로 store를 초기화한다.
    setUser(initialUser);

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      // 로그아웃 시 이전 사용자의 쿼리 캐시가 남지 않도록 전부 제거한다.
      if (event === "SIGNED_OUT") {
        queryClient.clear();
      }
    });

    return () => subscription.unsubscribe();
  }, [initialUser, setUser, queryClient]);

  return <>{children}</>;
}

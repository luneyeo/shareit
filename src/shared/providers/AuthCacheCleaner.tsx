"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/shared/lib/supabase/client";
import { useAuthStore } from "@/shared/store/authStore";

/**
 * 로그아웃하거나 계정이 바뀌면 이전 계정의 쿼리 캐시를 전부 제거하고, authStore의 사용자도 갱신한다.
 * 서버 프리페치 데이터가 뒤로가기로 다시 주입되지 않도록 라우터 캐시도 함께 비운다.
 *
 * QueryClient와 authStore는 공개 페이지를 오가도 유지되므로, (private) 레이아웃의 AuthProvider가 아니라
 * 루트 레이아웃에서 항상 구독한다. 세션을 서버에서 읽지 않아 정적 생성에 영향을 주지 않는다.
 */
export function AuthCacheCleaner() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    let lastUserId: string | undefined;

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user.id;
      const isUserChanged = !!lastUserId && !!userId && lastUserId !== userId;

      if (event === "SIGNED_OUT" || isUserChanged) {
        setUser(session?.user ?? null);
        queryClient.clear();
        router.refresh();
      }
      lastUserId = userId;
    });

    return () => subscription.unsubscribe();
  }, [queryClient, router, setUser]);

  return null;
}

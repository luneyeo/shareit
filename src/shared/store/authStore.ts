import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  /** 로그인한 사용자 정보. 로그아웃 상태면 null. */
  user: User | null;
  /** 로그인 여부. user 존재 여부에서 파생된 값. */
  isLoggedIn: boolean;
  /** 사용자 정보를 설정한다. null을 넘기면 로그아웃 상태가 된다. */
  setUser: (user: User | null) => void;
  /** 로그아웃 상태로 초기화한다. */
  clearUser: () => void;
}

/**
 * 클라이언트에서 로그인/로그아웃 상태를 관리하는 store.
 *
 * 세션의 실제 진실의 원천은 Supabase(쿠키)이며, 이 store는 그 상태를 반영하는 캐시다.
 * AuthProvider가 onAuthStateChange 구독을 통해 이 store를 동기화한다.
 *
 * 개발 환경에서는 devtools로 Redux DevTools 확장에서 상태·액션을 확인할 수 있다.
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: !!user }, undefined, "auth/setUser"),
      clearUser: () => set({ user: null, isLoggedIn: false }, undefined, "auth/clearUser"),
    }),
    { name: "authStore", enabled: process.env.NODE_ENV === "development" }
  )
);

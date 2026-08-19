import { create } from "zustand";
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
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
}));

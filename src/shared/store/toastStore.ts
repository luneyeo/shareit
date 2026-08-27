import { create } from "zustand";
import type { FeedbackStatus } from "@/shared/ui/feedback/status";

interface ToastItem {
  /** 렌더링·타이머를 새 토스트마다 초기화하기 위한 식별자. */
  id: number;
  status: FeedbackStatus;
  message: string;
}

interface ToastState {
  /** 현재 DOM에 그려지는 토스트. 퇴장 애니메이션 동안에도 잠시 유지된다. */
  item: ToastItem | null;
  /** 슬라이드/페이드 표시 여부. false면 화면 위로 숨겨진(등장 전·퇴장 후) 상태. */
  isVisible: boolean;
  /** 토스트를 띄운다. 이미 떠 있으면 즉시 새 내용으로 교체한다. */
  show: (status: FeedbackStatus, message: string) => void;
  /** 현재 토스트를 퇴장시킨 뒤 제거한다. */
  hide: () => void;
}

/** 자동 소멸까지의 노출 시간 / 등장·퇴장 전환 시간(ms). Toaster의 CSS와 맞춘다. */
const VISIBLE_MS = 3000;
const TRANSITION_MS = 200;

let nextId = 0;
let enterRaf = 0;
let hideTimer: ReturnType<typeof setTimeout> | undefined;
let removeTimer: ReturnType<typeof setTimeout> | undefined;

const clearTimers = () => {
  cancelAnimationFrame(enterRaf);
  clearTimeout(hideTimer);
  clearTimeout(removeTimer);
};

/**
 * 일시적 토스트 알림을 관리하는 store.
 *
 * 큐를 하나만 두어 항상 하나의 토스트만 노출하고, 새 토스트가 오면 이전 것을 교체한다.
 * 등장/퇴장 애니메이션과 3초 자동 소멸 타이밍을 store에서 직접 조율한다.
 * (명령형 API는 `@/shared/ui/feedback`의 `toast`를, 렌더링은 `Toaster`를 사용한다.)
 */
export const useToastStore = create<ToastState>((set, get) => ({
  item: null,
  isVisible: false,
  show: (status, message) => {
    clearTimers();
    const item = { id: ++nextId, status, message };

    if (get().isVisible) {
      // 이미 노출 중이면 애니메이션 없이 내용만 즉시 교체한다.
      set({ item });
    } else {
      // 숨김 상태로 먼저 그린 뒤 다음 프레임에 등장시켜 슬라이드/페이드를 재생한다.
      set({ item, isVisible: false });
      enterRaf = requestAnimationFrame(() => set({ isVisible: true }));
    }

    hideTimer = setTimeout(() => get().hide(), VISIBLE_MS);
  },
  hide: () => {
    clearTimers();
    set({ isVisible: false });
    removeTimer = setTimeout(() => set({ item: null }), TRANSITION_MS);
  },
}));

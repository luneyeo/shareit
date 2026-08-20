"use client";

import { IcKakao } from "@/shared/assets/icons";

interface KakaoAuthButtonProps {
  /** 버튼 클릭 시 실행할 카카오 인증 핸들러 */
  onClick: () => void;
  /** 인증 진행 중 여부. true이면 버튼을 비활성화하고 진행 라벨을 표시한다. */
  isPending?: boolean;
}

/**
 * 카카오 OAuth 인증(로그인/회원가입) 진입 버튼입니다.
 *
 * 카카오 OAuth는 로그인과 회원가입이 동일한 흐름이므로 라벨을 "시작하기"로 통일합니다.
 * 인증이 진행 중이면 버튼을 비활성화해 중복 클릭을 막습니다.
 *
 * @example
 * <KakaoAuthButton onClick={handleKakaoAuth} isPending={isPending} />
 */
export default function KakaoAuthButton({ onClick, isPending = false }: KakaoAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-kakao text-black typo-16-bold disabled:opacity-60"
    >
      <IcKakao className="size-6" />
      {isPending ? "카카오로 시작하는 중..." : "카카오로 시작하기"}
    </button>
  );
}

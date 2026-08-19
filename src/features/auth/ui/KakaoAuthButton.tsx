"use client";

import { usePathname } from "next/navigation";
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
 * 현재 경로가 `/signup`이면 "회원가입", 그 외에는 "로그인"으로 라벨을 렌더링하여
 * 로그인·회원가입 페이지가 하나의 컴포넌트를 공통으로 사용합니다.
 * 인증이 진행 중이면 버튼을 비활성화해 중복 클릭을 막습니다.
 *
 * @example
 * <KakaoAuthButton onClick={handleKakaoAuth} isPending={isPending} />
 */
export default function KakaoAuthButton({ onClick, isPending = false }: KakaoAuthButtonProps) {
  const pathname = usePathname();
  const label = pathname === "/signup" ? "회원가입" : "로그인";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-kakao text-black typo-16-bold disabled:opacity-60"
    >
      <IcKakao className="size-6" />
      {isPending ? `카카오로 ${label} 중...` : `카카오로 ${label}`}
    </button>
  );
}

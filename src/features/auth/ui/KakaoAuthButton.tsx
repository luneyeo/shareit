"use client";

import { usePathname } from "next/navigation";
import { IcKakao } from "@/shared/assets/icons";

interface KakaoAuthButtonProps {
  /** 버튼 클릭 시 실행할 카카오 인증 핸들러 */
  onClick: () => void;
}

/**
 * 카카오 OAuth 인증(로그인/회원가입) 진입 버튼입니다.
 *
 * 현재 경로가 `/signup`이면 "회원가입", 그 외에는 "로그인"으로 라벨을 렌더링하여
 * 로그인·회원가입 페이지가 하나의 컴포넌트를 공통으로 사용합니다.
 *
 * @example
 * <KakaoAuthButton onClick={handleKakaoAuth} />
 */
export default function KakaoAuthButton({ onClick }: KakaoAuthButtonProps) {
  const pathname = usePathname();
  const label = pathname === "/signup" ? "회원가입" : "로그인";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-kakao text-black typo-16-bold"
    >
      <IcKakao className="size-6" />
      카카오로 {label}
    </button>
  );
}

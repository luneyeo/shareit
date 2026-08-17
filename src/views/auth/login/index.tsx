"use client";

import AuthIntro from "@/features/auth/ui/AuthIntro";
import KakaoAuthButton from "@/features/auth/ui/KakaoAuthButton";

/**
 * 카카오 OAuth 기반 로그인(=회원가입) 진입 페이지 컴포넌트
 *
 * 로고와 서비스 소개 문구를 화면 중앙에, 카카오 로그인 버튼을 하단에 배치한다.
 *
 * @example
 * import { LoginPage } from '@/views/auth/login'
 * export default LoginPage
 */
export function LoginPage() {
  // TODO: Supabase 카카오 OAuth(signInWithOAuth) 연동
  const handleKakaoLogin = () => {};

  return (
    <div className="flex h-full flex-col px-5 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <AuthIntro description="반가워요! 공유하고 싶은 제품 있으세요?" />

      <div className="mx-auto mb-16 w-4/5">
        <KakaoAuthButton onClick={handleKakaoLogin} />
      </div>
    </div>
  );
}

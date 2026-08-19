"use client";

import { signInWithKakao } from "@/features/auth/apis/signInWithKakao";
import AuthIntro from "@/features/auth/ui/AuthIntro";
import KakaoAuthButton from "@/features/auth/ui/KakaoAuthButton";

/**
 * 카카오 OAuth 기반 회원가입 진입 페이지 컴포넌트
 *
 * 로고와 서비스 소개 문구를 화면 중앙에, 카카오 회원가입 버튼을 하단에 배치한다.
 *
 * @example
 * import { SignupPage } from '@/views/auth/signup'
 * export default SignupPage
 */
export function SignupPage() {
  const handleKakaoSignup = () => {
    signInWithKakao();
  };

  return (
    <div className="flex h-full flex-col px-5 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <AuthIntro description="지금 가입하고, 추천하고 싶은 제품을 공유해 보세요!" />

      <div className="mx-auto mb-16 w-4/5">
        <KakaoAuthButton onClick={handleKakaoSignup} />
      </div>
    </div>
  );
}

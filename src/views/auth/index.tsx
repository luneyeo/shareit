"use client";

import { useKakaoAuth } from "@/features/auth/hooks/useKakaoAuth";
import { AUTH_MESSAGE } from "@/features/auth/constants/messages";
import AuthIntro from "@/features/auth/ui/AuthIntro";
import KakaoAuthButton from "@/features/auth/ui/KakaoAuthButton";

/**
 * 카카오 OAuth 기반 인증 진입 페이지 컴포넌트
 *
 * 카카오 OAuth는 로그인과 회원가입이 동일한 흐름이므로 하나의 페이지로 제공한다.
 * 로고·서비스 소개 문구와 카카오 인증 버튼을 한 덩어리로 화면 중앙에 배치한다.
 *
 * @example
 * import { AuthPage } from '@/views/auth'
 * export default AuthPage
 */
export function AuthPage() {
  const { isPending, hasError, startKakaoAuth } = useKakaoAuth();

  return (
    <div className="flex h-full flex-col justify-center gap-16 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <AuthIntro description="반가워요! 공유하고 싶은 제품 있으세요?" />

      <div className="mx-auto w-4/6">
        <KakaoAuthButton onClick={startKakaoAuth} isPending={isPending} />
        {/* TODO: 토스트 알림 도입 시 인라인 오류 메시지를 토스트로 교체 */}
        {hasError && (
          <p role="alert" className="mt-3 text-center typo-13-medium text-error">
            {AUTH_MESSAGE.OAUTH.KAKAO.SIGNIN.ERROR}
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useKakaoAuth } from "@/features/auth/hooks/useKakaoAuth";
import { AUTH_MESSAGE } from "@/features/auth/constants/messages";
import { toast } from "@/shared/ui/feedback";
import AuthIntro from "@/features/auth/ui/AuthIntro";
import KakaoAuthButton from "@/features/auth/ui/KakaoAuthButton";

interface AuthPageViewProps {
  /** 카카오 인증을 시작하는 핸들러 */
  onStart: () => void;
  /** 인증 진행 중 여부 */
  isPending?: boolean;
}

/**
 * 카카오 OAuth 인증 진입 화면 UI.
 *
 * 정적 HTML에도 담기도록 URL을 직접 읽지 않으며, Suspense fallback으로도 사용한다.
 */
function AuthPageView({ onStart, isPending }: AuthPageViewProps) {
  return (
    <div className="flex h-full flex-col justify-center gap-16 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <AuthIntro description="반가워요! 공유하고 싶은 제품 있으세요?" />

      <div className="mx-auto w-4/6">
        <KakaoAuthButton onClick={onStart} isPending={isPending} />
      </div>
    </div>
  );
}

/**
 * 카카오 OAuth 인증 진입 화면 본문.
 *
 * 인증 시작 실패(hasError)뿐 아니라, OAuth 콜백(/api/auth)이 세션 교환에 실패해
 * `?error=auth`로 되돌아온 경우도 토스트로 안내한다.
 */
function AuthPageContent() {
  const { isPending, hasError, startKakaoAuth } = useKakaoAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackFailed = searchParams.get("error") === "auth";
  // 랜딩에서 넘어온 초대 코드가 있으면 로그인 왕복 뒤 콜백까지 이어 붙인다.
  const inviteCode = searchParams.get("invite") ?? undefined;

  // 인증 시작 실패를 토스트로 안내한다.
  useEffect(() => {
    if (hasError) toast.error(AUTH_MESSAGE.OAUTH.KAKAO.SIGNIN.ERROR);
  }, [hasError]);

  // 콜백 세션 교환 실패(?error=auth)를 토스트로 안내하고, 새로고침·재진입 시 재발화하지 않도록 error 파라미터만 제거한다. (invite는 보존)
  useEffect(() => {
    if (!callbackFailed) return;
    toast.error(AUTH_MESSAGE.OAUTH.KAKAO.SIGNIN.ERROR);

    const params = new URLSearchParams(searchParams);
    params.delete("error");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [callbackFailed, pathname, router, searchParams]);

  return <AuthPageView onStart={() => startKakaoAuth(inviteCode)} isPending={isPending} />;
}

/**
 * 카카오 OAuth 기반 인증 진입 페이지 컴포넌트
 *
 * 카카오 OAuth는 로그인과 회원가입이 동일한 흐름이므로 하나의 페이지로 제공한다.
 * 로고·서비스 소개 문구와 카카오 인증 버튼을 한 덩어리로 화면 중앙에 배치한다.
 *
 * useSearchParams는 Suspense 경계가 필요하므로 본문을 Suspense로 감싼다.
 * 본문은 정적 HTML에서 빠지므로 같은 화면을 fallback으로 담는다.
 *
 * @example
 * import { AuthPage } from '@/views/auth'
 * export default AuthPage
 */
export function AuthPage() {
  return (
    <Suspense fallback={<AuthPageView onStart={() => {}} />}>
      <AuthPageContent />
    </Suspense>
  );
}

import { useState } from "react";
import { signInWithKakao } from "@/shared/api/auth/oauth";

/**
 * 카카오 OAuth 로그인/회원가입을 시작하고 진행·오류 상태를 관리하는 훅.
 *
 * 시작에 성공하면 카카오 인증 페이지로 리다이렉트되므로 isPending을 유지하고,
 * 시작 자체가 실패하면 hasError를 true로 되돌려 사용자가 재시도할 수 있게 한다.
 *
 * @example
 * const { isPending, hasError, startKakaoAuth } = useKakaoAuth();
 * <button onClick={startKakaoAuth} disabled={isPending} />
 */
export const useKakaoAuth = () => {
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);

  const startKakaoAuth = async (inviteCode?: string) => {
    setIsPending(true);
    setHasError(false);

    const { error } = await signInWithKakao(inviteCode);

    if (error) {
      setHasError(true);
      setIsPending(false);
    }
  };

  return { isPending, hasError, startKakaoAuth };
};

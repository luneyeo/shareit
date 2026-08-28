"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/shared/ui/feedback";
import { AUTH_MESSAGE } from "@/features/auth/constants/messages";

const JOIN_ERROR_MESSAGES: Record<string, string> = {
  invalid: AUTH_MESSAGE.INVITE.JOIN.INVALID,
  error: AUTH_MESSAGE.INVITE.JOIN.ERROR,
};

/**
 * 초대 코드 입장 실패를 토스트로 안내한다.
 *
 * OAuth 콜백이 넘긴 `joinError` 쿼리 파라미터(`invalid`: 무효 코드, `error`: 서버 오류)를 읽어
 * 사유에 맞는 토스트를 한 번 띄우고, 새로고침·재진입 시 다시 뜨지 않도록 파라미터를 제거한다.
 * 화면에는 아무것도 렌더하지 않는다. (useSearchParams를 쓰므로 Suspense 경계 안에서 렌더한다.)
 */
export default function JoinErrorNotice() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const joinError = searchParams.get("joinError");

  useEffect(() => {
    const message = joinError ? JOIN_ERROR_MESSAGES[joinError] : null;
    if (!message) return;

    toast.error(message);

    const params = new URLSearchParams(searchParams);
    params.delete("joinError");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [joinError, pathname, router, searchParams]);

  return null;
}

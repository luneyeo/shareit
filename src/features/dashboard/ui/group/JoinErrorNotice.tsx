"use client";

import { useSearchParams } from "next/navigation";

const JOIN_ERROR_MESSAGES: Record<string, string> = {
  invalid: "입장 코드를 다시 확인해 주세요",
  error: "일시적인 오류로 입장하지 못했어요. 잠시 후 다시 시도해 주세요",
};

/**
 * 초대 코드 입장 실패 안내 문구.
 *
 * `joinError` 쿼리 파라미터(`invalid`: 무효 코드, `error`: 서버 오류)를 읽어 사유에 맞는 안내를 노출한다.
 * 값이 없거나 알 수 없으면 아무것도 렌더하지 않는다.
 * 그룹 유무와 무관하게 최종 대시보드에서 공통으로 사용한다. (useSearchParams를 쓰므로 Suspense 경계 안에서 렌더한다.)
 */
export default function JoinErrorNotice() {
  const joinError = useSearchParams().get("joinError");
  const message = joinError ? JOIN_ERROR_MESSAGES[joinError] : null;
  if (!message) return null;

  return (
    // TODO: 토스트 도입 후 인라인 안내를 토스트로 교체 (입장 실패 알림)
    <p role="alert" className="px-10 pt-6 text-center typo-14-medium text-error">
      {message}
    </p>
  );
}

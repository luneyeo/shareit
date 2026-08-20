/**
 * 인증 흐름에서 사용자에게 노출하는 문구를 한곳에서 관리한다.
 * 문구 중복을 방지하고, 토스트 알림 도입 시 참조를 일관되게 유지한다.
 */
export const AUTH_MESSAGE = {
  OAUTH: {
    KAKAO: {
      SIGNIN: {
        ERROR: "로그인에 실패했어요. 잠시 후 다시 시도해 주세요.",
      },
    },
  },
  LOGOUT: {
    ERROR: "로그아웃에 실패했어요. 잠시 후 다시 시도해 주세요.",
  },
} as const;

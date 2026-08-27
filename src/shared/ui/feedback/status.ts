/**
 * 두 알림 계층(Toast·Banner)이 공유하는 상태 정의입니다.
 *
 * 심볼과 상태 구분은 계층과 무관하게 항상 동일하게 유지해야 하므로
 * 한곳에서 관리합니다. (색 계열은 계층별로 다르게 지정합니다.)
 */
export type FeedbackStatus = "success" | "error" | "warning";

/** 상태별 심볼. Toast·Banner 양쪽에서 동일하게 사용합니다. */
export const FEEDBACK_SYMBOL: Record<FeedbackStatus, string> = {
  success: "✓",
  error: "!",
  warning: "⚠",
};

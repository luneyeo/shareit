import { useToastStore } from "@/shared/store/toastStore";
import type { FeedbackStatus } from "@/shared/ui/feedback/status";

const show = (status: FeedbackStatus) => (message: string) =>
  useToastStore.getState().show(status, message);

/**
 * 어디서든 호출할 수 있는 명령형 토스트 API입니다.
 *
 * 결과 알림처럼 사용자의 확인이 필요 없는, 자동으로 사라져도 되는 메시지에 사용합니다.
 * 화면 어딘가에 `Toaster`가 마운트되어 있어야 실제로 노출됩니다.
 *
 * @example
 * ```ts
 * toast.success("입장 코드를 복사했어요");
 * toast.error("코드가 올바르지 않아요. 다시 확인해주세요");
 * toast.warning("그룹명은 20자까지 입력할 수 있어요");
 * ```
 */
export const toast = {
  success: show("success"),
  error: show("error"),
  warning: show("warning"),
};

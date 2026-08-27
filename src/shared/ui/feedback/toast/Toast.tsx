import { cn } from "@/shared/utils/cn";
import { FEEDBACK_SYMBOL, type FeedbackStatus } from "@/shared/ui/feedback/status";

/** 상태별 아이콘 배지 색상(배지 배경 · 심볼 색). */
const badgeStyle: Record<FeedbackStatus, string> = {
  success: "bg-[#E9F7EF] text-[#2fa66a]",
  error: "bg-[#FDECEC] text-[#E5484D]",
  warning: "bg-[#FFF4E5] text-[#E08A2F]",
};

interface ToastProps {
  status: FeedbackStatus;
  message: string;
}

/**
 * 일시적 토스트 한 개를 그리는 표시용 카드입니다.
 *
 * 노출 위치·자동 소멸·애니메이션은 `Toaster`가 담당하고, 이 컴포넌트는 순수 UI만 그립니다.
 * 스크린리더 알림(role/aria-live)도 상위 `Toaster`의 라이브 영역에서 처리합니다.
 */
export default function Toast({ status, message }: ToastProps) {
  return (
    <div className="flex items-start gap-[11px] rounded-[14px] border border-[#f0f0ee] bg-white px-4 py-3.5 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
      <span
        aria-hidden
        className={cn(
          "mt-px flex size-[22px] flex-none items-center justify-center rounded-full text-[12px] font-extrabold",
          badgeStyle[status]
        )}
      >
        {FEEDBACK_SYMBOL[status]}
      </span>
      <p className="line-clamp-2 text-[13.5px] font-medium leading-[1.5] text-pretty text-[#161616]">
        {message}
      </p>
    </div>
  );
}

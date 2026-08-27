"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { FEEDBACK_SYMBOL, type FeedbackStatus } from "@/shared/ui/feedback/status";

/** 상태별 색상(컨테이너 배경 · 심볼/텍스트 색 · 닫기 버튼 색). */
const bannerStyle: Record<FeedbackStatus, { container: string; close: string }> = {
  success: { container: "bg-[#EAF7F0] text-[#1D6B45]", close: "text-[#8FBFA6]" },
  error: { container: "bg-[#FDEDED] text-[#A32B2F]", close: "text-[#D89A9C]" },
  warning: { container: "bg-[#FFF5E6] text-[#96601C]", close: "text-[#DBB689]" },
};

interface BannerProps {
  status: FeedbackStatus;
  /** 안내 문구. */
  children: ReactNode;
  /** 닫기 버튼을 누르면 호출됩니다. 없으면 닫기 버튼을 표시하지 않습니다. */
  onClose?: () => void;
  className?: string;
}

/**
 * 사용자가 읽고 조치해야 하는, 지속적인 인라인 배너입니다.
 *
 * 자동으로 사라지지 않으며, ✕ 버튼 또는 조건 해소 시에만 사라집니다.
 * 해당 콘텐츠 영역 안에 인라인으로 배치하세요. (폼 오류는 입력 필드 바로 위)
 * 에러 상태는 스크린리더가 즉시 읽도록 `role="alert"`, 그 외는 `role="status"`를 사용합니다.
 *
 * @example
 * ```tsx
 * <Banner status="error" onClose={handleClose}>네트워크 연결을 확인해주세요</Banner>
 * <Banner status="warning">이 그룹은 30일 후 삭제될 예정이에요</Banner>
 * ```
 */
export default function Banner({ status, children, onClose, className }: BannerProps) {
  const isError = status === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-4 py-3.5",
        bannerStyle[status].container,
        className
      )}
    >
      <span aria-hidden className="flex-none text-[14px] font-extrabold">
        {FEEDBACK_SYMBOL[status]}
      </span>
      <p className="flex-1 text-[13.5px] font-semibold leading-[1.45] text-pretty">{children}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className={cn("flex-none text-[14px] leading-none", bannerStyle[status].close)}
        >
          ✕
        </button>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/cn";

type CopyButtonProps = {
  /** 클립보드에 복사할 텍스트 */
  value: string;
  className?: string;
  onSuccess?: () => void;
  onError?: () => void;
};

/**
 * 클릭 시 `value`를 클립보드에 복사하고, 상태에 따라 라벨·색이 바뀌는 버튼입니다.
 *
 * idle "복사하기" → copied "복사됨"(초록) / failed "다시 시도"(빨강).
 *
 * @example
 * <CopyButton value={inviteCode} />
 */
export default function CopyButton({ value, className, onSuccess, onError }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      onSuccess?.();
    } catch {
      setStatus("failed");
      onError?.();
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "rounded-full px-3 py-1.5 typo-14-semibold transition-colors",
        status === "copied" && "bg-[#E7F7EC] text-[#35A15C]",
        status === "failed" && "bg-error/10 text-error",
        status === "idle" && "bg-primary-100 text-primary-600",
        className
      )}
    >
      {status === "copied" ? "복사됨" : status === "failed" ? "다시 시도" : "복사하기"}
    </button>
  );
}

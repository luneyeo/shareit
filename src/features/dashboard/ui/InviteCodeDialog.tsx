"use client";

import { useState } from "react";
import DialogBase from "@/shared/ui/dialog/DialogBase";
import { cn } from "@/shared/utils/cn";

interface InviteCodeDialogProps {
  /** 표시·복사할 그룹 입장 코드 */
  inviteCode: string;
  /** 확인·닫기(X) 시 호출됩니다. */
  onClose: () => void;
}

/**
 * 그룹 생성 완료 후, 멤버 초대용 입장 코드를 안내하고 복사하는 다이얼로그입니다.
 *
 * - 코드 박스 옆 "복사하기"로 클립보드에 코드를 복사합니다.
 * - 확인 버튼 하나만 두어(`hideCancel`) 완료 알림 성격에 맞춥니다.
 * - 배경·서피스는 `OverlayPortal`이 담당하므로 그 내부에 배치해 사용합니다.
 */
export default function InviteCodeDialog({ inviteCode, onClose }: InviteCodeDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
  };

  return (
    <DialogBase
      title="그룹 생성 완료!"
      hideCancel
      confirmText="확인"
      onConfirm={onClose}
      onCancel={onClose}
    >
      <p className="typo-13-medium text-gray-500">아래 입장 코드를 공유해서 멤버를 초대하세요.</p>
      <div className="flex items-center justify-between rounded-xl bg-gray-100 border border-gray-200 px-4 py-3">
        <span className="typo-18-semibold tracking">{inviteCode}</span>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "rounded-full px-3 py-1.5 typo-14-semibold transition-colors",
            copied ? "bg-[#E7F7EC] text-[#35A15C]" : "bg-primary-100 text-primary-600"
          )}
        >
          {copied ? "복사됨" : "복사하기"}
        </button>
      </div>
    </DialogBase>
  );
}

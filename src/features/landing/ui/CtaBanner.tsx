"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_MESSAGE } from "@/features/auth/constants/messages";
import { useJoinGroup } from "@/features/dashboard/hooks/useJoinGroup";
import { getSessionUserId } from "@/shared/api/auth/getSessionUserId";
import { InvalidInviteCodeError } from "@/shared/api/group/joinGroup";
import { toast } from "@/shared/ui/feedback";
import { SectionHeading } from "@/shared/ui/section";

/**
 * 하단 전환 유도(CTA) 배너입니다.
 *
 * 초대 코드를 입력하고 "다음"을 누르면 코드를 실어 `/auth`로 이동하고, 로그인하면
 * 코드가 콜백(`/api/auth`)까지 이어져 해당 그룹 대시보드로 바로 입장합니다.
 * (코드 유효성은 로그인 후 콜백에서 검증) 코드 없이 하단 버튼으로 이동하면 로그인 후
 * 그룹 입장·생성을 진행할 수 있습니다.
 *
 * 이미 로그인한 상태면 `/auth`가 대시보드로 리다이렉트되어 콜백을 거치지 않으므로,
 * 이 화면에서 바로 입장하고 실패는 토스트로 안내합니다.
 */
export default function CtaBanner() {
  const router = useRouter();
  const { mutate: joinGroup, isPending } = useJoinGroup();
  const [code, setCode] = useState("");

  // 코드가 있으면 invite로 실어 /auth로 이동한다. 유효성은 로그인 후 콜백에서 검증한다.
  const goToAuth = (inviteCode?: string) => {
    const trimmed = inviteCode?.trim();
    router.push(trimmed ? `/auth?invite=${encodeURIComponent(trimmed)}` : "/auth");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inviteCode = code.trim();
    const userId = inviteCode ? await getSessionUserId() : null;

    if (!userId) {
      goToAuth(inviteCode);
      return;
    }

    joinGroup(
      { inviteCode, userId },
      {
        onSuccess: ({ id }) => router.push(`/dashboard/${id}`),
        onError: (error) =>
          toast.error(
            error instanceof InvalidInviteCodeError
              ? AUTH_MESSAGE.INVITE.JOIN.INVALID
              : AUTH_MESSAGE.INVITE.JOIN.ERROR
          ),
      }
    );
  };

  return (
    <section className="px-8 py-12">
      <div className="flex flex-col items-center rounded-3xl bg-[#FFF6F1] px-6 py-10 text-center">
        <SectionHeading
          eyebrow="GET STARTED"
          title="초대 코드가 있나요?"
          description="코드를 입력하고 로그인하면 바로 그룹으로 들어가요."
        />

        <form onSubmit={handleSubmit} className="mt-7 w-full">
          <div className="flex items-center gap-2 rounded-full border border-primary-500 bg-white p-1.5 pl-5">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="초대 코드 입력"
              aria-label="초대 코드"
              className="min-w-0 flex-1 bg-transparent typo-16-medium placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isPending}
              className="shrink-0 rounded-full bg-primary-600 px-6 py-2.5 typo-16-bold text-white disabled:opacity-60"
            >
              다음
            </button>
          </div>
        </form>

        <div className="mt-5 flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-gray-300" />
          <span className="typo-13-medium text-gray-400">또는</span>
          <span className="h-px flex-1 bg-gray-300" />
        </div>

        <button
          type="button"
          onClick={() => goToAuth()}
          className="mt-4 typo-16-bold text-primary-600"
        >
          새 그룹 만들기 →
        </button>
      </div>
    </section>
  );
}

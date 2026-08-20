"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/shared/api/auth/oauth";
import { AUTH_MESSAGE } from "@/features/auth/constants/messages";

/**
 * 로그아웃 버튼.
 *
 * TODO: 로그인 상태 관리 확인용 임시 버튼. 실제 마이페이지 UI로 교체 예정.
 */
export default function LogoutButton() {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  const handleLogout = async () => {
    setHasError(false);

    try {
      const { error } = await logout();

      if (error) {
        setHasError(true);
        return;
      }

      router.replace("/login");
    } catch {
      setHasError(true);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        className="flex h-13 w-full items-center justify-center rounded-full bg-gray-100 text-black typo-16-bold"
      >
        로그아웃
      </button>
      {/* TODO: 토스트 알림 도입 시 인라인 오류 메시지를 토스트로 교체 */}
      {hasError && (
        <p role="alert" className="mt-3 text-center typo-13-medium text-error">
          {AUTH_MESSAGE.LOGOUT.ERROR}
        </p>
      )}
    </div>
  );
}

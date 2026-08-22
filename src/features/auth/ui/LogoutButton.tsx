"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/shared/api/auth/oauth";
import { AUTH_MESSAGE } from "@/features/auth/constants/messages";

/**
 * 로그아웃 버튼.
 *
 * 마이페이지에서 사용하며, 클릭 시 로그아웃 후 `/auth`로 이동합니다.
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

      router.replace("/auth");
    } catch {
      setHasError(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleLogout}
        className="flex h-13 w-full items-center justify-center rounded-full bg-gray-100 text-gray-700 typo-16-bold"
      >
        로그아웃
      </button>
      {/* TODO: 토스트 알림 도입 시 인라인 오류 메시지를 토스트로 교체 */}
      {hasError && (
        <p role="alert" className="mt-3 text-center typo-13-medium text-error">
          {AUTH_MESSAGE.LOGOUT.ERROR}
        </p>
      )}
    </>
  );
}

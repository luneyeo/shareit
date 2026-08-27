"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/shared/api/auth/oauth";
import { AUTH_MESSAGE } from "@/features/auth/constants/messages";
import { toast } from "@/shared/ui/feedback";

/**
 * 로그아웃 버튼.
 *
 * 마이페이지에서 사용하며, 클릭 시 로그아웃 후 `/auth`로 이동합니다.
 * 실패하면 토스트로 안내하고 현재 화면에 머무릅니다.
 */
export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await logout();

      if (error) {
        toast.error(AUTH_MESSAGE.LOGOUT.ERROR);
        return;
      }

      router.replace("/auth");
    } catch {
      toast.error(AUTH_MESSAGE.LOGOUT.ERROR);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex h-13 w-full items-center justify-center rounded-full bg-gray-200 text-gray-800 typo-16-bold"
    >
      로그아웃
    </button>
  );
}

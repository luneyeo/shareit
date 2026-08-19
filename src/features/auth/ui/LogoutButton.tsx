"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/features/auth/apis/logout";

/**
 * 로그아웃 버튼.
 *
 * TODO: 로그인 상태 관리 확인용 임시 버튼. 실제 마이페이지 UI로 교체 예정.
 */
export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex h-13 w-full items-center justify-center rounded-full bg-gray-100 text-black typo-16-bold"
    >
      로그아웃
    </button>
  );
}

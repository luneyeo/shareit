import LogoutButton from "@/features/auth/ui/LogoutButton";

/**
 * 사용자 개인 정보 및 설정을 관리하는 마이페이지 컴포넌트
 *
 * @example
 * import { MyPage } from '@/views/mypage'
 * export default MyPage
 */
export function MyPage() {
  return (
    <div className="p-5">
      {/* TODO: 로그인 상태 관리 확인용 임시 로그아웃 버튼 */}
      <LogoutButton />
    </div>
  );
}

import LogoutButton from "@/features/auth/ui/LogoutButton";
import PageHeader from "@/shared/ui/page-header/PageHeader";

/**
 * 사용자 개인 정보 및 설정을 관리하는 마이페이지 컴포넌트
 *
 * @example
 * import { MyPage } from '@/views/mypage'
 * export default MyPage
 */
export function MyPage() {
  return (
    <>
      <PageHeader title="마이페이지" />
      <div className="p-5">
        <LogoutButton />
      </div>
    </>
  );
}

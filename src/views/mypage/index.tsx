"use client";

import LogoutButton from "@/features/auth/ui/LogoutButton";
import { useMyPageSections } from "@/features/mypage/hooks/useMyPageSections";
import { MyPageSection } from "@/features/mypage/ui";
import PageHeader from "@/shared/ui/page-header/PageHeader";
import { cn } from "@/shared/utils/cn";

/** 섹션 사이를 나누는 회색 구분선. `className`으로 두께를 조절합니다. */
function Divider({ className }: { className?: string }) {
  return <div className={cn("bg-gray-100", className)} />;
}

/**
 * 사용자 개인 정보 및 설정을 관리하는 마이페이지 컴포넌트
 *
 * @example
 * import { MyPage } from '@/views/mypage'
 * export default MyPage
 */
export function MyPage() {
  const { sections, dialogElement } = useMyPageSections();

  return (
    <>
      <PageHeader title="마이페이지" />
      {sections.map((section, index) => (
        <div key={section.title}>
          {index > 0 && <Divider className="h-0.5" />}
          <MyPageSection title={section.title} items={section.items} />
        </div>
      ))}
      <Divider className="h-2" />
      <div className="p-5">
        <LogoutButton />
      </div>
      {dialogElement}
    </>
  );
}

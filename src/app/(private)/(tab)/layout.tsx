import TabBar from "@/shared/ui/tab-bar/TabBar";

/**
 * 기본 메뉴 탭바를 사용하는 페이지 그룹의 레이아웃.
 *
 * 하단 탭바(`TabBar`)를 한 번만 렌더해 탭 그룹(대시보드·좋아요·마이페이지) 내에서
 * 공유하고, 라우팅 중에도 리마운트 없이 유지되도록 합니다.
 * 액션 푸터를 쓰는 페이지는 `(action)` 그룹에 두어 탭바가 렌더되지 않습니다.
 */
export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/**
       * 하단 고정 TabBar(FooterBase, fixed bottom-0)에 마지막 콘텐츠가 가려지지 않도록
       * 하단 여백을 확보합니다.
       * 여백 = TabBar 높이(60px: FooterBase pt-2(8) + nav h-11(44) + pb-2(8)) + safe-area
       */}
      <div className="pb-[calc(3.75rem+env(safe-area-inset-bottom))]">{children}</div>
      <TabBar />
    </>
  );
}

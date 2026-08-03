import TabBar from "@/shared/ui/tab-bar/TabBar";

/**
 * private 영역 공통 레이아웃.
 *
 * 하단 기본 메뉴 탭바(`TabBar`)를 한 번만 렌더해 private 페이지 전역에서 공유하고,
 * 라우팅 중에도 리마운트 없이 유지되도록 합니다.
 */
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
}

import { cn } from "@/shared/utils/cn";

type FooterBaseProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * 화면 하단에 고정되는 푸터 껍데기(shell) 컴포넌트입니다.
 *
 * 하단 고정 · 흰 배경 · 상단 구분선 · safe-area 여백 같은 "바(bar) 외형"만 제공하며,
 * 내부 구성은 `children`으로 주입합니다. 기본 메뉴 탭바와 상품 상세의 액션 푸터가
 * 이 껍데기를 공유하되, 두 푸터는 동시에 노출되지 않고 서로를 대체합니다.
 * 네비게이션·좋아요 같은 도메인 로직은 갖지 않습니다.
 *
 * - `children`: 바 내부에 배치할 내용 (탭 목록 · 액션 버튼 등)
 * - `className`: 내부 정렬·패딩 등 레이아웃 커스터마이즈
 *
 * @example
 * ```tsx
 * // 기본 메뉴 탭바
 * <FooterBase className="flex items-center justify-around">
 *   <NavItem ... />
 * </FooterBase>
 *
 * // 액션 버튼 줄은 보통 이 위에 얹은 ActionFooter를 사용합니다.
 * <FooterBase className="flex gap-2">
 *   <Button theme="secondary" className="flex-1">저장하기</Button>
 *   <Button theme="primary" className="flex-1">좋아요</Button>
 * </FooterBase>
 * ```
 */
export default function FooterBase({ children, className }: FooterBaseProps) {
  return (
    <footer
      className={cn(
        "fixed inset-x-0 bottom-0 z-footer bg-white",
        "border-t border-gray-100",
        "px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]",
        className
      )}
    >
      {children}
    </footer>
  );
}

import { Children } from "react";
import { cn } from "@/shared/utils/cn";
import FooterBase from "../base/FooterBase";

type ActionFooterProps = {
  /** 하단에 배치할 액션 버튼. 개수에 따라 버튼 사이 간격이 자동으로 설정됩니다. */
  children: React.ReactNode;
  className?: string;
};

/**
 * 하단 액션 버튼을 가로로 배치하는 공통 푸터 레이아웃 컴포넌트입니다.
 *
 * `FooterBase` 껍데기 위에 버튼 줄(가로 flex)만 얹으며, 전달된 버튼 개수에 따라
 * 사이 간격을 조절합니다. 상품 상세(저장·좋아요)·상품 등록(등록하기)처럼
 * "하단 액션 버튼" 형태를 공유하는 feature 푸터에서 재사용합니다.
 * 버튼의 너비(`flex-1` 등)는 이 컴포넌트가 강제하지 않고 각 버튼의 `className`으로 지정합니다.
 *
 * - 버튼 1개: 간격 없음
 * - 버튼 2개 이상: 버튼 사이 간격(`gap-2`) 적용
 *
 * - `children`: 액션 버튼(들)
 * - `className`: 레이아웃 커스터마이즈
 *
 * @example
 * ```tsx
 * // 상품 상세: 2개 버튼
 * <ActionFooter>
 *   <Button theme="secondary" size="lg" className="flex-1">저장하기</Button>
 *   <Button theme="primary" size="lg" className="flex-1">좋아요</Button>
 * </ActionFooter>
 *
 * // 상품 등록: 1개 버튼
 * <ActionFooter>
 *   <Button theme="primary" size="lg" className="flex-1" disabled={!isValid}>등록하기</Button>
 * </ActionFooter>
 * ```
 */
export default function ActionFooter({ children, className }: ActionFooterProps) {
  const actionCount = Children.toArray(children).length;

  return (
    <FooterBase className={cn("flex", actionCount > 1 ? "gap-2" : "gap-0", className)}>
      {children}
    </FooterBase>
  );
}

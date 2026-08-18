import { cn } from "@/shared/utils/cn";

type SectionProps = React.ComponentPropsWithoutRef<"section">;

/**
 * 섹션 공통 레이아웃 래퍼입니다.
 *
 * 좌우 여백과 세로 리듬(위아래 패딩)을 통일하고, 헤더와 본문 사이 간격을
 * 세로 flex 간격으로 제공합니다. 세부 조정이 필요하면 `className`으로 덮어씁니다.
 *
 * @example
 * ```tsx
 * <Section>
 *   <SectionHeading eyebrow="WHY SHAREIT" title="왜 Shareit인가요?" />
 *   <FeatureCardList />
 * </Section>
 * ```
 */
export default function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-8 px-6 pt-22 pb-10", className)} {...props}>
      {children}
    </section>
  );
}

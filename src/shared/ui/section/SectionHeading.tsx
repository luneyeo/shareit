import { cn } from "@/shared/utils/cn";

type SectionHeadingProps = {
  /** 제목 위에 표시되는 대문자 라벨 (예: "HOW IT WORKS") */
  eyebrow?: string;
  /** 섹션 제목. 일부 단어 강조가 필요하면 노드로 전달합니다. (`h2`로 렌더링) */
  title: React.ReactNode;
  /** 제목 아래 보조 설명 */
  description?: React.ReactNode;
  className?: string;
};

/**
 * 랜딩 페이지 등에서 반복되는 "라벨 + 제목 + 설명" 형태의 섹션 헤더입니다.
 *
 * 섹션마다 동일한 타이포/정렬(가운데)을 공유하며, 도메인 로직 없이 텍스트만 받습니다.
 * 헤딩 계층은 `h2`로 고정되어 있어 페이지 최상단 `h1`(히어로) 아래 섹션 제목으로 사용합니다.
 *
 * - `eyebrow`: 제목 위 주황색 대문자 라벨 (생략 가능)
 * - `title`: 섹션 제목 (문자열 또는 강조용 노드)
 * - `description`: 제목 아래 회색 보조 설명 (생략 가능)
 *
 * @example
 * ```tsx
 * <SectionHeading eyebrow="HOW IT WORKS" title="이렇게 시작해요" />
 * <SectionHeading
 *   eyebrow="REAL SHARES"
 *   title="이런 정보가 오가요"
 *   description="친구가 직접 써보고 추천한 찐템, 그대로 공유돼요"
 * />
 * ```
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5 text-center", className)}>
      {eyebrow && (
        <p className="typo-14-bold uppercase tracking-wide text-primary-600">{eyebrow}</p>
      )}
      <h2 className="typo-24-bold tracking-tight">{title}</h2>
      {description && <p className="typo-14-medium text-gray-600">{description}</p>}
    </div>
  );
}

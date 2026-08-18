import type { StaticImageData } from "next/image";
import { Section, SectionHeading } from "@/shared/ui/section";
import ReviewCard from "./ReviewCard";
// 후기 사진 사용 예시:
// import review01 from "@/features/landing/assets/reviews/review-01.jpg";

interface Review {
  quote: string;
  author: string;
  role: string;
  image?: StaticImageData;
}

// INFO: 후기 문구는 시안 기준 임시 콘텐츠입니다. 확정 후기로 교체 예정.
// 사진은 src/features/landing/assets/reviews/ 에 저장 후 import 하여 image에 연결합니다. (예: image: review01)
const REVIEWS: Review[] = [
  {
    quote: "믿을 수 있는 친구가 추천해주니까 광고보다 훨씬 신뢰가 가요.",
    author: "김소연",
    role: "2년차 사용자",
  },
  {
    quote: "우리끼리만 아는 진짜 정보를 모아볼 수 있어서 쇼핑 실패가 줄었어요.",
    author: "박준호",
    role: "얼리 사용자",
  },
  {
    quote: "저장해둔 찐템을 필요할 때 바로 찾아볼 수 있어 편해요.",
    author: "이하늘",
    role: "일반 사용자",
  },
];

/**
 * "이미 쓰고 있어요" 사용자 후기 섹션입니다.
 * 모바일 터치 가로 스크롤(스냅)로 후기 카드를 넘겨봅니다.
 */
export default function Reviews() {
  return (
    <Section>
      <SectionHeading
        eyebrow="REAL REVIEW"
        title="이미 쓰고 있어요"
        description="진짜 써본 사람만 아는 찐후기"
      />

      <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 scrollbar-none">
        {REVIEWS.map((review) => (
          <li key={review.author} className="w-4/5 shrink-0 snap-start">
            <ReviewCard {...review} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

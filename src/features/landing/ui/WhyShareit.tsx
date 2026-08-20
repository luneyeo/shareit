import { Section, SectionHeading } from "@/shared/ui/section";

interface Feature {
  emoji: string;
  iconClassName: string;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    emoji: "🔒",
    iconClassName: "bg-[#FFF1E9]",
    title: "우리끼리만",
    description: "초대한 친구들끼리만 공유해요. 우리끼리만 아는 진짜 정보.",
  },
  {
    emoji: "⚡",
    iconClassName: "bg-[#EAF1FF]",
    title: "광고 없이",
    description: "협찬·광고 없이 직접 써본 사람의 솔직한 후기만 모아요.",
  },
  {
    emoji: "💗",
    iconClassName: "bg-[#FDE8F1]",
    title: "찜하고 저장",
    description: "마음에 드는 정보는 좋아요와 저장으로 언제든 다시 찾아봐요.",
  },
];

/**
 * "왜 Shareit인가요?" 서비스 강점을 아이콘 카드 목록으로 소개하는 섹션입니다.
 */
export default function WhyShareit() {
  return (
    <Section>
      <SectionHeading eyebrow="WHY SHAREIT" title="왜 Shareit인가요?" />

      <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="flex items-start gap-3 px-4 py-6">
            <span
              aria-hidden
              className={`flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-xl text-xl ${feature.iconClassName}`}
            >
              {feature.emoji}
            </span>
            <div>
              <h3 className="typo-16-bold">{feature.title}</h3>
              <p className="mt-1 typo-14-medium text-gray-500">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

import { Section, SectionHeading } from "@/shared/ui/section";

interface Step {
  no: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { no: 1, title: "그룹 만들기", description: "친구들과 나만의 그룹을 만들어요." },
  { no: 2, title: "친구 초대하기", description: "초대 코드로 믿을 수 있는 친구만 초대해요." },
  { no: 3, title: "정보 공유하기", description: "찐템 정보를 올리고 서로 나눠요." },
  {
    no: 4,
    title: "좋아요와 저장하기",
    description: "마음에 드는 정보는 좋아요와 저장으로 나중에 쉽게 찾아봐요.",
  },
];

/**
 * "이렇게 시작해요" 사용 흐름을 번호가 매겨진 단계 목록으로 소개하는 섹션입니다.
 * 각 단계는 원형 번호 배지와 세로 연결선으로 순서를 시각화합니다.
 */
export default function HowItWorks() {
  return (
    <Section className="px-10">
      <SectionHeading eyebrow="HOW IT WORKS" title="이렇게 시작해요" />

      <ol className="flex flex-col">
        {STEPS.map((step, index) => (
          <li key={step.no} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-primary-600 typo-14-bold text-white">
                {step.no}
              </span>
              {index < STEPS.length - 1 && <span className="my-1 w-0.5 flex-1 bg-primary-600/30" />}
            </div>
            <div className="pb-6">
              <h3 className="typo-16-bold">{step.title}</h3>
              <p className="mt-1 typo-14-medium text-gray-600">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

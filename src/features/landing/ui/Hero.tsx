import LogoText from "@/shared/assets/logo/logo-text.svg";

/**
 * 랜딩 최상단 히어로 영역입니다.
 *
 * 브랜드 워드마크와 핵심 카피(메인 헤딩·보조 설명)를 좌측 정렬로 배치합니다.
 * 페이지의 유일한 `h1`을 담당하며, 이후 섹션 제목은 `SectionHeading`의 `h2`가 됩니다.
 */
export default function Hero() {
  return (
    <section className="flex flex-col gap-12 px-5 pt-8">
      <h1 aria-label="Shareit">
        <LogoText aria-hidden className="block h-7 w-auto" />
      </h1>

      <div className="flex flex-col gap-3 pb-22 border-b border-gray-200">
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary-100 px-3 py-1.5 typo-14-semibold text-primary-700">
          ❤️‍🔥 초대받은 친구들과 공유
        </span>

        <p className="typo-32-bold">
          친구가 말해준 거잖아,
          <br />
          <span className="text-primary-600">믿어봐.</span>
        </p>

        <p className="typo-16-semibold text-gray-600">
          광고없이 아는 사람들끼리 나누는 찐템 정보!
          <br />
          초대된 친구들과 쉽게 빠르게 공유하세요.
        </p>
      </div>
    </section>
  );
}

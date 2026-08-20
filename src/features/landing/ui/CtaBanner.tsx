import Link from "next/link";

/**
 * 하단 전환 유도(CTA) 배너입니다. 주황 카드 안에서 회원가입 진입을 유도합니다.
 */
export default function CtaBanner() {
  return (
    <section className="px-8 py-12">
      <div className="flex flex-col items-center gap-2 rounded-3xl bg-primary-600 p-6 text-center text-white">
        <h2 className="text-[28px] font-bold pt-4">지금 시작해보세요!</h2>
        <p className="typo-16-bold text-white">친구들과 그룹을 만들고 공유를 시작하세요</p>
        <Link
          href="/auth"
          className="mt-6 inline-flex h-12.5 items-center gap-1 rounded-full bg-white px-14 typo-16-bold text-primary-600"
        >
          시작하기
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

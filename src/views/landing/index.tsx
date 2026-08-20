import {
  CtaBanner,
  Hero,
  HowItWorks,
  LandingFooter,
  RealShares,
  WhyShareit,
} from "@/features/landing/ui";

/**
 * 서비스 소개 및 진입점을 담당하는 랜딩 페이지 컴포넌트
 *
 * @example
 * import { LandingPage } from '@/views/landing'
 * export default LandingPage
 */
export function LandingPage() {
  return (
    <main className="flex flex-col bg-white">
      <Hero />
      <HowItWorks />
      <WhyShareit />
      <RealShares />
      {/* INFO: 실제 리뷰가 생기면 활용 */}
      {/* <Reviews /> */}
      <CtaBanner />
      <LandingFooter />
    </main>
  );
}

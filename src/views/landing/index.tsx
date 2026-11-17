import {
  CtaBanner,
  DemoCallout,
  Hero,
  HowItWorks,
  LandingFooter,
  RealShares,
  WhyShareit,
} from "@/features/landing/ui";

/**
 * 서비스 소개 및 진입점을 담당하는 랜딩 페이지 컴포넌트
 */
export function LandingPage() {
  return (
    <main className="flex flex-col bg-white">
      <Hero />
      <HowItWorks />
      <WhyShareit />
      <RealShares />
      <CtaBanner />
      <DemoCallout />
      <LandingFooter />
    </main>
  );
}

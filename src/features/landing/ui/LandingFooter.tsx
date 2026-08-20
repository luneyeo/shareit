import LogoText from "@/shared/assets/logo/logo-text.svg";

/**
 * 랜딩 페이지 하단 푸터입니다. 서비스 한 줄 소개와 저작권을 표시합니다.
 */
export default function LandingFooter() {
  return (
    <footer className="flex flex-col items-start gap-2 border-t border-gray-200 px-5 py-10">
      <LogoText role="img" aria-label="Shareit" className="h-6" />
      <p className="typo-13-medium text-gray-600 mt-6">
        광고 없이, 초대된 친구들끼리만 정보를 나누는 프라이빗 공유 서비스예요.
        <br />
        제안이나 문의는 언제든 환영해요.
      </p>
      <p className="typo-12-medium text-gray-400">© 2026 Shareit. All rights reserved.</p>
    </footer>
  );
}

import Link from "next/link";
import LogoText from "@/shared/assets/logo/logo-text.svg";

interface AuthIntroProps {
  /** 로고 아래에 표시할 안내 문구 (페이지별로 다르게 전달) */
  description: string;
}

/**
 * 인증(로그인/회원가입) 페이지 상단의 로고 + 안내 문구 영역입니다.
 *
 * 로고는 고정이며 안내 문구만 페이지별로 다르게 전달받아,
 * 로그인·회원가입 페이지가 공통으로 사용합니다.
 *
 * @example
 * <AuthIntro description="반가워요! 공유하고 싶은 제품 있으세요?" />
 */
export default function AuthIntro({ description }: AuthIntroProps) {
  return (
    <section className="flex flex-col items-center gap-3">
      <h1>
        <Link href="/" aria-label="홈으로 이동">
          <LogoText role="img" aria-label="Shareit!" className="h-auto w-50" />
        </Link>
      </h1>
      <p className="typo-16-medium text-gray-500">{description}</p>
    </section>
  );
}

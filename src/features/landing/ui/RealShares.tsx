import Image, { type StaticImageData } from "next/image";
import { Section, SectionHeading } from "@/shared/ui/section";

import productShareScreen from "@/features/landing/assets/screenshots/product-share.png";

const SCREENSHOT: StaticImageData | null = productShareScreen;

/**
 * "이런 정보가 오가요" 섹션입니다.
 * 실제 공유되는 상품 정보 화면의 캡처 스크린샷을 예시로 보여줍니다.
 * 스크린샷 에셋이 없으면 플레이스홀더로 대체합니다.
 */
export default function RealShares() {
  return (
    <Section>
      <SectionHeading
        eyebrow="REAL SHARES"
        title="이런 정보가 오가요"
        description="친구가 직접 써보고 추천한 찐템, 그대로 공유돼요"
      />

      <figure className="mx-auto w-4/5">
        {SCREENSHOT ? (
          <Image
            src={SCREENSHOT}
            alt="Shareit에서 친구에게 공유된 상품 정보 화면"
            sizes="(max-width: 480px) calc((100vw - 48px) * 0.8), 346px"
            className="w-full rounded-2xl border border-gray-200"
          />
        ) : (
          <div className="flex aspect-9/16 w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-100 text-center typo-13-medium text-gray-500">
            <span>
              상품 공유 화면 스크린샷
              <br />
              (준비 중)
            </span>
          </div>
        )}
        <figcaption className="sr-only">공유되는 상품 정보 화면 예시</figcaption>
      </figure>
    </Section>
  );
}

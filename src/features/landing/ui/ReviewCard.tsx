import Image, { type StaticImageData } from "next/image";
import { IcQuotes } from "@/shared/assets/icons";

interface ReviewCardProps {
  quote: string;
  author: string;
  role: string;
  /** 배경에 깔릴 사용자 사진. 없으면 그라데이션 플레이스홀더로 대체됩니다. */
  image?: StaticImageData;
}

/**
 * 사용자 후기 한 건을 보여주는 카드입니다.
 *
 * `image`가 있으면 배경 사진 위에 어두운 스크림을 얹어 흰 텍스트 가독성을 확보하고,
 * 없으면 그라데이션 플레이스홀더로 대체합니다.
 */
export default function ReviewCard({ quote, author, role, image }: ReviewCardProps) {
  return (
    <article className="relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-2xl bg-linear-to-b from-gray-500 to-gray-800 p-5 text-white">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 480px) 80vw, 384px"
            className="object-cover"
          />
          {/* 텍스트 가독성을 위한 어두운 스크림 */}
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 to-black/10" />
        </>
      )}

      <div className="relative">
        <IcQuotes aria-hidden className="h-6 w-6 opacity-80" />
        <blockquote className="mt-4 typo-16-semibold">&ldquo;{quote}&rdquo;</blockquote>
        <p className="mt-3 typo-13-medium text-white/80">
          {author} · {role}
        </p>
      </div>
    </article>
  );
}

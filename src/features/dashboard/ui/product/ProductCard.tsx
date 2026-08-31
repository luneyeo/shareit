import Image from "next/image";
import TagChip from "@/shared/ui/tag-chip/TagChip";
import Avatar from "@/shared/ui/avatar/Avatar";
import ImagePlaceholder from "@/shared/ui/image-placeholder/ImagePlaceholder";
import type { ProductDetail } from "@/features/dashboard/types";
import { formatPrice } from "@/shared/utils/formatPrice";

type ProductCardProps = Pick<ProductDetail, "prdName" | "price" | "imageUrl" | "tag" | "userId">;

/**
 * 상품 카드 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ProductCard
 *  prdName={product.prdName}
 *  price={product.price}
 *  imageUrl={product.imageUrl}
 *  tag={product.tag}
 *  userId={product.userId}
 * />
 * ```
 */
export default function ProductCard({ prdName, price, imageUrl, tag, userId }: ProductCardProps) {
  const firstImage = imageUrl?.[0];
  const firstTag = tag?.[0];

  return (
    <article className="flex flex-col rounded-2xl bg-white border border-gray-200">
      <div className="relative w-full h-40 overflow-hidden rounded-t-xl bg-gray-200">
        {firstImage ? (
          <Image src={firstImage} alt={prdName} fill className="object-cover" />
        ) : (
          <ImagePlaceholder size="sm" />
        )}
        {/* 대표 태그 1개를 이미지 좌측 하단에 오버레이한다. */}
        {firstTag && (
          <TagChip
            label={firstTag}
            className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] bg-white/80 py-1 shadow-sm"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-2.5">
        <div className="flex flex-col justify-center tracking-tight">
          <h3 className="typo-16-semibold text-gray-800 truncate">{prdName}</h3>
          <span className="typo-14-medium truncate">
            {price !== null ? `${formatPrice(price)}원` : "가격없음"}
          </span>
        </div>
        <Avatar seed={userId} size="sm" aria-label="등록자 프로필 아바타" />
      </div>
    </article>
  );
}

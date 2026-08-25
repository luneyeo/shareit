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
 *   prdName="2인용 텐트"
 *   price={5000}
 *   imageUrl={["/images/tent.jpg"]}
 *   tag={["캠핑"]}
 *   userId="user-uuid"
 * />
 * ```
 */
export default function ProductCard({ prdName, price, imageUrl, tag, userId }: ProductCardProps) {
  const firstImage = imageUrl?.[0];
  const tags = tag?.slice(0, 2);

  return (
    <article className="flex flex-col rounded-2xl bg-white border border-gray-200">
      <div className="relative w-full h-40 overflow-hidden rounded-t-xl bg-gray-200">
        {firstImage ? (
          <Image src={firstImage} alt={prdName} fill className="object-cover" />
        ) : (
          <ImagePlaceholder size="sm" />
        )}
      </div>
      <div className="flex flex-col gap-2 p-2.5">
        {tags && tags.length > 0 && (
          <div className="flex gap-1.5">
            {tags.map((t) => (
              <TagChip key={t} label={t} />
            ))}
          </div>
        )}
        <div className="flex flex-col justify-center tracking-tight">
          <h3 className="typo-16-medium text-gray-800">{prdName}</h3>
          {price !== null && <span className="typo-16-semibold">{formatPrice(price)}</span>}
        </div>
        <Avatar seed={userId} size="sm" aria-label="등록자 프로필 아바타" />
      </div>
    </article>
  );
}

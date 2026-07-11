import Image from "next/image";

import TagChip from "@/shared/ui/tag-chip/TagChip";
import Avatar from "@/shared/ui/avatar/Avatar";
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
    <h3 className="flex flex-col gap-3 rounded-2xl bg-white shadow-sm">
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-gray-200">
        {firstImage && <Image src={firstImage} alt={prdName} fill className="object-cover" />}
      </div>
      <div className="flex flex-col gap-2 p-2.5">
        {tags && (
          <div className="flex gap-1.5">
            {tags.map((t) => (
              <TagChip key={t} label={t} className="text-sm font-medium" />
            ))}
          </div>
        )}
        <div className="flex flex-col justify-center">
          <span className="font-medium text-gray-800">{prdName}</span>
          {price !== null && (
            <span className="font-semibold text-gray-900">{formatPrice(price)}</span>
          )}
        </div>
        <Avatar seed={userId} size="sm" aria-label="등록자 프로필 아바타" />
      </div>
    </h3>
  );
}

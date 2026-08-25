import Image from "next/image";
import ImagePlaceholder from "@/shared/ui/image-placeholder/ImagePlaceholder";
import type { ProductDetail } from "@/features/dashboard/types";

type ProductImageProps = Pick<ProductDetail, "imageUrl" | "prdName">;

/**
 * 상품 상세 페이지의 상품 사진 영역입니다.
 *
 * 대표 이미지(`imageUrl`의 첫 장)를 보여줍니다. 이미지가 없으면 플레이스홀더를 노출합니다.
 * (상단 뒤로가기·더보기 바는 `ProductDetailTopBar`가 화면 상단에 고정으로 담당합니다.)
 *
 * @example
 * <ProductImage imageUrl={product.imageUrl} prdName={product.prdName} />
 */
export default function ProductImage({ imageUrl, prdName }: ProductImageProps) {
  const mainImage = imageUrl?.[0];

  return (
    <div className="relative h-90 w-full overflow-hidden bg-gray-200">
      <div className="absolute top-0 left-0 z-10 h-15 w-full bg-linear-to-b from-black/10 to-transparent" />
      {mainImage ? (
        <Image src={mainImage} alt={prdName} fill className="object-cover" />
      ) : (
        <ImagePlaceholder size="lg" />
      )}
    </div>
  );
}

import Image from "next/image";
import { IcChevronLeft } from "@/shared/assets/icons";
import ImagePlaceholder from "@/shared/ui/image-placeholder/ImagePlaceholder";
import type { ProductDetail } from "@/features/dashboard/types";

type ProductImageProps = Pick<ProductDetail, "imageUrl" | "prdName"> & {
  /** 뒤로가기 버튼 클릭 핸들러. 없으면 버튼을 렌더링하지 않습니다. */
  onBack?: () => void;
};

/**
 * 상품 상세 페이지의 상품 사진 영역입니다.
 *
 * 정사각형 비율의 대표 이미지(`imageUrl`의 첫 장)를 보여주고, 좌측 상단에
 * 뒤로가기 버튼을 겹쳐 배치합니다. 이미지가 없으면 플레이스홀더를 노출합니다.
 *
 * @example
 * <ProductImage imageUrl={product.imageUrl} prdName={product.prdName} onBack={router.back} />
 */
export default function ProductImage({ imageUrl, prdName, onBack }: ProductImageProps) {
  const mainImage = imageUrl?.[0];

  return (
    <div className="relative h-85 w-full overflow-hidden bg-gray-200">
      <div className="absolute top-0 left-0 z-10 h-15 w-full bg-linear-to-b from-black/10 to-transparent" />
      {mainImage ? (
        <Image src={mainImage} alt={prdName} fill className="object-cover" />
      ) : (
        <ImagePlaceholder size="lg" />
      )}
      {onBack && (
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={onBack}
          className="absolute top-5 left-5 z-20 flex h-11.5 w-11.5 items-center justify-center rounded-xl bg-white/75 shadow-2xl"
        >
          <IcChevronLeft className="h-7.5 w-7.5" />
        </button>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ImagePlaceholder from "@/shared/ui/image-placeholder/ImagePlaceholder";
import type { ProductDetail } from "@/features/dashboard/types";

type ProductImageProps = Pick<ProductDetail, "imageUrl" | "prdName">;

/**
 * 상품 상세 페이지의 상품 사진 영역입니다.
 *
 * `imageUrl`의 모든 이미지를 embla 캐러셀로 슬라이드하며, 여러 장일 때 하단에 인디케이터를 노출합니다.
 * 이미지가 없으면 플레이스홀더를 보여줍니다.
 * (상단 뒤로가기·더보기 바는 `ProductDetailTopBar`가 화면 상단에 고정으로 담당합니다.)
 *
 * @example
 * <ProductImage imageUrl={product.imageUrl} prdName={product.prdName} />
 */
export default function ProductImage({ imageUrl, prdName }: ProductImageProps) {
  const images = imageUrl ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative h-90 w-full overflow-hidden bg-gray-200">
      <div className="absolute top-0 left-0 z-10 h-15 w-full bg-linear-to-b from-black/10 to-transparent" />

      {images.length > 0 ? (
        <>
          <div ref={emblaRef} className="h-full overflow-hidden">
            <div className="flex h-full">
              {images.map((src) => (
                <div key={src} className="relative h-full min-w-0 flex-[0_0_100%]">
                  <Image src={src} alt={prdName} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((src, index) => (
                <span
                  key={src}
                  className={`h-1.5 rounded-full bg-white transition-all ${
                    index === selectedIndex ? "w-4 opacity-100" : "w-1.5 opacity-50"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <ImagePlaceholder size="lg" />
      )}
    </div>
  );
}

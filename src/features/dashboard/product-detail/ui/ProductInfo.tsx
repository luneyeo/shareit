import type { ProductDetail } from "@/features/dashboard/types";
import { formatPrice } from "@/shared/utils/formatPrice";

type ProductInfoProps = Pick<ProductDetail, "brandName" | "prdName" | "price">;

/**
 * 상품 상세 페이지의 브랜드 및 상품 정보 영역입니다.
 *
 * 브랜드명 · 상품명(페이지 대표 제목) · 가격을 보여줍니다.
 *
 * @example
 * <ProductInfo brandName={product.brandName} prdName={product.prdName} price={product.price} />
 */
export default function ProductInfo({ brandName, prdName, price }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-1">
      {brandName && <p className="typo-14-medium text-gray-700 mb-1.5">{brandName}</p>}
      <h1 className="typo-20-semibold">{prdName}</h1>
      {price !== null && (
        <p className="typo-24-bold tracking-tight">
          {formatPrice(price)}
          <span className="typo-18-bold pl-0.5">원</span>
        </p>
      )}
    </div>
  );
}

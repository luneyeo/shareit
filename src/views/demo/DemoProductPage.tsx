"use client";

import { useParams, useRouter } from "next/navigation";
import ProductDetailTopBar from "@/features/dashboard/product-detail/ui/ProductDetailTopBar";
import ProductImage from "@/features/dashboard/product-detail/ui/ProductImage";
import ProductInfo from "@/features/dashboard/product-detail/ui/ProductInfo";
import ProductMeta from "@/features/dashboard/product-detail/ui/ProductMeta";
import ProductComment from "@/features/dashboard/product-detail/ui/ProductComment";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { DEMO_PRODUCTS_BY_ID } from "@/shared/mock/demoData";

export function DemoProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const router = useRouter();

  const product = Object.hasOwn(DEMO_PRODUCTS_BY_ID, productId)
    ? DEMO_PRODUCTS_BY_ID[productId]
    : undefined;

  return (
    <main>
      <ProductDetailTopBar onBack={() => router.back()} />

      {!product ? (
        <EmptyState
          type="notice"
          message="상품을 찾을 수 없어요"
          description="삭제되었거나 접근할 수 없는 상품이에요"
          className="min-h-dvh"
        />
      ) : (
        <>
          <ProductImage imageUrl={product.imageUrl} prdName={product.prdName} />

          <div className="flex flex-col gap-4 p-4.5">
            <ProductInfo
              brandName={product.brandName}
              prdName={product.prdName}
              price={product.price}
            />
            <hr className="border-gray-200" />
            <ProductMeta recommender={product.recommender} store={product.store} />
            <hr className="border-gray-200" />
            <ProductComment description={product.description} tag={product.tag} />
          </div>
        </>
      )}
    </main>
  );
}

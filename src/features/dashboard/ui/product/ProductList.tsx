"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { useGroupProducts } from "@/features/dashboard/api/useGroupProducts";
import ProductCard from "./ProductCard";

/**
 * 특정 그룹의 상품 목록 영역입니다.
 *
 * 유효한 그룹에 대해서만 마운트되므로, 유효하지 않은 groupId로는 조회가 실행되지 않습니다.
 * (실제 API 조회로 교체해도 이 컴포넌트가 마운트될 때만 요청이 발생하도록 유지)
 */
export default function ProductList({ groupId }: { groupId: string }) {
  const products = useGroupProducts(groupId);
  const router = useRouter();

  if (products.length === 0) {
    return (
      <EmptyState
        type="product"
        message="아직 등록된 상품이 없어요"
        description="첫 상품을 등록해보세요"
        className="min-h-[calc(100dvh-13rem-env(safe-area-inset-bottom))]"
        onAddProduct={() => router.push(`/dashboard/${groupId}/product/new`)}
      />
    );
  }

  return (
    <section aria-labelledby="product-list-heading" className="p-4.5">
      <h2 id="product-list-heading" className="sr-only">
        상품 목록
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            prdName={product.prdName}
            price={product.price}
            imageUrl={product.imageUrl}
            tag={product.tag}
            userId={product.userId}
          />
        ))}
      </div>
    </section>
  );
}

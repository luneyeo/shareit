"use client";

import { useParams } from "next/navigation";
import { useGroupProducts } from "@/features/dashboard/api/useGroupProducts";
import CategoryTabs from "@/features/dashboard/ui/CategoryTabs";
import GroupDropdown from "@/features/dashboard/ui/GroupDropdown";
import ProductCard from "@/features/dashboard/ui/ProductCard";
import { useMyGroups } from "@/shared/api/group/useMyGroups";

/**
 * 사용자 대시보드 페이지 컴포넌트
 *
 * @example
 * import { DashboardPage } from '@/views/dashboard'
 * export default DashboardPage
 */
export function DashboardPage() {
  const groups = useMyGroups();
  // 현재 그룹은 URL(/dashboard/[dashboardId])의 dashboardId에서 파생한다.
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const products = useGroupProducts(dashboardId);

  return (
    <>
      <div className="flex flex-col gap-5 p-5">
        <GroupDropdown groups={groups} currentGroupId={dashboardId} />
        <CategoryTabs />
      </div>
      <section aria-labelledby="product-list-heading" className="px-4.5 pb-4.5">
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
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IcChevronDown, IcSettings } from "@/shared/assets/icons";
import { DropdownProvider, DropdownTrigger, DropdownSelectMenu } from "@/shared/ui/dropdown";
import CategoryTabs from "@/features/dashboard/ui/CategoryTabs";
import ProductCard from "@/features/dashboard/ui/product/ProductCard";
import EmptyState from "@/shared/ui/empty-state/EmptyState";
import { DEMO_GROUPS, DEMO_PRODUCTS } from "@/shared/mock/demoData";
import { toast } from "@/shared/ui/feedback";

/**
 * 데모 대시보드 페이지 컴포넌트
 *
 * URL의 `group` 파라미터로 보여줄 그룹을 정한다.
 * (useSearchParams를 쓰므로 Suspense 경계 안에서 렌더한다.)
 */
export function DemoDashboardPage() {
  const searchParams = useSearchParams();

  return <DemoDashboardView rawGroupId={searchParams.get("group")} />;
}

interface DemoDashboardViewProps {
  /** URL에서 읽은 그룹 id. 없거나 유효하지 않으면 첫 번째 그룹을 보여준다. */
  rawGroupId: string | null;
}

/**
 * 데모 대시보드 화면 본문.
 *
 * 정적 HTML에도 담기도록 URL을 직접 읽지 않으며, Suspense fallback으로도 사용한다.
 */
export function DemoDashboardView({ rawGroupId }: DemoDashboardViewProps) {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);

  const currentGroup = DEMO_GROUPS.find((g) => g.id === rawGroupId) ?? DEMO_GROUPS[0];
  const groupId = currentGroup.id;
  const allProducts = DEMO_PRODUCTS[groupId] ?? [];
  const products = category ? allProducts.filter((p) => p.category === category) : allProducts;

  const handleGroupSelect = (id: string) => {
    setCategory(null);
    router.replace(`/demo?group=${id}`);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4.5 py-6">
        <DropdownProvider>
          <DropdownTrigger className="flex items-center gap-2">
            <h1 className="typo-20-bold">{currentGroup.name}</h1>
            <IcChevronDown className="h-6 w-6" />
          </DropdownTrigger>
          <DropdownSelectMenu
            className="left-0 top-full mt-2 min-w-64 p-3.5"
            options={DEMO_GROUPS.map((g) => ({
              value: g.id,
              label: g.name,
              description: `멤버 ${g.memberCount}명`,
            }))}
            selectedValue={groupId}
            onSelect={handleGroupSelect}
          />
        </DropdownProvider>
        {groupId === "demo-group-1" && (
          <Link href={`/demo/groups/${groupId}`} aria-label="그룹 설정" className="shrink-0">
            <IcSettings className="h-5 w-5 text-gray-700" />
          </Link>
        )}
      </div>

      <CategoryTabs selected={category} onSelect={setCategory} />

      {products.length === 0 ? (
        <EmptyState
          type="product"
          message="이 카테고리에 등록된 상품이 없어요"
          description="다른 카테고리를 선택해 보세요"
          onAddProduct={() => {
            toast.warning("데모에서는 상품을 등록할 수 없어요");
          }}
          className="min-h-[calc(100dvh-13rem-env(safe-area-inset-bottom))]"
        />
      ) : (
        <section className="p-4.5">
          <h2 className="sr-only">상품 목록</h2>
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/demo/product/${product.id}`}
                aria-label={`${product.prdName} 상세 보기`}
              >
                <ProductCard
                  prdName={product.prdName}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  tag={product.tag}
                  userId={product.userId}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

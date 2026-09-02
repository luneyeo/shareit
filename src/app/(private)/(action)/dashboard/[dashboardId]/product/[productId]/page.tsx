import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/utils/queryClient";
import { createClient } from "@/shared/lib/supabase/server";
import { getProduct } from "@/shared/api/product/getProduct";
import { queryKeys } from "@/shared/constants/queryKey";
import { ProductPage } from "@/views/dashboard/product-detail";

/**
 * 상품 상세를 서버에서 프리페치해 초기 HTML에 담는다.
 *
 * 클라이언트 전용 조회(useProductDetail)만 쓰면 가격 등 본문이 클라이언트 페인트로 밀려
 * LCP를 늦추므로, 같은 queryKey로 서버 프리페치 후 HydrationBoundary로 캐시를 넘긴다.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ dashboardId: string; productId: string }>;
}) {
  const { dashboardId, productId } = await params;
  const supabase = await createClient();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.detail(dashboardId, productId),
    queryFn: () => getProduct(supabase, dashboardId, productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage />
    </HydrationBoundary>
  );
}

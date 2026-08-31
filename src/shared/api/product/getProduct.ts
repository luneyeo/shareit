import { createClient } from "@/shared/lib/supabase/client";
import type { ProductDetail } from "./types";

/**
 * products_with_recommender 뷰 행. products 컬럼에 추천인 nickname이 조인되어 실려 온다.
 * 컬럼은 스네이크케이스이므로 도메인 타입으로 매핑한다.
 */
type ProductRow = {
  id: string;
  brand_name: string | null;
  prd_name: string;
  price: number | null;
  description: string | null;
  image_url: string[] | null;
  tag: string[] | null;
  category: string | null;
  store: string | null;
  user_id: string;
  nickname: string | null;
  group_id: number;
  created_at: string;
};

/**
 * 특정 대시보드(그룹)에 속한 개별 상품 하나를 조회한다.
 *
 * productId로 상품을 찾되, 그 상품의 group_id가 dashboardId와 일치하는 경우에만
 * 반환한다. (다른 대시보드의 상품을 이 경로로 열람하지 못하도록 범위를 제한한다.)
 * 조건에 맞는 상품이 없으면 `null`을 반환해 호출부가 "미존재" 상태를 구분하게 한다.
 */
export async function getProduct(
  dashboardId: string,
  productId: string
): Promise<ProductDetail | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products_with_recommender")
    .select(
      "id, brand_name, prd_name, price, description, image_url, tag, category, store, user_id, nickname, group_id, created_at"
    )
    .eq("id", productId)
    .eq("group_id", dashboardId)
    .maybeSingle<ProductRow>();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    brandName: data.brand_name,
    prdName: data.prd_name,
    price: data.price,
    description: data.description,
    imageUrl: data.image_url,
    tag: data.tag,
    category: data.category,
    store: data.store,
    userId: data.user_id,
    recommender: data.nickname,
    groupId: String(data.group_id),
    created_at: data.created_at,
  };
}

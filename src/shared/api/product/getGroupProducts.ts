import { createClient } from "@/shared/lib/supabase/client";
import type { ProductDetail } from "./types";

/** 상품 카드 렌더에 필요한 최소 필드만 담은 목록 아이템 타입. */
export type ProductListItem = Pick<
  ProductDetail,
  "id" | "prdName" | "price" | "imageUrl" | "tag" | "userId"
>;

/** products 테이블에서 카드에 필요한 컬럼만 담은 행. 스네이크케이스이므로 도메인 타입으로 매핑한다. */
type ProductRow = {
  id: string;
  prd_name: string;
  price: number | null;
  image_url: string[] | null;
  tag: string[] | null;
  user_id: string;
};

/**
 * 특정 대시보드(그룹)에 속한 상품 목록을 최신순으로 조회한다.
 *
 * 카드 렌더에 필요한 컬럼만 선택하고, 결과는 도메인 타입(카멜케이스)으로 매핑한다.
 * `category`가 주어지면(전체=null이 아니면) 해당 카테고리로만 필터한다.
 * 실패 시 에러를 throw해 호출부의 useQuery가 isError로 처리하게 한다.
 */
export async function getGroupProducts(
  groupId: string,
  category?: string | null
): Promise<ProductListItem[]> {
  const supabase = createClient();

  let query = supabase
    .from("products")
    .select("id, prd_name, price, image_url, tag, user_id")
    .eq("group_id", groupId)
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data, error } = await query.returns<ProductRow[]>();

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    prdName: row.prd_name,
    price: row.price,
    imageUrl: row.image_url,
    tag: row.tag,
    userId: row.user_id,
  }));
}

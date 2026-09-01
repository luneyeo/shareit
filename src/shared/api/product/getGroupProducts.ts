import { createClient } from "@/shared/lib/supabase/client";
import type { ProductDetail } from "./types";

/** 상품 카드 렌더에 필요한 최소 필드만 담은 목록 아이템 타입. */
export type ProductListItem = Pick<
  ProductDetail,
  "id" | "prdName" | "price" | "imageUrl" | "tag" | "userId"
>;

/** 다음 페이지 조회 기준점. 정렬 키(created_at)와 동점 방지용 id로 구성한 복합 커서. */
export type ProductCursor = { createdAt: string; id: string };

/** 상품 목록 한 페이지. nextCursor가 null이면 마지막 페이지다. */
export type ProductPage = { items: ProductListItem[]; nextCursor: ProductCursor | null };

/** 한 번에 조회하는 상품 수. */
export const PRODUCTS_PAGE_SIZE = 10;

/** products 테이블에서 카드 렌더 + 커서 계산에 필요한 컬럼만 담은 행. 스네이크케이스이므로 도메인 타입으로 매핑한다. */
type ProductRow = {
  id: string;
  prd_name: string;
  price: number | null;
  image_url: string[] | null;
  tag: string[] | null;
  user_id: string;
  created_at: string;
};

/**
 * 특정 대시보드(그룹)의 상품 한 페이지를 최신순으로 조회한다. (커서 기반 페이지네이션)
 *
 * `(created_at desc, id desc)` 정렬에 대해 복합 키셋 커서로 다음 페이지를 이어 받는다.
 * created_at 동점 시 순서가 흔들리거나 항목이 누락/중복되지 않도록 id를 보조 키로 쓴다.
 * PAGE_SIZE보다 1개 더 조회해, 초과분이 있으면 다음 페이지가 있다고 판단한다.
 *
 * `category`가 주어지면(전체=null이 아니면) 해당 카테고리로만 필터한다.
 * `cursor`가 없으면 첫 페이지를 조회한다.
 * 실패 시 에러를 throw해 호출부의 useInfiniteQuery가 isError로 처리하게 한다.
 */
export async function getGroupProducts(
  groupId: string,
  category?: string | null,
  cursor?: ProductCursor | null
): Promise<ProductPage> {
  const supabase = createClient();

  let query = supabase
    .from("products")
    .select("id, prd_name, price, image_url, tag, user_id, created_at")
    .eq("group_id", groupId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(PRODUCTS_PAGE_SIZE + 1);

  if (category) query = query.eq("category", category);

  // 커서(직전 페이지의 마지막 행)보다 뒤에 오는 행만 이어서 가져온다.
  // created_at이 더 과거이거나, created_at이 같으면 id가 더 작은 행. (복합 키셋)
  if (cursor) {
    query = query.or(
      `created_at.lt."${cursor.createdAt}",and(created_at.eq."${cursor.createdAt}",id.lt.${cursor.id})`
    );
  }

  const { data, error } = await query.returns<ProductRow[]>();

  if (error) throw error;

  const rows = data ?? [];
  // 초과분(PAGE_SIZE+1번째)이 있으면 다음 페이지가 존재한다. 실제 반환은 PAGE_SIZE개까지만.
  const hasMore = rows.length > PRODUCTS_PAGE_SIZE;
  const pageRows = hasMore ? rows.slice(0, PRODUCTS_PAGE_SIZE) : rows;

  const items = pageRows.map((row) => ({
    id: row.id,
    prdName: row.prd_name,
    price: row.price,
    imageUrl: row.image_url,
    tag: row.tag,
    userId: row.user_id,
  }));

  const last = pageRows.at(-1);
  const nextCursor = hasMore && last ? { createdAt: last.created_at, id: last.id } : null;

  return { items, nextCursor };
}

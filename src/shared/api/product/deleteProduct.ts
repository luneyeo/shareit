import { createClient } from "@/shared/lib/supabase/client";

/**
 * 상품을 products 테이블에서 삭제한다.
 *
 * 등록자 본인만 삭제할 수 있다(RLS: user_id = auth.uid()).
 * 실패 시 에러를 throw해 mutation의 onError/isError로 처리할 수 있게 한다.
 */
export async function deleteProduct(productId: string): Promise<void> {
  const supabase = createClient();

  const { data, error } = await supabase.from("products").delete().eq("id", productId).select("id");

  if (error) throw error;

  // RLS로 막혔거나 대상이 없어 0행이 삭제되면 Supabase는 에러를 주지 않는다.
  // 가짜 성공으로 넘어가지 않도록 삭제된 행이 없으면 실패로 처리한다.
  if (!data?.length) throw new Error("상품을 삭제할 권한이 없거나 대상이 존재하지 않습니다.");
}

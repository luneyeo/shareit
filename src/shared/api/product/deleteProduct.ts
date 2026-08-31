import { createClient } from "@/shared/lib/supabase/client";

const BUCKET = "product-images";

/**
 * 공개 URL에서 버킷 내부 객체 경로({uid}/{uuid}.{ext})를 뽑아낸다.
 * URL 형식이 예상과 다르면(마커 없음) null을 반환해 정리 대상에서 제외한다.
 */
function toStoragePath(publicUrl: string): string | null {
  const marker = `/${BUCKET}/`;
  const index = publicUrl.indexOf(marker);
  return index === -1 ? null : publicUrl.slice(index + marker.length);
}

/**
 * 상품을 products 테이블에서 삭제하고, 참조가 사라진 Storage 이미지도 함께 정리한다.
 *
 * 등록자 본인만 삭제할 수 있다(RLS: user_id = auth.uid()). 이미지 경로는 행 삭제 후엔
 * 알 수 없으므로 미리 조회한다. 행 삭제(권한 판정의 기준)가 확정된 뒤에만 객체를 제거한다.
 *
 * 실패 시 에러를 throw해 mutation의 onError/isError로 처리할 수 있게 한다.
 */
export async function deleteProduct(productId: string): Promise<void> {
  const supabase = createClient();

  // 정리할 이미지 경로를 행 삭제 전에 확보한다.
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", productId)
    .maybeSingle<{ image_url: string[] | null }>();
  if (fetchError) throw fetchError;

  const { data, error } = await supabase.from("products").delete().eq("id", productId).select("id");
  if (error) throw error;

  // RLS로 막혔거나 대상이 없어 0행이 삭제되면 Supabase는 에러를 주지 않는다.
  // 가짜 성공으로 넘어가지 않도록 삭제된 행이 없으면 실패로 처리한다.
  if (!data?.length) throw new Error("상품을 삭제할 권한이 없거나 대상이 존재하지 않습니다.");

  // 행 삭제가 확정된 뒤에만 Storage 객체를 정리한다.
  const paths = (product?.image_url ?? [])
    .map(toStoragePath)
    .filter((path): path is string => path !== null);
  if (paths.length === 0) return;

  const { error: removeError } = await supabase.storage.from(BUCKET).remove(paths);
  // 이미지 정리 실패가 상품 삭제 자체를 되돌리진 않는다(행은 이미 삭제됨). 잔여 객체는 로깅만 한다.
  if (removeError) console.error("상품 이미지 정리 실패:", removeError.message);
}

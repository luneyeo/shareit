import { createClient } from "@/shared/lib/supabase/client";

/** 상품 수정에 필요한 값. 편집 가능한 필드 + 대상 상품 id. */
export interface UpdateProductParams {
  productId: string;
  brandName: string;
  prdName: string;
  category: string;
  /** 폼에서 문자열로 다루며, 저장 시 number로 변환한다. */
  price: string;
  /** 구매처. */
  store: string;
  description: string;
  /** 유지할 기존 URL + 새로 업로드한 URL을 합친 최종 이미지 URL 배열. */
  imageUrl: string[];
  tag: string[];
}

/**
 * 상품을 products 테이블에서 수정한다.
 *
 * 등록과 달리 소속(group_id)·등록자(user_id)는 바꾸지 않고 편집 가능한 컬럼만 갱신한다.
 * 컬럼은 스네이크케이스이므로 폼 값(카멜케이스)을 매핑하고, 선택 입력의 빈 값은 nullable
 * 컬럼에 맞춰 null로 저장한다.
 *
 * 실패 시 에러를 throw해 mutation의 onError/isError로 처리할 수 있게 한다.
 */
export async function updateProduct({ productId, ...params }: UpdateProductParams): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("products")
    .update({
      brand_name: params.brandName || null,
      prd_name: params.prdName,
      category: params.category || null,
      price: params.price ? Number(params.price) : null,
      store: params.store || null,
      description: params.description || null,
      image_url: params.imageUrl.length ? params.imageUrl : null,
      tag: params.tag.length ? params.tag : null,
    })
    .eq("id", productId);

  if (error) throw error;
}

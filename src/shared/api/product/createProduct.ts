import { createClient } from "@/shared/lib/supabase/client";

/** 상품 등록에 필요한 값. 폼 값(카멜케이스) + 업로드된 이미지 URL + 대상 대시보드 id. */
export interface CreateProductParams {
  brandName: string;
  prdName: string;
  category: string;
  /** 폼에서 문자열로 다루며, 등록 시 number로 변환한다. */
  price: string;
  /** 구매처. DB의 store 컬럼에 저장한다. */
  purchasePlace: string;
  description: string;
  /** Storage 업로드 후 받은 공개 URL 배열. */
  imageUrl: string[];
  tag: string[];
  /** 상품이 속할 대시보드(그룹) id. */
  groupId: string;
}

/**
 * 상품을 products 테이블에 등록한다.
 *
 * 컬럼은 스네이크케이스이므로 폼 값(카멜케이스)을 매핑하고, 선택 입력의 빈 값은
 * 컬럼이 nullable이라 null로 저장한다. `user_id`는 세션의 사용자로, `group_id`는
 * 전달된 대시보드 하나를 담은 배열로 설정한다.
 *
 * 실패 시 에러를 throw해 mutation의 onError/isError로 처리할 수 있게 한다.
 *
 * @returns 생성된 상품 id
 */
export async function createProduct(params: CreateProductParams): Promise<string> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("products")
    .insert({
      brand_name: params.brandName || null,
      prd_name: params.prdName,
      category: params.category || null,
      price: params.price ? Number(params.price) : null,
      store: params.purchasePlace || null,
      description: params.description || null,
      image_url: params.imageUrl.length ? params.imageUrl : null,
      tag: params.tag.length ? params.tag : null,
      group_id: [params.groupId],
      user_id: userId,
    })
    .select("id")
    .single<{ id: string }>();

  if (error) throw error;

  return data.id;
}

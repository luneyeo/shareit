/** 상품 상세 도메인 타입. DB 조회 결과를 카멜케이스로 매핑한 형태. */
export interface ProductDetail {
  id: string;
  brandName: string | null;
  prdName: string;
  price: number | null;
  description: string | null;
  imageUrl: string[] | null;
  tag: string[] | null;
  category: string | null;
  /** 구매처. */
  store: string | null;
  userId: string;
  /** 상품을 등록한 사람(추천인)의 닉네임. products_with_recommender 뷰에서 조인해 온다. */
  recommender: string | null;
  groupId: string[] | null;
  created_at: string;
}

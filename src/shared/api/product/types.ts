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
  userId: string;
  groupId: string[] | null;
  created_at: string;
}

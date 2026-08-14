import type { ProductDetail } from "@/features/dashboard/types";

type ProductCardData = Pick<
  ProductDetail,
  "id" | "prdName" | "price" | "imageUrl" | "tag" | "userId"
>;

const MOCK_TAGS = ["캠핑", "아웃도어", "가전", "패션"];

/**
 * 특정 그룹의 상품 목록을 반환한다.
 *
 * TODO: API 연동 전까지 사용하는 임시 목업. groupId로 10개를 생성한다.
 * Supabase 연동 시 groupId로 실제 상품을 조회(useQuery)하도록 교체.
 */
export function useGroupProducts(groupId: string): ProductCardData[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${groupId}-p${i + 1}`,
    prdName: `상품 ${i + 1}`,
    price: (i + 1) * 5000,
    // next.config에 외부 이미지 도메인이 없어 목업은 이미지 없이 플레이스홀더로 렌더한다.
    imageUrl: null,
    tag: [MOCK_TAGS[i % MOCK_TAGS.length]],
    userId: `user-${groupId}-${i + 1}`,
  }));
}

import Profile from "@/shared/ui/profile/Profile";

type ProductMetaProps = {
  /** 상품을 추천한 사람의 이름. */
  recommender: string;
  /** TODO: 구매처. `ProductDetail`에는 추가 예정으로, 별도로 주입합니다. */
  store: string | null;
};

/**
 * 상품 상세 페이지의 추천인·구매처 영역입니다.
 *
 * 좌측에 추천인(아바타 + 이름), 우측에 구매처를 한 줄로 나란히 배치합니다.
 *
 * @example
 * <ProductMeta recommender={nickname} store={store} />
 */
export default function ProductMeta({ recommender, store }: ProductMetaProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex-1">
        <p className="typo-14-medium text-gray-500">추천인</p>
        <div className="mt-1">
          <Profile name={recommender} size="sm" />
        </div>
      </div>
      {store && (
        <div className="flex-1">
          <p className="typo-14-medium text-gray-500">구매처</p>
          <p className="mt-1 typo-14-medium">{store}</p>
        </div>
      )}
    </div>
  );
}

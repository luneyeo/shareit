import { IcBookmark, IcChevronLeft, IcHeartFilled, IcHeartOutlined } from "@/shared/assets/icons";
import Button from "@/shared/ui/button/Button";
import Profile from "@/shared/ui/profile/Profile";
import TagChip from "@/shared/ui/tag-chip/TagChip";
import { formatPrice } from "@/shared/utils/formatPrice";

// INFO: 공유 화면 예시를 보여주기 위한 샘플 데이터입니다. (실제 상품 데이터 아님)
const SAMPLE = {
  category: "오디어",
  name: "오디어 마일드 선크림",
  price: 18000,
  recommender: "여루나",
  store: "올리브영",
  tags: ["속건조", "최고", "순함", "데일리"],
  comment:
    "진짜 개촉촉하고 화장할 때 안 밀림. 세일할 때 사면 가끔 쿠팡이 싼 듯. 원래 24,000원인데 할인 받아서 만팔천원에 구매함.",
};

/**
 *
 * TODO: 상품 상세 페이지 구현 시 `features/dashboard/product-detail/ui`로 이동하여
 * 재사용한다. 하드코딩된 SAMPLE → props(실제 `ProductDetail` 데이터), 장식용
 * aria-hidden 버튼 → 실제 동작하는 `ProductDetailFooter`로 일반화가 필요하다.
 */
export default function ProductPreviewCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200">
        <span
          aria-hidden
          className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80"
        >
          <IcChevronLeft className="h-5 w-5" />
        </span>
      </div>

      <div>
        <p className="typo-12-medium text-gray-500">{SAMPLE.category}</p>
        <div className="flex items-center justify-between">
          <h3 className="typo-18-bold">{SAMPLE.name}</h3>
          <IcHeartOutlined aria-hidden className="h-6 w-6" />
        </div>
        <p className="mt-0.5 typo-16-semibold">{formatPrice(SAMPLE.price)}</p>
      </div>

      <hr className="border-gray-200" />

      <dl className="flex flex-col gap-3">
        <div>
          <dt className="typo-12-medium text-gray-500">추천인</dt>
          <dd className="mt-1">
            <Profile name={SAMPLE.recommender} size="sm" />
          </dd>
        </div>
        <div>
          <dt className="typo-12-medium text-gray-500">구매처</dt>
          <dd className="mt-1 typo-14-medium text-gray-800">{SAMPLE.store}</dd>
        </div>
        <div>
          <dt className="typo-12-medium text-gray-500">태그</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {SAMPLE.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </dd>
        </div>
      </dl>

      <hr className="border-gray-200" />

      <div>
        <p className="typo-14-bold text-primary-600">코멘트</p>
        <p className="mt-1 typo-14-medium text-gray-700">{SAMPLE.comment}</p>
      </div>

      <div aria-hidden className="flex gap-2">
        <Button
          theme="secondary"
          size="lg"
          className="flex-1"
          icon={<IcBookmark className="h-5 w-5" />}
        >
          저장하기
        </Button>
        <Button
          theme="primary"
          size="lg"
          className="flex-1"
          icon={<IcHeartFilled className="h-5 w-5" />}
        >
          좋아요
        </Button>
      </div>
    </div>
  );
}

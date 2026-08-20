import { IcBookmark, IcHeartFilled } from "@/shared/assets/icons";
import Button from "@/shared/ui/button/Button";
import ActionFooter from "@/shared/ui/footer/action/ActionFooter";

type ProductDetailFooterProps = {
  /** 저장하기(북마크) 클릭 핸들러 */
  onSave: () => void;
  /** 좋아요(하트) 클릭 핸들러 */
  onLike: () => void;
};

/**
 * 상품 상세 페이지 하단의 액션 푸터입니다.
 *
 * 공통 `ActionFooter`(버튼 2개 → 사이 간격) 위에 저장하기·좋아요 버튼을 배치합니다.
 * 하단 기본 메뉴 탭바를 대체하며, 각 버튼의 동작은 props로 주입합니다.
 *
 * - `onSave`: 저장하기(북마크) 클릭 핸들러
 * - `onLike`: 좋아요(하트) 클릭 핸들러
 *
 * @example
 * <ProductDetailFooter onSave={handleSave} onLike={handleLike} />
 */
export default function ProductDetailFooter({ onSave, onLike }: ProductDetailFooterProps) {
  return (
    <ActionFooter>
      <Button
        type="button"
        theme="secondary"
        size="lg"
        className="flex-1"
        icon={<IcBookmark className="h-5 w-5" />}
        onClick={onSave}
      >
        저장하기
      </Button>
      <Button
        type="button"
        theme="primary"
        size="lg"
        className="flex-1"
        icon={<IcHeartFilled className="h-5 w-5" />}
        onClick={onLike}
      >
        좋아요
      </Button>
    </ActionFooter>
  );
}

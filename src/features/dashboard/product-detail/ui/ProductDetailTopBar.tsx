import { IcChevronLeft, IcMore } from "@/shared/assets/icons";

type ProductDetailTopBarProps = {
  /** 뒤로가기 버튼 클릭 핸들러. 없으면 버튼을 렌더링하지 않습니다. */
  onBack?: () => void;
  /** 더보기 버튼 클릭 핸들러. 없으면 버튼을 렌더링하지 않습니다. */
  onMore?: () => void;
};

const BUTTON_CLASS =
  "flex h-11.5 w-11.5 items-center justify-center rounded-xl bg-white/80 shadow-md";

/**
 * 상품 상세 페이지 상단의 고정 바입니다.
 *
 * 같은 높이에 뒤로가기(좌)·더보기(우) 버튼을 배치하고, 화면 상단에 `fixed`로
 * 붙어 스크롤해도 계속 노출됩니다. (앱 프레임 기준으로 고정)
 *
 * @example
 * <ProductDetailTopBar onBack={router.back} onMore={openActionSheet} />
 */
export default function ProductDetailTopBar({ onBack, onMore }: ProductDetailTopBarProps) {
  return (
    <div className="fixed inset-x-0 top-0 z-header flex items-center justify-between px-5 pt-5">
      {onBack ? (
        <button type="button" aria-label="뒤로가기" onClick={onBack} className={BUTTON_CLASS}>
          <IcChevronLeft className="h-7.5 w-7.5" />
        </button>
      ) : (
        <span />
      )}
      {onMore && (
        <button type="button" aria-label="더보기" onClick={onMore} className={BUTTON_CLASS}>
          <IcMore className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

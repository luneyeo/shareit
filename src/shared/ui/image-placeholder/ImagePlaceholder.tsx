import { IcPlaceholder } from "@/shared/assets/icons";

const ICON_SIZE = {
  sm: "w-8",
  lg: "w-15",
} as const;

type ImagePlaceholderProps = {
  /** 아이콘 크기. 대시보드 카드는 `sm`, 상품 상세는 `lg`를 사용합니다. */
  size?: keyof typeof ICON_SIZE;
};

/**
 * 상품 이미지가 없을 때 자리를 채우는 플레이스홀더입니다.
 *
 * 부모 영역을 가득 채우고(`h-full w-full`) 가운데에 placeholder 아이콘을 놓으므로,
 * 실제 크기는 부모 컨테이너가 결정합니다. 아이콘 크기만 `size`로 구분합니다.
 *
 * @example
 * <ImagePlaceholder size="lg" />
 */
export default function ImagePlaceholder({ size = "lg" }: ImagePlaceholderProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF7F4]">
      <IcPlaceholder className={`${ICON_SIZE[size]} h-auto`} />
    </div>
  );
}

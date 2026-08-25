import TagChip from "@/shared/ui/tag-chip/TagChip";
import type { ProductDetail } from "@/features/dashboard/types";

type ProductCommentProps = Pick<ProductDetail, "description" | "tag">;

/**
 * 상품 상세 페이지의 코멘트 영역입니다.
 *
 * "코멘트" 제목 아래에 추천인의 코멘트(`description`)와 태그 목록(`tag`)을 보여줍니다.
 * 태그는 없으면 아무것도 렌더링하지 않습니다.
 *
 * @example
 * <ProductComment description={product.description} tag={product.tag} />
 */
export default function ProductComment({ description, tag }: ProductCommentProps) {
  const hasTags = tag !== null && tag.length > 0;
  const displayDescription = description ? description : "설명이 없습니다.";

  return (
    <section className="flex flex-col gap-3">
      <h2 className="typo-16-bold text-primary-600">코멘트</h2>
      <p className="typo-16-semibold text-gray-700 leading-relaxed">{displayDescription}</p>
      {hasTags && (
        <ul className="flex flex-wrap gap-1.5">
          {tag.map((t) => (
            <li key={t}>
              <TagChip label={t} className="typo-14-medium py-1" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

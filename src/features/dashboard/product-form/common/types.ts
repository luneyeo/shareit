import type { z } from "zod";
import type { productFormSchema } from "./schema";

/**
 * 상품 등록·수정 폼이 다루는 값입니다. `productFormSchema`(zod)에서 파생해
 * 스키마와 타입을 단일 소스로 유지합니다.
 *
 * 대부분 도메인 타입 `ProductDetail`의 입력 필드명을 따라 페이지에서의 매핑 비용을
 * 줄입니다. 다만 `purchasePlace`(구매처)는 `ProductDetail`에 없는 폼 전용 값이고,
 * `price`(구매가격)는 입력 편의를 위해 문자열로 다루며 제출 시 number로 변환합니다.
 * (id·userId·created_at 등 서버가 채우는 값은 폼이 다루지 않습니다.)
 */
export type ProductFormValues = z.infer<typeof productFormSchema>;

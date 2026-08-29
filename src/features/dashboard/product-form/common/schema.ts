import { z } from "zod";
import { PRODUCT_FORM_ERROR } from "@/features/dashboard/constants/messages";

/**
 * 상품 등록·수정 폼의 유효성 스키마입니다. 등록/수정이 동일한 폼을 공유하므로
 * 스키마도 공용으로 두고, `useProductForm`이 `zodResolver`로 연결합니다.
 *
 * `price`·`purchasePlace`·`tag`는 선택 입력이라 빈 값을 허용합니다. `price`는
 * 입력 편의를 위해 문자열로 다루며 제출 시 number로 변환합니다.
 */
export const productFormSchema = z.object({
  brandName: z.string().min(1, PRODUCT_FORM_ERROR.BRAND_NAME),
  prdName: z.string().min(1, PRODUCT_FORM_ERROR.PRD_NAME),
  category: z.string().min(1, PRODUCT_FORM_ERROR.CATEGORY),
  price: z.string(),
  purchasePlace: z.string(),
  description: z.string().min(1, PRODUCT_FORM_ERROR.DESCRIPTION),
  imageUrl: z.array(z.string()).min(1, PRODUCT_FORM_ERROR.IMAGE),
  tag: z.array(z.string()),
});

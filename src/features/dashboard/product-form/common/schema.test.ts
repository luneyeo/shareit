import {
  productFormSchema,
  type ProductFormValues,
} from "@/features/dashboard/product-form/common/schema";
import { PRODUCT_FORM_ERROR } from "@/features/dashboard/constants/messages";

/** 필수(prdName·category)만 채우고 나머지는 빈 값으로 둔 기본 폼 값. */
function baseValues(override: Partial<ProductFormValues> = {}): ProductFormValues {
  return {
    brandName: "",
    prdName: "니트",
    category: "의류",
    price: "",
    store: "",
    description: "",
    imageUrl: [],
    imageFiles: [],
    tag: [],
    ...override,
  };
}

describe("productFormSchema", () => {
  it("필수값(prdName·category)만 있으면 나머지가 비어도 통과한다", () => {
    expect(productFormSchema.safeParse(baseValues()).success).toBe(true);
  });

  it("prdName이 비면 PRD_NAME 에러를 낸다", () => {
    const result = productFormSchema.safeParse(baseValues({ prdName: "" }));

    expect(result.success).toBe(false);
    const message = result.error?.issues.find((i) => i.path[0] === "prdName")?.message;
    expect(message).toBe(PRODUCT_FORM_ERROR.PRD_NAME);
  });

  it("category가 비면 CATEGORY 에러를 낸다", () => {
    const result = productFormSchema.safeParse(baseValues({ category: "" }));

    expect(result.success).toBe(false);
    const message = result.error?.issues.find((i) => i.path[0] === "category")?.message;
    expect(message).toBe(PRODUCT_FORM_ERROR.CATEGORY);
  });

  it("선택 필드를 모두 채워도 통과한다", () => {
    const filled = baseValues({
      brandName: "브랜드",
      price: "10000",
      store: "스토어",
      description: "설명",
      imageUrl: ["https://example.com/a.jpg"],
      tag: ["봄", "니트"],
    });

    expect(productFormSchema.safeParse(filled).success).toBe(true);
  });
});

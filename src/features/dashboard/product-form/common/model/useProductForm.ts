"use client";

import { useForm } from "react-hook-form";
import type { ProductFormValues } from "./types";

/** 등록 폼의 빈 초기값. 수정 시에는 이 위에 기존 상품 값을 덮어씁니다. */
export const PRODUCT_FORM_DEFAULTS: ProductFormValues = {
  brandName: "",
  prdName: "",
  category: "",
  price: "",
  purchasePlace: "",
  description: "",
  imageUrl: [],
  tag: [],
};

/**
 * 상품 등록·수정 폼의 react-hook-form 인스턴스를 생성합니다.
 *
 * `defaultValues`(수정 시 기존 상품)를 빈 기본값 위에 덮어써 등록/수정이 동일한
 * 폼을 공유하도록 합니다. `mode: "onChange"`로 입력 즉시 유효성을 반영해 제출 버튼
 * 활성화(`isValid`)에 사용합니다.
 */
export function useProductForm(defaultValues?: Partial<ProductFormValues>) {
  return useForm<ProductFormValues>({
    mode: "onChange",
    defaultValues: { ...PRODUCT_FORM_DEFAULTS, ...defaultValues },
  });
}

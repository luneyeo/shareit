"use client";

import FormInput from "@/shared/ui/form/FormInput";
import FormTextarea from "@/shared/ui/form/FormTextarea";
import type { ProductFormValues } from "../schema";
import { useProductForm } from "../hooks/useProductForm";
import ProductCategoryField from "./fields/ProductCategoryField";
import ProductImageField from "./fields/ProductImageField";
import ProductTagsField from "./fields/ProductTagsField";
import ProductFormFooter from "./ProductFormFooter";

type ProductFormProps = {
  /** 초기값. 등록 시 생략하고, 수정 시 기존 상품 값을 전달합니다. */
  defaultValues?: Partial<ProductFormValues>;
  /** 제출 버튼 문구. 예: "등록하기" | "수정하기" */
  submitLabel: string;
  /** 유효성 통과 시 폼 값과 함께 호출됩니다. */
  onSubmit: (values: ProductFormValues) => void;
  /** 제출 진행 중 버튼 비활성화 */
  isSubmitting?: boolean;
};

/**
 * 상품 등록·수정 페이지가 공유하는 폼 조합 컴포넌트입니다.
 *
 * 필드 구성·레이아웃·제출 푸터를 한곳에 모으고, 유효성은 `productFormSchema`(zod)로
 * 관리합니다. 등록/수정 차이는 `defaultValues`·`submitLabel`·`onSubmit` 주입만으로
 * 처리합니다. 상태는 react-hook-form으로 관리하며, 비네이티브 필드(이미지·카테고리·태그)는
 * 각 `*Field`가 `Controller`로 감싼 controlled 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * // 등록
 * <ProductForm submitLabel="등록하기" onSubmit={handleCreate} />
 *
 * // 수정
 * <ProductForm defaultValues={product} submitLabel="수정하기" onSubmit={handleUpdate} />
 * ```
 */
export default function ProductForm({
  defaultValues,
  submitLabel,
  onSubmit,
  isSubmitting,
}: ProductFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useProductForm(defaultValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 px-6 pt-4 pb-28">
      <ProductImageField control={control} />
      <FormInput
        label="브랜드명"
        placeholder="브랜드명을 입력해주세요"
        error={errors.brandName?.message}
        {...register("brandName")}
      />
      <FormInput
        label="제품명"
        required
        placeholder="제품명을 입력해주세요"
        error={errors.prdName?.message}
        {...register("prdName")}
      />
      <ProductCategoryField control={control} />
      <FormInput
        label="구매 가격"
        type="number"
        inputMode="numeric"
        min={0}
        placeholder="구매 가격을 입력해주세요"
        {...register("price")}
      />
      <FormInput
        label="구매처"
        placeholder="구매처를 입력해주세요"
        {...register("purchasePlace")}
      />
      <FormTextarea
        label="설명"
        placeholder="제품 설명을 입력해주세요"
        {...register("description")}
      />
      <ProductTagsField control={control} />
      <ProductFormFooter
        submitLabel={submitLabel}
        onSubmit={handleSubmit(onSubmit)}
        disabled={!isValid || isSubmitting}
      />
    </form>
  );
}

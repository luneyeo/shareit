"use client";

import { type Control, Controller } from "react-hook-form";
import { IcChevronDown } from "@/shared/assets/icons";
import { CATEGORIES } from "@/shared/constants/category";
import { cn } from "@/shared/utils/cn";
import { DropdownProvider, DropdownSelectMenu, DropdownTrigger } from "@/shared/ui/dropdown";
import FieldError from "@/shared/ui/form/FieldError";
import Label from "@/shared/ui/label/Label";
import type { ProductFormValues } from "../../types";

type ProductCategoryFieldProps = {
  control: Control<ProductFormValues>;
};

/** 제품 카테고리 선택 필드입니다. (뷰티/라이프 스타일/예술 중 택1, 드롭다운) */
export default function ProductCategoryField({ control }: ProductCategoryFieldProps) {
  return (
    <Controller
      control={control}
      name="category"
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2.5">
          <Label required>카테고리</Label>
          <DropdownProvider className="w-full">
            <DropdownTrigger
              className={cn(
                "flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 typo-16-medium",
                fieldState.error ? "border-error" : "border-gray-300"
              )}
            >
              <span className={field.value ? undefined : "text-gray-400"}>
                {field.value || "카테고리를 선택해 주세요"}
              </span>
              <IcChevronDown className="h-6 w-6 text-gray-400" />
            </DropdownTrigger>
            <DropdownSelectMenu
              className="left-0 top-full mt-2 w-full p-2"
              options={CATEGORIES.map((category) => ({ value: category, label: category }))}
              selectedValue={field.value || undefined}
              onSelect={field.onChange}
            />
          </DropdownProvider>
          <FieldError message={fieldState.error?.message} />
        </div>
      )}
    />
  );
}

"use client";

import { useRef } from "react";
import { type Control, Controller } from "react-hook-form";
import { IcClose, IcPlus } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";
import FieldError from "@/shared/ui/form/FieldError";
import Label from "@/shared/ui/label/Label";
import type { ProductFormValues } from "../../model/types";

type ProductImageFieldProps = {
  control: Control<ProductFormValues>;
};

/**
 * 제품 이미지 업로드 필드입니다. (현재 1장)
 *
 * TODO: 실제 Supabase Storage 업로드는 별도 이슈로 연결합니다.
 *       지금은 선택한 파일의 로컬 미리보기 URL(objectURL)만 값으로 사용합니다.
 */
export default function ProductImageField({ control }: ProductImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name="imageUrl"
      rules={{ validate: (value) => value.length > 0 || "제품 이미지를 등록해주세요" }}
      render={({ field, fieldState }) => {
        const preview = field.value[0];

        const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          // TODO: Storage 업로드 후 반환 URL로 교체.
          field.onChange([URL.createObjectURL(file)]);
        };

        return (
          <div className="flex flex-col gap-2.5">
            <Label required>제품 이미지</Label>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSelect}
            />
            {preview ? (
              <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element -- 로컬 objectURL 미리보기라 next/image 최적화 대상이 아님 */}
                <img
                  src={preview}
                  alt="제품 이미지 미리보기"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  aria-label="이미지 삭제"
                  onClick={() => field.onChange([])}
                  className="absolute right-1.5 top-1.5 rounded-full bg-black/50 p-1"
                >
                  <IcClose className="h-4 w-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                aria-label="제품 이미지 추가"
                onClick={() => inputRef.current?.click()}
                className={cn(
                  "flex h-44 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-white",
                  fieldState.error ? "border-error" : "border-gray-300"
                )}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
                  <IcPlus className="size-6 text-gray-500" />
                </span>
                <span className="flex flex-col items-center gap-1">
                  <span className="typo-16-semibold">이미지 업로드</span>
                  <span className="typo-13-medium text-gray-500">JPG, PNG 최대 10MB</span>
                </span>
              </button>
            )}
            <FieldError message={fieldState.error?.message} />
          </div>
        );
      }}
    />
  );
}

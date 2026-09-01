"use client";

import { useEffect, useRef } from "react";
import { type Control, useController } from "react-hook-form";
import { IcClose, IcPlus } from "@/shared/assets/icons";
import { cn } from "@/shared/utils/cn";
import { IMAGE_ACCEPT } from "@/shared/utils/imageFile";
import { toast } from "@/shared/ui/feedback";
import FieldError from "@/shared/ui/form/FieldError";
import Label from "@/shared/ui/label/Label";
import type { ProductFormValues } from "../../schema";
import { useImagePreview } from "../../hooks/useImagePreview";

type ProductImageFieldProps = {
  control: Control<ProductFormValues>;
};

/** 업로드 가능한 최대 이미지 수. */
const MAX_IMAGES = 3;

/**
 * 제품 이미지 업로드 필드입니다. (최대 3장)
 *
 * 미리보기는 로컬 objectURL(`imageUrl`)로 보여주고, 원본 File은 `imageFiles`에 담아
 * 제출 시 Storage 업로드에 사용합니다. (실제 업로드는 폼 제출 핸들러에서 수행)
 */
export default function ProductImageField({ control }: ProductImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { field, fieldState } = useController({
    control,
    name: "imageUrl",
  });
  const { field: filesField } = useController({
    control,
    name: "imageFiles",
  });
  const previews = field.value;
  const files = filesField.value;

  // 변환 대기 중 삭제가 일어나도 최신 배열에 누적하도록 ref로 최신값을 유지한다.
  // (완료 콜백이 선택 시작 시점의 값을 캡처해 삭제된 항목을 되살리는 것을 방지)
  const latestPreviews = useRef(previews);
  const latestFiles = useRef(files);
  useEffect(() => {
    latestPreviews.current = previews;
    latestFiles.current = files;
  }, [previews, files]);

  const { fileError, isConverting, selectFiles, revoke } = useImagePreview((selections) => {
    field.onChange([...latestPreviews.current, ...selections.map((s) => s.previewUrl)]);
    filesField.onChange([...latestFiles.current, ...selections.map((s) => s.file)]);
  });

  const canAddMore = previews.length < MAX_IMAGES;

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    // 같은 파일을 다시 선택해도 onChange가 발생하도록 input 값을 비웁니다.
    e.target.value = "";
    // 이미 등록된 장수를 포함해 최대 MAX_IMAGES장까지만 받도록 남은 자리에 맞춰 자른다.
    const remaining = MAX_IMAGES - previews.length;
    if (selected.length > remaining) {
      toast.warning(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있어요`);
    }
    if (remaining <= 0) return;
    selectFiles(selected.slice(0, remaining));
  };

  const handleRemove = (index: number) => {
    revoke(previews[index]);
    field.onChange(previews.filter((_, i) => i !== index));
    filesField.onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Label>제품 이미지</Label>
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        multiple
        className="hidden"
        onChange={handleSelect}
      />
      <div className="grid grid-cols-3 gap-2">
        {previews.map((preview, index) => (
          <div
            key={preview}
            className="relative aspect-square overflow-hidden rounded-2xl bg-gray-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- 로컬 objectURL 미리보기라 next/image 최적화 대상이 아님 */}
            <img
              src={preview}
              alt={`제품 이미지 미리보기 ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              aria-label={`이미지 ${index + 1} 삭제`}
              onClick={() => handleRemove(index)}
              className="absolute right-1.5 top-1.5 rounded-full bg-black/50 p-1"
            >
              <IcClose className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
        {canAddMore && (
          <button
            type="button"
            aria-label="제품 이미지 추가"
            onClick={() => inputRef.current?.click()}
            disabled={isConverting}
            className={cn(
              "flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-white",
              fieldState.error || fileError ? "border-error" : "border-gray-300"
            )}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <IcPlus className="size-5 text-gray-500" />
            </span>
            <span className="typo-13-medium text-gray-500">
              {isConverting ? "불러오는 중" : `${previews.length}/${MAX_IMAGES}`}
            </span>
          </button>
        )}
      </div>
      <FieldError message={fileError ?? fieldState.error?.message} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { IcClose } from "@/shared/assets/icons";
import Input from "@/shared/ui/input/Input";
import Label from "@/shared/ui/label/Label";
import type { ProductFormValues } from "../../model/types";

type ProductTagsFieldProps = {
  control: Control<ProductFormValues>;
};

/** 제품 태그 입력 필드입니다. Enter로 추가하고, 칩의 x로 삭제합니다. */
export default function ProductTagsField({ control }: ProductTagsFieldProps) {
  const [draft, setDraft] = useState("");

  return (
    <Controller
      control={control}
      name="tag"
      render={({ field }) => {
        const addTag = () => {
          const value = draft.trim();
          if (!value || field.value.includes(value)) return;
          field.onChange([...field.value, value]);
          setDraft("");
        };

        const removeTag = (target: string) => {
          field.onChange(field.value.filter((tag) => tag !== target));
        };

        return (
          <div className="flex flex-col gap-2.5">
            <Label>태그</Label>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                // 한글 등 IME 조합 확정용 Enter는 무시한다. (조합 중 Enter가
                // 태그 추가로 이어져 마지막 글자가 중복 인식되는 문제 방지)
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="태그를 입력하고 Enter를 눌러주세요"
            />
            {field.value.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {/* 삭제(x) 버튼이 필요해 공유 TagChip 대신 pill을 직접 구성합니다. */}
                {field.value.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2.5 py-1.5 typo-12-medium text-gray-700"
                  >
                    #{tag}
                    <button type="button" aria-label={`${tag} 삭제`} onClick={() => removeTag(tag)}>
                      <IcClose className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

import { useState } from "react";
import { createImagePreviewUrl } from "@/shared/utils/createImagePreviewUrl";
import { validateImageFile } from "@/shared/utils/imageFile";

/**
 * 이미지 파일 선택 → 검증 → 미리보기 URL 생성까지의 상태와 동작을 관리합니다.
 * 생성된 URL(또는 초기화)은 `onChange`로 폼 값에 반영합니다.
 */
export function useImagePreview(onChange: (urls: string[]) => void) {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const selectFile = async (file: File | undefined) => {
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      setFileError(error);
      return;
    }
    setFileError(null);

    // HEIC 변환이 필요할 수 있어 objectURL 생성을 비동기로 처리합니다.
    setIsConverting(true);
    try {
      const previewUrl = await createImagePreviewUrl(file);
      onChange([previewUrl]);
    } catch {
      setFileError("이미지를 불러오지 못했어요. 다시 시도해주세요");
    } finally {
      setIsConverting(false);
    }
  };

  /** 선택된 이미지와 에러를 모두 비웁니다. */
  const reset = () => {
    setFileError(null);
    onChange([]);
  };

  return { fileError, isConverting, selectFile, reset };
}

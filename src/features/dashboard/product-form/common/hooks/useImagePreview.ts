import { useEffect, useRef, useState } from "react";
import { createImagePreviewUrl } from "@/shared/utils/createImagePreviewUrl";
import { validateImageFile } from "@/shared/utils/imageFile";

/** 선택된 이미지의 미리보기 URL과 업로드에 쓸 원본 File. */
export type ImageSelection = { previewUrl: string; file: File };

/**
 * 이미지 파일 선택 → 검증 → 미리보기 URL 생성까지의 상태와 동작을 관리합니다.
 * 선택 결과(미리보기 URL + 원본 File)는 `onChange`로, 초기화는 `null`로 반영합니다.
 * 원본 File은 제출 시 Storage 업로드에 사용됩니다.
 *
 * 직접 생성한 objectURL은 교체·초기화·언마운트 시 `URL.revokeObjectURL`로 해제해
 * 메모리 누수를 막습니다. (defaultValues로 들어온 원격 URL 등은 추적하지 않습니다.)
 */
export function useImagePreview(onChange: (selection: ImageSelection | null) => void) {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  // 우리가 생성한 objectURL만 추적해 해제 대상으로 삼습니다.
  const objectUrlRef = useRef<string | null>(null);

  const revokeCurrent = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  // 언마운트 시 남아 있는 objectURL 해제
  useEffect(() => revokeCurrent, []);

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
      // 새 미리보기를 저장하기 전에 이전 objectURL을 해제합니다.
      revokeCurrent();
      objectUrlRef.current = previewUrl;
      onChange({ previewUrl, file });
    } catch {
      setFileError("이미지를 불러오지 못했어요. 다시 시도해주세요");
    } finally {
      setIsConverting(false);
    }
  };

  /** 선택된 이미지와 에러를 모두 비웁니다. */
  const reset = () => {
    revokeCurrent();
    setFileError(null);
    onChange(null);
  };

  return { fileError, isConverting, selectFile, reset };
}

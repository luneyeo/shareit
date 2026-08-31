import { useEffect, useRef, useState } from "react";
import { createImagePreviewUrl } from "@/shared/utils/createImagePreviewUrl";
import { validateImageFile } from "@/shared/utils/imageFile";

/** 선택된 이미지의 미리보기 URL과 업로드에 쓸 원본 File. */
export type ImageSelection = { previewUrl: string; file: File };

/**
 * 이미지 파일 선택 → 검증 → 미리보기 URL 생성까지의 상태와 동작을 관리합니다.
 * 선택 결과(미리보기 URL + 원본 File)는 `onSelect`로 호출부에 넘겨, 호출부가 여러 장을
 * 배열에 누적합니다. 원본 File은 제출 시 Storage 업로드에 사용됩니다.
 *
 * 직접 생성한 objectURL은 `revoke`(개별 삭제)·언마운트 시 `URL.revokeObjectURL`로
 * 해제해 메모리 누수를 막습니다. (defaultValues로 들어온 원격 URL 등은 추적하지 않습니다.)
 */
export function useImagePreview(onSelect: (selection: ImageSelection) => void) {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  // 우리가 생성한 objectURL만 추적해 해제 대상으로 삼습니다.
  const objectUrlsRef = useRef<Set<string>>(new Set());
  const mountedRef = useRef(true);

  // 언마운트 시 생성한 objectURL을 모두 해제
  useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      mountedRef.current = false;
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

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
      // 대기 중 언마운트됐다면 cleanup이 이미 지나갔으므로, 지금 만든 URL은
      // 추적 대상에 넣지 말고 즉시 해제한다. (누수 방지)
      if (!mountedRef.current) {
        URL.revokeObjectURL(previewUrl);
        return;
      }
      objectUrlsRef.current.add(previewUrl);
      onSelect({ previewUrl, file });
    } catch {
      setFileError("이미지를 불러오지 못했어요. 다시 시도해주세요");
    } finally {
      setIsConverting(false);
    }
  };

  /** 우리가 생성한 objectURL이면 해제합니다. (원격 URL 등은 무시) */
  const revoke = (url: string) => {
    if (objectUrlsRef.current.delete(url)) {
      URL.revokeObjectURL(url);
    }
  };

  return { fileError, isConverting, selectFile, revoke };
}

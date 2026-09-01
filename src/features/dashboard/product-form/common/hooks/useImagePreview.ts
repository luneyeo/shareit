import { useEffect, useRef, useState } from "react";
import { createImagePreviewUrl } from "@/shared/utils/createImagePreviewUrl";
import { validateImageFile } from "@/shared/utils/imageFile";

/** 선택된 이미지의 미리보기 URL과 업로드에 쓸 원본 File. */
export type ImageSelection = { previewUrl: string; file: File };

/**
 * 이미지 파일 선택 → 검증 → 미리보기 URL 생성까지의 상태와 동작을 관리합니다.
 * 한 번에 여러 장을 받아 배치로 처리하며, 선택 결과(미리보기 URL + 원본 File) 배열을
 * `onSelect`로 호출부에 넘겨 호출부가 기존 목록에 누적합니다. 원본 File은 제출 시
 * Storage 업로드에 사용됩니다.
 *
 * 직접 생성한 objectURL은 `revoke`(개별 삭제)·언마운트 시 `URL.revokeObjectURL`로
 * 해제해 메모리 누수를 막습니다. (defaultValues로 들어온 원격 URL 등은 추적하지 않습니다.)
 */
export function useImagePreview(onSelect: (selections: ImageSelection[]) => void) {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  // 우리가 생성한 objectURL만 추적해 해제 대상으로 삼습니다.
  const objectUrlsRef = useRef<Set<string>>(new Set());
  const mountedRef = useRef(true);

  // 언마운트 시 생성한 objectURL을 모두 해제
  useEffect(() => {
    // StrictMode(dev)는 mount→unmount→mount로 이펙트를 두 번 실행한다. 첫 cleanup이 남긴
    // mountedRef=false를 재마운트 때 true로 되돌리지 않으면, selectFile이 await 후 매번
    // '언마운트됨'으로 오판해 미리보기를 버린다. 마운트마다 true로 복구한다.
    mountedRef.current = true;
    const urls = objectUrlsRef.current;
    return () => {
      mountedRef.current = false;
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  const selectFiles = async (files: File[]) => {
    if (files.length === 0) return;

    // 형식·용량 검증을 통과한 파일만 변환하고, 걸러진 파일이 있으면 첫 에러를 노출한다.
    const validFiles: File[] = [];
    let firstError: string | null = null;
    for (const file of files) {
      const error = validateImageFile(file);
      if (error) {
        firstError ??= error;
        continue;
      }
      validFiles.push(file);
    }
    setFileError(firstError);
    if (validFiles.length === 0) return;

    // HEIC 변환이 필요할 수 있어 objectURL 생성을 비동기로 처리합니다.
    setIsConverting(true);
    try {
      // 일부만 실패해도 성공한 쪽은 이미 objectURL을 만들어 반환하므로, allSettled로
      // 성공분을 붙잡아 반드시 해제할 수 있게 한다. (Promise.all이면 누수)
      const results = await Promise.allSettled(validFiles.map(createImagePreviewUrl));
      const selections = results.flatMap((result, i) =>
        result.status === "fulfilled" ? [{ previewUrl: result.value, file: validFiles[i] }] : []
      );

      // 하나라도 실패했거나 대기 중 언마운트됐다면, 성공해 만들어진 URL을 모두 해제하고
      // 아무것도 추가하지 않는다. (추적 대상에 못 들어가 삭제·정리에서 누락되는 누수 방지)
      const hasFailure = results.some((result) => result.status === "rejected");
      if (hasFailure || !mountedRef.current) {
        selections.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
        if (hasFailure) setFileError("이미지를 불러오지 못했어요. 다시 시도해주세요");
        return;
      }

      selections.forEach(({ previewUrl }) => objectUrlsRef.current.add(previewUrl));
      // 여러 장을 한 번에 넘겨, 호출부가 상태를 1회만 갱신하도록 한다. (누적 경쟁 방지)
      onSelect(selections);
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

  return { fileError, isConverting, selectFiles, revoke };
}

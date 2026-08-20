/** 이미지 업로드 관련 상수와 검증 로직을 한 곳에서 관리합니다. */

/** 허용하는 최대 이미지 용량 (10MB) */
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

/** 파일 선택창(`<input accept>`)에 노출할 허용 형식 */
export const IMAGE_ACCEPT = "image/*,.heic,.heif";

/** HEIC/HEIF(주로 아이폰 사진)의 MIME 타입 */
export const HEIC_MIME_TYPES = ["image/heic", "image/heif"] as const;

/** HEIC/HEIF 파일 확장자 패턴 (MIME 타입이 비어 오는 브라우저 대비) */
export const HEIC_FILE_PATTERN = /\.(heic|heif)$/i;

/**
 * 아이폰 사진(HEIC/HEIF)인지 판단합니다.
 * 일부 브라우저는 HEIC의 MIME 타입을 비워서 넘기므로 확장자도 함께 확인합니다.
 */
export function isHeicFile(file: File): boolean {
  return (
    HEIC_MIME_TYPES.includes(file.type as (typeof HEIC_MIME_TYPES)[number]) ||
    HEIC_FILE_PATTERN.test(file.name)
  );
}

/**
 * 선택한 이미지 파일의 형식·용량을 검사합니다.
 * 문제가 없으면 `null`, 있으면 사용자에게 보여줄 에러 메시지를 반환합니다.
 */
export function validateImageFile(file: File): string | null {
  if (!file.type.startsWith("image/") && !isHeicFile(file)) {
    return "이미지 파일만 등록할 수 있어요";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "이미지 용량은 최대 10MB까지 등록할 수 있어요";
  }
  return null;
}

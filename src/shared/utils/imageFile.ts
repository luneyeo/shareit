/** 이미지 업로드 관련 상수와 검증·변환 로직을 한 곳에서 관리합니다. */

/** 허용하는 최대 이미지 용량 (50MB) */
export const MAX_IMAGE_SIZE = 50 * 1024 * 1024;

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
    return "이미지 용량은 최대 50MB까지 등록할 수 있어요";
  }
  return null;
}

/**
 * HEIC/HEIF를 JPEG File로 변환합니다.
 *
 * 브라우저 `<img>`는 대부분 HEIC를 렌더링하지 못하고, Storage에도 HEIC 그대로
 * 올라가면 조회 시 이미지가 깨집니다. 그래서 선택 단계에서 JPEG로 바꿔 미리보기와
 * 업로드가 같은 File을 쓰도록 합니다. HEIC가 아니면 원본 File을 그대로 반환합니다.
 * heic2any는 브라우저 전용 모듈이라 호출 시점에 동적으로 불러옵니다.
 */
export async function convertHeicToJpeg(file: File): Promise<File> {
  if (!isHeicFile(file)) {
    return file;
  }

  const heic2any = (await import("heic2any")).default;
  const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
  const blob = Array.isArray(converted) ? converted[0] : converted;

  // 마지막 확장자를 .jpg로 바꾼다. (MIME만 HEIC라 확장자가 다른 경우도 포함)
  const jpegName = file.name.replace(/\.[^./\\]+$/, "") + ".jpg";
  return new File([blob], jpegName, { type: "image/jpeg" });
}

import { isHeicFile } from "./imageFile";

/**
 * 미리보기용 objectURL을 생성합니다.
 *
 * HEIC/HEIF(주로 아이폰 사진)는 브라우저 `<img>`가 렌더링하지 못하므로
 * heic2any로 JPEG로 변환한 뒤 URL을 만듭니다. 그 외 형식은 그대로 사용합니다.
 * heic2any는 브라우저 전용 모듈이라 호출 시점에 동적으로 불러옵니다.
 */
export async function createImagePreviewUrl(file: File): Promise<string> {
  if (!isHeicFile(file)) {
    return URL.createObjectURL(file);
  }

  const heic2any = (await import("heic2any")).default;
  const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
  const blob = Array.isArray(converted) ? converted[0] : converted;
  return URL.createObjectURL(blob);
}

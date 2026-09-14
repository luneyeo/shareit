import {
  isHeicFile,
  validateImageFile,
  convertHeicToJpeg,
  MAX_IMAGE_SIZE,
} from "@/shared/utils/imageFile";

// heic2any는 브라우저 전용 모듈이라 동적 import 시 mock으로 대체한다.
jest.mock("heic2any", () => ({
  __esModule: true,
  default: jest.fn(async () => new Blob(["jpeg-binary"], { type: "image/jpeg" })),
}));

/** size를 지정해 File을 만든다. (실제로 큰 파일을 만들지 않고 size만 흉내 낸다) */
function makeFile(name: string, type: string, size = 1024): File {
  const file = new File(["x"], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

describe("isHeicFile", () => {
  it("MIME 타입이 HEIC면 참이다", () => {
    expect(isHeicFile(makeFile("photo.jpg", "image/heic"))).toBe(true);
  });

  it("MIME이 비어도 확장자가 .heic/.heif면 참이다", () => {
    expect(isHeicFile(makeFile("photo.HEIC", ""))).toBe(true);
    expect(isHeicFile(makeFile("photo.heif", ""))).toBe(true);
  });

  it("일반 이미지는 거짓이다", () => {
    expect(isHeicFile(makeFile("photo.jpg", "image/jpeg"))).toBe(false);
  });
});

describe("validateImageFile", () => {
  it("이미지가 아니면 에러 메시지를 반환한다", () => {
    expect(validateImageFile(makeFile("doc.pdf", "application/pdf"))).toBe(
      "이미지 파일만 등록할 수 있어요"
    );
  });

  it("용량이 최대치를 넘으면 에러 메시지를 반환한다", () => {
    const tooBig = makeFile("photo.jpg", "image/jpeg", MAX_IMAGE_SIZE + 1);
    expect(validateImageFile(tooBig)).toBe("이미지 용량은 최대 50MB까지 등록할 수 있어요");
  });

  it("형식·용량이 정상이면 null을 반환한다", () => {
    expect(validateImageFile(makeFile("photo.jpg", "image/jpeg"))).toBeNull();
  });

  it("HEIC도 유효한 이미지로 통과시킨다", () => {
    expect(validateImageFile(makeFile("photo.heic", "image/heic"))).toBeNull();
  });
});

describe("convertHeicToJpeg", () => {
  it("HEIC가 아니면 원본 File을 그대로 반환한다", async () => {
    const original = makeFile("photo.jpg", "image/jpeg");
    await expect(convertHeicToJpeg(original)).resolves.toBe(original);
  });

  it("HEIC는 확장자를 .jpg로 바꾼 JPEG File로 변환한다", async () => {
    const converted = await convertHeicToJpeg(makeFile("photo.HEIC", "image/heic"));
    expect(converted.name).toBe("photo.jpg");
    expect(converted.type).toBe("image/jpeg");
  });
});

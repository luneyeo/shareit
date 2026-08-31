import { createClient } from "@/shared/lib/supabase/client";
import { isHeicFile } from "@/shared/utils/imageFile";

/** 이미지 파일들을 Storage에 업로드하고 공개 URL 배열을 반환한다. */
export async function uploadProductImages(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];

  const supabase = createClient();

  // RLS가 '{uid}/...' 경로만 허용하므로 사용자 폴더 하위에 업로드한다.
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("로그인이 필요합니다.");

  return Promise.all(
    files.map(async (file) => {
      const ext = file.name.split(".").pop();
      const path = `${userId}/products/${crypto.randomUUID()}.${ext}`;

      // 일부 브라우저는 HEIC의 type을 비워 보내, 버킷 MIME 제한(image/*)에 걸리지 않도록 보정한다.
      const contentType = file.type || (isHeicFile(file) ? "image/heic" : undefined);

      const { error } = await supabase.storage.from("Images").upload(path, file, { contentType });
      if (error) throw error;

      const { data } = supabase.storage.from("Images").getPublicUrl(path);
      return data.publicUrl;
    })
  );
}

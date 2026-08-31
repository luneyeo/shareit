import { createClient } from "@/shared/lib/supabase/client";

/** 이미지 파일들을 Storage에 업로드하고 공개 URL 배열을 반환한다. */
export async function uploadProductImages(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];

  const supabase = createClient();

  return Promise.all(
    files.map(async (file) => {
      const ext = file.name.split(".").pop();
      const path = `products/${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage.from("Images").upload(path, file);
      if (error) throw error;

      const { data } = supabase.storage.from("Images").getPublicUrl(path);
      return data.publicUrl;
    })
  );
}

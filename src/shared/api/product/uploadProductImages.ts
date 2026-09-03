import { createClient } from "@/shared/lib/supabase/client";

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
      const path = `${userId}/${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { contentType: file.type || undefined });
      if (error) throw error;

      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      return data.publicUrl;
    })
  );
}

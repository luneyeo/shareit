import { type NextRequest } from "next/server";
import { updateSession } from "@/shared/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 아래를 제외한 모든 요청 경로에 매칭한다:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - icon.svg (파비콘)
     * - 이미지 확장자 파일
     * 필요에 따라 다른 정적 경로를 추가한다.
     */
    "/((?!_next/static|_next/image|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

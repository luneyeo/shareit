import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 색인 대상 HTML이 없는 /api만 차단한다.
      // /auth·/dashboard·/mypage는 크롤러가 noindex(루트 기본값·리다이렉트 체인)를
      // 읽어야 URL까지 제외되므로 Disallow하지 않는다. 콘텐츠 보호는 proxy.ts가 담당한다.
      disallow: "/api",
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}

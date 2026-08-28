import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/mypage", "/auth", "/api"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}

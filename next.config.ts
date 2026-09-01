import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

// SVGR 기본 svgo(preset-default)는 width/height가 있으면 viewBox를 제거해,
// 아이콘을 네이티브보다 작은 크기로 렌더하면 내용이 잘린다. viewBox를 보존한다.
const svgrOptions = {
  svgoConfig: {
    plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }],
  },
};

// Supabase Storage 공개 이미지를 next/image로 렌더하려면 해당 호스트를 허용해야 한다.
// 프로젝트(ref)가 바뀌어도 자동으로 맞도록 NEXT_PUBLIC_SUPABASE_URL에서 호스트를 도출한다.
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // DSN은 비밀값이 아니지만 NEXT_PUBLIC_ 접두사를 쓰지 않으므로,
  // 클라이언트(instrumentation-client.ts)에서 참조할 수 있도록 빌드 시 주입한다.
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  images: {
    // 공개 버킷(product-images) 경로만 허용한다.
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [{ loader: "@svgr/webpack", options: svgrOptions }],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: svgrOptions }],
    });
    return config;
  },
};

// Sentry 소스맵 업로드로 배포 빌드에서 원본 스택 트레이스를 확인할 수 있게 한다.
// org·project·authToken이 없으면 업로드는 조용히 건너뛰고 앱 동작에는 영향이 없다.
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});

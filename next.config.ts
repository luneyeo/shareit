import type { NextConfig } from "next";

// SVGR 기본 svgo(preset-default)는 width/height가 있으면 viewBox를 제거해,
// 아이콘을 네이티브보다 작은 크기로 렌더하면 내용이 잘린다. viewBox를 보존한다.
const svgrOptions = {
  svgoConfig: {
    plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }],
  },
};

const nextConfig: NextConfig = {
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

export default nextConfig;

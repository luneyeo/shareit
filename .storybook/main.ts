import type { StorybookConfig } from "@storybook/nextjs";
import type { RuleSetRule } from "webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    const rules = config.module?.rules ?? [];

    // 기존 SVG 처리 룰에서 SVG를 제외
    for (const rule of rules) {
      if (
        rule &&
        typeof rule === "object" &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
      ) {
        (rule as RuleSetRule).exclude = /\.svg$/;
      }
    }

    // SVG를 React 컴포넌트로 변환
    rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });

    return config;
  },
};

export default config;

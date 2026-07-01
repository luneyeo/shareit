import type { Preview } from "@storybook/react";
// @ts-expect-error: CSS 모듈 형식 선언 인식 지연으로 인한 임시 조치
import "@/shared/styles/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

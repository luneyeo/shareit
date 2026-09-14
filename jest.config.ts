import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  // 훅·DOM 테스트를 위해 jsdom 환경을 사용한다.
  testEnvironment: "jsdom",
  // @testing-library/jest-dom 매처(toBeInTheDocument 등)를 전역 등록한다.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // tsconfig의 "@/*" 경로 alias를 Jest에서도 해석한다.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);

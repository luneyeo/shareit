"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lottie from "react-lottie-player";

type ErrorAnimation = "404" | "500";

interface ErrorFallbackProps {
  /** 상단에 표시할 Lottie 애니메이션 */
  animation: ErrorAnimation;
  /** 에러 상황을 설명하는 대표 문구 */
  message: string;
  /** message 아래에 붙는 보조 설명 (선택) */
  description?: string;
  /** 하단에 세로로 나열되는 액션 버튼 */
  children: ReactNode;
}

/**
 * 애니메이션 컨테이너 크기. 로딩 placeholder와 공유하므로 종횡비(aspect)를 포함해
 * 폭만으로 높이가 확정되게 한다. (로딩↔완료 상태 간 레이아웃 시프트 방지)
 * 404는 원본 16:9, 500은 크롭된 viewBox(800x800) 1:1에 맞춘다.
 */
const ANIMATION_SIZE: Record<ErrorAnimation, string> = {
  "404": "w-80 aspect-video",
  "500": "w-30 aspect-square",
};

/**
 * 여백이 큰 애니메이션은 viewBox("minX minY width height")를 좁혀 콘텐츠 영역만 크롭한다.
 * 원본 JSON은 건드리지 않고 렌더링 시점에만 적용된다. (lottie-web rendererSettings)
 * 500은 1200x1200 캔버스 중앙에 콘텐츠가 몰려 있어 중앙 절반만 보이도록 자른다.
 */
const VIEW_BOX: Partial<Record<ErrorAnimation, string>> = {
  "500": "200 200 800 800",
};

/** animation에 해당하는 Lottie JSON만 동적으로 import 한다. (번들 분리) */
function loadAnimation(animation: ErrorAnimation): Promise<{ default: object }> {
  switch (animation) {
    case "404":
      return import("@/shared/assets/lottie/lottie-404.json");
    case "500":
      return import("@/shared/assets/lottie/lottie-500.json");
  }
}

/**
 * 404·500 등 에러 화면의 공통 레이아웃입니다.
 *
 * Lottie 애니메이션 → 안내 문구 → 액션 버튼을 세로로 배치합니다.
 * 버튼 구성은 페이지마다 다르므로 `children`으로 주입받습니다.
 *
 * @example
 * ```tsx
 * <ErrorFallback animation="404" message="페이지를 찾을 수 없어요" description="주소를 확인해 주세요.">
 *   <Button className="w-full" onClick={goHome}>홈으로 이동</Button>
 * </ErrorFallback>
 * ```
 */
export default function ErrorFallback({
  animation,
  message,
  description,
  children,
}: ErrorFallbackProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const size = ANIMATION_SIZE[animation];
  const viewBoxSize = VIEW_BOX[animation];

  useEffect(() => {
    let active = true;
    loadAnimation(animation).then((mod) => {
      if (active) setAnimationData(mod.default);
    });
    return () => {
      active = false;
    };
  }, [animation]);

  return (
    <main className="flex min-h-full flex-col items-center justify-center px-6 text-center">
      {/* 로딩 중에는 동일 크기의 빈 영역으로 레이아웃(자리)을 유지한다. */}
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop
          play
          className={size}
          rendererSettings={viewBoxSize ? { viewBoxSize } : undefined}
        />
      ) : (
        <div className={size} aria-hidden />
      )}
      <h1 className="typo-18-bold mt-4">{message}</h1>
      {description && <p className="typo-14-medium mt-1 text-gray-500">{description}</p>}
      <div className="mt-6 flex w-full max-w-70 flex-col gap-3">{children}</div>
    </main>
  );
}

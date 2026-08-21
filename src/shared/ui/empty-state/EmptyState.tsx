"use client";

import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { IcPlus } from "@/shared/assets/icons";
import Button from "@/shared/ui/button/Button";
import { cn } from "@/shared/utils/cn";

type BaseProps = {
  /** 비어 있는 상태를 설명하는 문구 */
  message: string;
  /** message 아래에 붙는 보조 설명 (선택) */
  description?: string;
  className?: string;
};

/**
 * `type`에 따라 하단 액션 영역이 달라집니다.
 * - `group`: 그룹 생성/입장 버튼 (핸들러 필수)
 * - `product`: 상품 등록 버튼 (핸들러 필수)
 * - `error`: 다시 시도 버튼 (핸들러 필수)
 * - `notice`: 버튼 없이 안내 문구만 (핸들러 없음)
 */
type EmptyStateProps =
  | (BaseProps & {
      type: "group";
      onCreateGroup: () => void;
      onJoinGroup: () => void;
    })
  | (BaseProps & { type: "product"; onAddProduct: () => void })
  | (BaseProps & { type: "error"; onRetry: () => void })
  | (BaseProps & { type: "notice" });

/** 타입별 Lottie 애니메이션 크기 (자산 데이터는 loadAnimation에서 지연 로드) */
const ANIMATION_SIZE: Record<EmptyStateProps["type"], string> = {
  group: "h-24 w-24",
  product: "h-18 w-18",
  error: "h-24 w-24",
  notice: "h-24 w-24",
};

/** type에 해당하는 Lottie JSON만 동적으로 import 한다. (번들 분리) */
function loadAnimation(type: EmptyStateProps["type"]): Promise<{ default: object }> {
  switch (type) {
    case "group":
      return import("@/shared/assets/lottie/lottie-no-group.json");
    case "product":
      return import("@/shared/assets/lottie/lottie-no-product.json");
    case "error":
    case "notice":
      return import("@/shared/assets/lottie/lottie-no-data.json");
  }
}

/**
 * 데이터가 없는 상태를 안내하는 EmptyState 컴포넌트입니다.
 *
 * Lottie 애니메이션과 안내 문구를 세로로 배치해 "비어 있음"을 표현합니다.
 * 애니메이션과 하단 액션은 모두 `type`에 따라 내부에서 결정됩니다.
 *
 * @example group - 그룹 생성/입장 버튼
 * ```tsx
 * <EmptyState
 *   type="group"
 *   message="아직 속한 그룹이 없어요"
 *   description="새 그룹을 만들거나 초대 코드로 입장해보세요"
 *   onCreateGroup={openCreate}
 *   onJoinGroup={openJoin}
 * />
 * ```
 *
 * @example product - 상품 등록 버튼
 * ```tsx
 * <EmptyState
 *   type="product"
 *   message="아직 등록된 상품이 없어요"
 *   description="첫 상품을 등록해보세요"
 *   onAddProduct={goToProductNew}
 * />
 * ```
 *
 * @example error - 다시 시도 버튼
 * ```tsx
 * <EmptyState
 *   type="error"
 *   message="문제가 발생했어요"
 *   description="잠시 후 다시 시도해주세요"
 *   onRetry={refetch}
 * />
 * ```
 *
 * @example notice - 버튼 없이 안내 문구만
 * ```tsx
 * <EmptyState
 *   type="notice"
 *   message="존재하지 않는 그룹이에요"
 *   description="위에서 다른 그룹을 선택해 주세요"
 * />
 * ```
 */
export default function EmptyState(props: EmptyStateProps) {
  const { message, description, className } = props;
  const size = ANIMATION_SIZE[props.type];
  const [loaded, setLoaded] = useState<{ type: EmptyStateProps["type"]; data: object } | null>(
    null
  );

  useEffect(() => {
    let active = true;
    loadAnimation(props.type).then((mod) => {
      if (active) setLoaded({ type: props.type, data: mod.default });
    });
    return () => {
      active = false;
    };
  }, [props.type]);

  // type이 바뀌면 새 애니메이션 로드 전까지는 placeholder를 유지한다.
  const animationData = loaded?.type === props.type ? loaded.data : null;

  return (
    <div
      className={cn("flex flex-col items-center justify-center px-4 py-10 text-center", className)}
    >
      {/* 로딩 중에는 동일 크기의 빈 영역으로 레이아웃(자리)을 유지한다. */}
      {animationData ? (
        <Lottie animationData={animationData} loop play className={size} />
      ) : (
        <div className={size} aria-hidden />
      )}
      <p className="typo-16-bold mt-4 text-gray-800">{message}</p>
      {description && <p className="typo-14-medium mt-1 text-gray-500">{description}</p>}
      <EmptyStateAction {...props} />
    </div>
  );
}

function EmptyStateAction(props: EmptyStateProps) {
  switch (props.type) {
    case "group":
      return (
        <div className="mt-6 flex w-full flex-col gap-3 px-26">
          <Button
            theme="primary"
            size="md"
            icon={<IcPlus className="size-4" />}
            className="w-full"
            onClick={props.onCreateGroup}
          >
            새 그룹 만들기
          </Button>
          <Button theme="secondary" size="md" className="w-full" onClick={props.onJoinGroup}>
            코드로 그룹 입장하기
          </Button>
        </div>
      );

    case "product":
      return (
        <Button
          theme="primary"
          size="md"
          icon={<IcPlus className="size-4" />}
          className="mt-4 px-4"
          onClick={props.onAddProduct}
        >
          상품 등록하기
        </Button>
      );

    case "error":
      return (
        <Button theme="primary" size="md" className="mt-4 px-4" onClick={props.onRetry}>
          다시 시도
        </Button>
      );

    case "notice":
      return null;
  }
}

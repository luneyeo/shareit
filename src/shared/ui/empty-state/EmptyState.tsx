"use client";

import Lottie from "react-lottie-player";
import { IcPlus } from "@/shared/assets/icons";
import Button from "@/shared/ui/button/Button";
import { cn } from "@/shared/utils/cn";

type BaseProps = {
  /** 표시할 Lottie 애니메이션 JSON 데이터 */
  animationData: object;
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
 */
type EmptyStateProps =
  | (BaseProps & {
      type: "group";
      onCreateGroup: () => void;
      onJoinGroup: () => void;
    })
  | (BaseProps & { type: "product"; onAddProduct: () => void })
  | (BaseProps & { type: "error"; onRetry: () => void });

/**
 * 데이터가 없는 상태를 안내하는 EmptyState 컴포넌트입니다.
 *
 * Lottie 애니메이션과 안내 문구를 세로로 배치해 "비어 있음"을 표현합니다.
 * 애니메이션은 도메인에 종속되지 않도록 `animationData`로 주입받으며,
 * 하단 액션은 `type`에 따라 렌더링됩니다.
 *
 * @example
 * ```tsx
 * import noGroup from "@/shared/assets/lottie/lottie-no-group.json";
 *
 * <EmptyState
 *   type="group"
 *   animationData={noGroup}
 *   message="아직 속한 그룹이 없어요"
 *   description="새 그룹을 만들거나 초대 코드로 입장해보세요"
 *   onCreateGroup={openCreate}
 *   onJoinGroup={openJoin}
 * />
 * ```
 */
const ANIMATION_SIZE: Record<EmptyStateProps["type"], string> = {
  group: "h-24 w-24",
  product: "h-18 w-18",
  error: "h-30 w-30",
};

export default function EmptyState(props: EmptyStateProps) {
  const { animationData, message, description, className } = props;

  return (
    <div
      className={cn("flex flex-col items-center justify-center px-4 py-10 text-center", className)}
    >
      <Lottie animationData={animationData} loop play className={ANIMATION_SIZE[props.type]} />
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
          className="mt-4 px-6"
          onClick={props.onAddProduct}
        >
          상품 등록하기
        </Button>
      );

    case "error":
      return (
        <Button theme="primary" size="md" className="mt-4 px-6" onClick={props.onRetry}>
          다시 시도
        </Button>
      );
  }
}

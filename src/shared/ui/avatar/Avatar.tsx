"use client";

import { IcProfile } from "@/shared/assets/icons";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  seed?: string;
  size?: AvatarSize;
};

const COLORS = [
  "#6B79FA", // 보라
  "#2A8C6A", // 초록
  "#D58D49", // 갈색
  "#FA6B6B", // 다홍
  "#71DFF3", // 민트
];

const SIZE = {
  sm: { container: "w-7 h-7", icon: "w-6 h-6" },
  md: { container: "w-9 h-9", icon: "w-7 h-7" },
  lg: { container: "w-12 h-12", icon: "w-10 h-10" },
};

function getColorIndex(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % COLORS.length;
  }
  return hash;
}

/**
 * 유저 아바타 컴포넌트입니다.
 *
 * - `name`: 색상 결정에 사용되는 값 (이름, id 등). 동일한 seed은 항상 같은 색상을 반환합니다.
 * - `size`: 아바타 크기 (`sm` | `md` | `lg`)
 *
 * @example
 * ```tsx
 * <Avatar seed="홍길동" size="md" />
 * ```
 */
export default function Avatar({ seed = "", size = "md" }: AvatarProps) {
  const bg = COLORS[getColorIndex(seed)];
  const { container, icon } = SIZE[size];

  return (
    <div
      className={`${container} rounded-full overflow-hidden relative`}
      style={{ backgroundColor: bg }}
    >
      <IcProfile className={`absolute -bottom-1 left-1/2 -translate-x-1/2 ${icon} opacity-75`} />
    </div>
  );
}

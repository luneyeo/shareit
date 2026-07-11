"use client";

import Avatar, { type AvatarSize } from "@/shared/ui/avatar/Avatar";

interface ProfileProps {
  name: string;
  size?: AvatarSize;
}

const TEXT_SIZE: Record<AvatarSize, string> = {
  sm: "typo-14-medium",
  md: "typo-16-medium",
  lg: "typo-24-medium",
};

/**
 * 아바타와 이름을 함께 표시하는 프로필 컴포넌트입니다.
 *
 * - `name`: 표시할 이름. 아바타 색상 결정에도 사용됩니다.
 * - `size`: 아바타 크기 (`sm` | `md` | `lg`)
 *
 * @example
 * ```tsx
 * <Profile name="여수경" size="md" />
 * ```
 */
export default function Profile({ name, size = "md" }: ProfileProps) {
  const fontClasses = TEXT_SIZE[size];
  return (
    <div className="flex items-center gap-2">
      <Avatar seed={name} size={size} aria-hidden="true" />
      <span className={` text-gray-900 ${fontClasses}`}>{name}</span>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { IcChevronLeft } from "@/shared/assets/icons";

type BackHeaderProps = {
  /** 뒤로가기 버튼 옆, 좌측에 표시할 제목입니다. */
  title: string;
};

/**
 * 뒤로가기 버튼과 좌측 정렬 제목으로 구성된 드릴다운 페이지용 헤더입니다.
 *
 * 탭바 없이 뒤로가기로 진입하는 `(action)` 목적지(전체 그룹 목록, 그룹 상세 등)에서
 * 공통으로 사용합니다. 뒤로가기는 이전 페이지로 이동(`router.back()`)합니다.
 *
 * @example
 * <BackHeader title="전체 그룹" />
 */
export default function BackHeader({ title }: BackHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center gap-2 bg-white px-4 py-6">
      <button type="button" aria-label="뒤로 가기" onClick={() => router.back()}>
        <IcChevronLeft className="h-7 w-7" />
      </button>
      <h1 className="typo-20-bold">{title}</h1>
    </header>
  );
}

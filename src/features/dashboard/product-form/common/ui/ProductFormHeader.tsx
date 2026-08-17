"use client";

import { useRouter } from "next/navigation";
import { IcChevronLeft } from "@/shared/assets/icons";

type ProductFormHeaderProps = {
  /** 헤더 중앙에 표시할 제목. 페이지에 따라 다르게 전달합니다. 예: "제품 등록" | "제품 수정" */
  title: string;
};

/**
 * 상품 등록·수정 폼 상단에 놓이는 헤더입니다.
 *
 * 등록/수정 페이지가 "뒤로 가기 + 가운데 정렬 제목" 레이아웃을 공유하되,
 * 제목(`title`)만 다르게 주입해 재사용합니다. 뒤로 가기는 이전 페이지로
 * 이동(`router.back()`)하는 공통 동작이므로 컴포넌트 내부에서 처리합니다.
 *
 * - `title`: 가운데에 표시할 제목 (예: "제품 등록" | "제품 수정")
 *
 * @example
 * ```tsx
 * // 등록 페이지
 * <ProductFormHeader title="제품 등록" />
 *
 * // 수정 페이지
 * <ProductFormHeader title="제품 수정" />
 * ```
 */
export default function ProductFormHeader({ title }: ProductFormHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative flex items-center justify-center bg-white px-4 py-6">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => router.back()}
        className="absolute left-4"
      >
        <IcChevronLeft className="h-7 w-7" />
      </button>
      <h1 className="typo-18-bold">{title}</h1>
    </header>
  );
}

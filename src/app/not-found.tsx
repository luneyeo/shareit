"use client";

import { useRouter } from "next/navigation";
import Button from "@/shared/ui/button/Button";
import ErrorFallback from "@/shared/ui/error-fallback/ErrorFallback";

/**
 * 404 페이지. 존재하지 않는 경로에 접근했을 때 표시됩니다.
 */
export default function NotFound() {
  const router = useRouter();

  return (
    <ErrorFallback
      animation="404"
      message="페이지를 찾을 수 없어요"
      description="요청하신 페이지가 존재하지 않거나 주소가 변경되었어요."
    >
      <Button theme="primary" size="md" className="w-full" onClick={() => router.push("/")}>
        홈으로 이동
      </Button>
      <Button theme="secondary" size="md" className="w-full" onClick={() => router.back()}>
        이전 페이지로 이동
      </Button>
    </ErrorFallback>
  );
}

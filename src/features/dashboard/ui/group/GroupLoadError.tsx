"use client";

interface GroupLoadErrorProps {
  /** 재시도 동작. 클라이언트는 refetch, 서버 에러 바운더리는 reset을 넘긴다. */
  onRetry: () => void;
}

/**
 * 그룹 정보 조회 실패 시 보여주는 재시도 가능한 에러 화면입니다.
 *
 * "그룹 없음(EmptyState)"·"존재하지 않는 그룹"과 구분되는 **조회 실패** 상태 전용입니다.
 */
export default function GroupLoadError({ onRetry }: GroupLoadErrorProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-16 text-center">
      <p className="typo-16-semibold">그룹 정보를 불러오지 못했어요</p>
      <p className="typo-14-medium text-gray-500">잠시 후 다시 시도해 주세요.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-full border border-primary-600 px-5 py-2.5 text-primary-600 typo-14-semibold"
      >
        다시 시도
      </button>
    </div>
  );
}

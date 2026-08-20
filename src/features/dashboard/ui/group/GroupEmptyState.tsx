import { IcPlus } from "@/shared/assets/icons";

/**
 * 속한 그룹이 없을 때 대시보드 인덱스(`/dashboard`)에서 보여주는 EmptyState입니다.
 *
 * TODO: '새 그룹 만들기' 버튼에 그룹 생성 다이얼로그를 연결한다. (현재는 UI만)
 */
export default function GroupEmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 px-5 py-24 text-center">
      <p className="typo-16-semibold">아직 속한 그룹이 없어요</p>
      <p className="typo-14-medium text-gray-500">새로운 그룹을 추가해보세요.</p>
      <button
        type="button"
        // TODO: 그룹 생성 다이얼로그 연결
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-white typo-16-medium"
      >
        <span className="flex size-5 items-center justify-center">
          <IcPlus className="size-4" />
        </span>
        새 그룹 만들기
      </button>
    </div>
  );
}

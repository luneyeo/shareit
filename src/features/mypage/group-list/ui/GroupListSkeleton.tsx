import Skeleton from "@/shared/ui/skeleton/Skeleton";

/** 로딩 중 보여줄 그룹 카드 개수. */
const SKELETON_COUNT = 3;

/**
 * 전체 그룹 목록의 카드 목록 로딩 스켈레톤입니다.
 *
 * 필터 탭·총 개수는 로딩과 무관하게 상위(GroupListPage)에서 항상 렌더하므로 여기 포함하지 않습니다.
 * 카드는 {@link GroupListItem}의 line-height(이름·서브텍스트 각 24px)와 여백을 따릅니다.
 */
export default function GroupListSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        그룹 목록을 불러오는 중이에요
      </p>
      <ul className="flex flex-col gap-3" aria-hidden="true">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <li key={index}>
            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4">
              <div className="flex flex-col gap-0.5">
                <div className="flex h-6 items-center">
                  <Skeleton shape="text" className="h-5 w-20" />
                </div>
                <div className="flex h-6 items-center gap-0.5">
                  <Skeleton shape="text" className="w-40" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

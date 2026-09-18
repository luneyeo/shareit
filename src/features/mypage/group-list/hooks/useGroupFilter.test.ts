import { renderHook, act } from "@testing-library/react";
import { useGroupFilter } from "@/features/mypage/group-list/hooks/useGroupFilter";
import { useMyGroupList } from "@/features/dashboard/hooks/useMyGroupList";
import { GROUP_FILTERS } from "@/features/mypage/group-list/constants/groupFilters";
import type { MyGroupSummary } from "@/shared/api/group/types";

jest.mock("@/features/dashboard/hooks/useMyGroupList");

const mockUseMyGroupList = jest.mocked(useMyGroupList);

const GROUPS: MyGroupSummary[] = [
  { id: "1", name: "내 그룹", role: "owner", memberCount: 3 },
  { id: "2", name: "참여 그룹", role: "member", memberCount: 5 },
];

/** useMyGroupList 반환값을 필요한 필드만 지정해 mock한다. */
function mockGroupList(override: Partial<ReturnType<typeof useMyGroupList>>): void {
  mockUseMyGroupList.mockReturnValue({
    data: undefined,
    isPending: false,
    isError: false,
    refetch: jest.fn(),
    ...override,
  } as ReturnType<typeof useMyGroupList>);
}

describe("useGroupFilter", () => {
  it("기본 필터 'all'에서는 전체 그룹을 돌려준다", () => {
    mockGroupList({ data: GROUPS });

    const { result } = renderHook(() => useGroupFilter());

    expect(result.current.filter).toBe("all");
    expect(result.current.groups).toHaveLength(2);
    expect(result.current.total).toBe(2);
    expect(result.current.filters).toBe(GROUP_FILTERS);
  });

  it("필터를 바꾸면 해당 role의 그룹만 남긴다", () => {
    mockGroupList({ data: GROUPS });

    const { result } = renderHook(() => useGroupFilter());

    act(() => result.current.setFilter("owner"));

    expect(result.current.groups).toEqual([GROUPS[0]]);
    expect(result.current.total).toBe(1);
  });

  it("조회 성공 & 그룹이 0개일 때만 isEmpty가 참이다", () => {
    mockGroupList({ data: [] });

    const { result } = renderHook(() => useGroupFilter());

    expect(result.current.isEmpty).toBe(true);
  });

  it("로딩 중에는 빈 상태가 에러를 가리지 않도록 isEmpty가 거짓이다", () => {
    mockGroupList({ data: undefined, isPending: true });

    const { result } = renderHook(() => useGroupFilter());

    expect(result.current.isEmpty).toBe(false);
  });

  it("에러일 때도 isEmpty는 거짓이다", () => {
    mockGroupList({ data: undefined, isError: true });

    const { result } = renderHook(() => useGroupFilter());

    expect(result.current.isEmpty).toBe(false);
  });
});

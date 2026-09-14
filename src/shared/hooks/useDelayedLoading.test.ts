import { renderHook, act } from "@testing-library/react";
import { useDelayedLoading } from "@/shared/hooks/useDelayedLoading";

describe("useDelayedLoading", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("delay(기본 200ms) 전에는 false를 유지한다", () => {
    const { result } = renderHook(() => useDelayedLoading(true));

    act(() => jest.advanceTimersByTime(199));

    expect(result.current).toBe(false);
  });

  it("delay 이상 로딩이 지속되면 true가 된다", () => {
    const { result } = renderHook(() => useDelayedLoading(true));

    act(() => jest.advanceTimersByTime(200));

    expect(result.current).toBe(true);
  });

  it("delay 전에 로딩이 끝나면 스켈레톤을 건너뛴다(계속 false)", () => {
    const { result, rerender } = renderHook(({ loading }) => useDelayedLoading(loading), {
      initialProps: { loading: true },
    });

    act(() => jest.advanceTimersByTime(100));
    rerender({ loading: false });
    act(() => jest.advanceTimersByTime(200));

    expect(result.current).toBe(false);
  });

  it("노출된 뒤 로딩이 끝나면 즉시 false로 돌아간다", () => {
    const { result, rerender } = renderHook(({ loading }) => useDelayedLoading(loading), {
      initialProps: { loading: true },
    });

    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe(true);

    rerender({ loading: false });
    expect(result.current).toBe(false);
  });

  it("커스텀 delay를 적용한다", () => {
    const { result } = renderHook(() => useDelayedLoading(true, 500));

    act(() => jest.advanceTimersByTime(499));
    expect(result.current).toBe(false);

    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe(true);
  });
});

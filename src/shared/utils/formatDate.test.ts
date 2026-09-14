import { formatDate } from "@/shared/utils/formatDate";

describe("formatDate", () => {
  it("YYYY-MM-DD 문자열을 한국어 날짜로 변환한다", () => {
    expect(formatDate("2026-03-12")).toBe("2026년 3월 12일");
  });

  it("월·일의 앞자리 0을 제거한다", () => {
    expect(formatDate("2026-01-01")).toBe("2026년 1월 1일");
  });

  it("Date 객체도 변환한다", () => {
    // 월은 0-based이므로 2는 3월을 의미한다.
    expect(formatDate(new Date(2026, 2, 12))).toBe("2026년 3월 12일");
  });

  it("YYYY-MM-DD 문자열은 시간대에 따라 날짜가 밀리지 않는다", () => {
    // new Date("2026-03-01")는 UTC 자정으로 해석돼 음수 오프셋 지역에서 2월로 밀릴 수 있다.
    // 문자열 경로는 new Date를 타지 않으므로 항상 3월 1일을 유지해야 한다.
    expect(formatDate("2026-03-01")).toBe("2026년 3월 1일");
  });
});

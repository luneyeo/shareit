import { AuthError } from "@supabase/supabase-js";
import { getSessionUserId } from "./getSessionUserId";

const mockGetSession = jest.fn();

jest.mock("@/shared/lib/supabase/client", () => ({
  createClient: () => ({ auth: { getSession: mockGetSession } }),
}));

describe("getSessionUserId", () => {
  it("세션이 있으면 사용자 id를 반환한다", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: "user-1" } } },
      error: null,
    });

    expect(await getSessionUserId()).toEqual({ userId: "user-1", error: null });
  });

  it("오류 없이 세션이 없으면 비로그인으로 반환한다", async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });

    expect(await getSessionUserId()).toEqual({ userId: null, error: null });
  });

  it("세션 조회에 실패하면 오류를 비로그인과 구분해 반환한다", async () => {
    const error = new AuthError("refresh failed");
    mockGetSession.mockResolvedValue({ data: { session: null }, error });

    expect(await getSessionUserId()).toEqual({ userId: null, error });
  });
});

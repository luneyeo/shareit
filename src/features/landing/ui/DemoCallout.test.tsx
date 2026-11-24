import { act, render, screen } from "@testing-library/react";
import { getSessionUserId } from "@/shared/api/auth/getSessionUserId";
import DemoCallout from "./DemoCallout";

jest.mock("@/shared/api/auth/getSessionUserId", () => ({ getSessionUserId: jest.fn() }));
jest.mock("@/shared/hooks/useScrolledToBottom", () => ({
  useScrolledToBottom: () => ({ sentinelRef: { current: null }, reached: true }),
}));

const mockGetSessionUserId = jest.mocked(getSessionUserId);

describe("DemoCallout 노출 (맨 아래까지 스크롤한 상태)", () => {
  beforeEach(() => sessionStorage.clear());

  it("비로그인 상태면 데모 안내를 보여준다", async () => {
    mockGetSessionUserId.mockResolvedValue(null);

    render(<DemoCallout />);

    expect(await screen.findByText("데모 체험하기")).toBeInTheDocument();
  });

  it("로그인 상태면 데모 안내를 보여주지 않는다", async () => {
    mockGetSessionUserId.mockResolvedValue("user-1");

    await act(async () => {
      render(<DemoCallout />);
    });

    expect(screen.queryByText("데모 체험하기")).not.toBeInTheDocument();
  });

  it("세션 확인이 끝나기 전에는 보여주지 않는다", () => {
    mockGetSessionUserId.mockReturnValue(new Promise(() => {}));

    render(<DemoCallout />);

    expect(screen.queryByText("데모 체험하기")).not.toBeInTheDocument();
  });
});

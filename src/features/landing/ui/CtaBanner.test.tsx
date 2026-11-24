import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AUTH_MESSAGE } from "@/features/auth/constants/messages";
import { getSessionUserId } from "@/shared/api/auth/getSessionUserId";
import { InvalidInviteCodeError, joinGroup } from "@/shared/api/group/joinGroup";
import { toast } from "@/shared/ui/feedback";
import CtaBanner from "./CtaBanner";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock("@/shared/api/auth/getSessionUserId", () => ({ getSessionUserId: jest.fn() }));
jest.mock("@/shared/api/group/joinGroup", () => ({
  ...jest.requireActual("@/shared/api/group/joinGroup"),
  joinGroup: jest.fn(),
}));
jest.mock("@/shared/ui/feedback", () => ({ toast: { error: jest.fn() } }));

const mockGetSessionUserId = jest.mocked(getSessionUserId);
const mockJoinGroup = jest.mocked(joinGroup);

const submitCode = (code: string) => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <CtaBanner />
    </QueryClientProvider>
  );
  fireEvent.change(screen.getByLabelText("초대 코드"), { target: { value: code } });
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
};

describe("CtaBanner 초대 코드 제출", () => {
  beforeEach(() => jest.clearAllMocks());

  it("로그인 상태에서 무효한 코드면 토스트로 안내하고 이동하지 않는다", async () => {
    mockGetSessionUserId.mockResolvedValue("user-1");
    mockJoinGroup.mockRejectedValue(new InvalidInviteCodeError());

    submitCode("BADCODE");

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith(AUTH_MESSAGE.INVITE.JOIN.INVALID));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("로그인 상태에서 시스템 오류면 오류 토스트로 안내한다", async () => {
    mockGetSessionUserId.mockResolvedValue("user-1");
    mockJoinGroup.mockRejectedValue(new Error("network"));

    submitCode("GOOD");

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith(AUTH_MESSAGE.INVITE.JOIN.ERROR));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("로그인 상태에서 유효한 코드면 해당 그룹 대시보드로 이동한다", async () => {
    mockGetSessionUserId.mockResolvedValue("user-1");
    mockJoinGroup.mockResolvedValue({ id: "42" });

    submitCode(" GOOD ");

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard/42"));
    expect(mockJoinGroup).toHaveBeenCalledWith("GOOD");
  });

  it("비로그인 상태면 코드를 실어 /auth로 이동한다", async () => {
    mockGetSessionUserId.mockResolvedValue(null);

    submitCode("GOOD");

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/auth?invite=GOOD"));
    expect(mockJoinGroup).not.toHaveBeenCalled();
  });
});

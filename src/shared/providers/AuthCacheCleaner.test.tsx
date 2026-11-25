import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { queryKeys } from "@/shared/constants/queryKey";
import { useAuthStore } from "@/shared/store/authStore";
import { AuthCacheCleaner } from "./AuthCacheCleaner";

let emit: (event: AuthChangeEvent, session: Session | null) => void;
const mockUnsubscribe = jest.fn();
const mockRouter = { refresh: jest.fn() };

jest.mock("next/navigation", () => ({ useRouter: () => mockRouter }));
jest.mock("@/shared/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      onAuthStateChange: (callback: typeof emit) => {
        emit = callback;
        return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
      },
    },
  }),
}));

const PRODUCT_KEY = queryKeys.products.detail("g1", "p1");
const sessionOf = (id: string) => ({ user: { id } }) as Session;

const setup = () => {
  const queryClient = new QueryClient();
  const view = render(
    <QueryClientProvider client={queryClient}>
      <AuthCacheCleaner />
    </QueryClientProvider>
  );
  const cacheProduct = () => queryClient.setQueryData(PRODUCT_KEY, { prdName: "상품" });
  cacheProduct();
  useAuthStore.getState().setUser(sessionOf("user-a").user);
  return {
    ...view,
    cacheProduct,
    hasProduct: () => queryClient.getQueryData(PRODUCT_KEY) !== undefined,
  };
};

const getStoreUserId = () => useAuthStore.getState().user?.id;

describe("AuthCacheCleaner", () => {
  beforeEach(() => jest.clearAllMocks());

  it("로그아웃하면 쿼리 캐시·라우터 캐시와 authStore의 사용자를 제거한다", () => {
    const { hasProduct } = setup();
    emit("INITIAL_SESSION", sessionOf("user-a"));
    emit("SIGNED_OUT", null);
    expect(hasProduct()).toBe(false);
    expect(mockRouter.refresh).toHaveBeenCalledTimes(1);
    expect(getStoreUserId()).toBeUndefined();
  });

  it("초기 세션을 읽지 못했더라도 로그아웃하면 캐시를 제거한다", () => {
    const { hasProduct } = setup();
    emit("INITIAL_SESSION", null);
    emit("SIGNED_OUT", null);
    expect(hasProduct()).toBe(false);
  });

  it("로그아웃 이벤트 없이 다른 계정의 세션으로 바뀌면 캐시를 제거하고 새 사용자를 반영한다", () => {
    const { hasProduct } = setup();
    emit("INITIAL_SESSION", sessionOf("user-a"));
    emit("SIGNED_IN", sessionOf("user-b"));
    expect(hasProduct()).toBe(false);
    expect(mockRouter.refresh).toHaveBeenCalledTimes(1);
    expect(getStoreUserId()).toBe("user-b");
  });

  it("로그아웃으로 이미 비운 뒤 다른 계정으로 로그인하면 새 계정의 캐시를 유지한다", () => {
    const { cacheProduct, hasProduct } = setup();
    emit("INITIAL_SESSION", sessionOf("user-a"));
    emit("SIGNED_OUT", null);
    cacheProduct();
    emit("SIGNED_IN", sessionOf("user-b"));
    expect(hasProduct()).toBe(true);
    expect(mockRouter.refresh).toHaveBeenCalledTimes(1);
  });

  it("같은 계정의 세션 이벤트에는 캐시를 유지한다", () => {
    const { hasProduct } = setup();
    emit("INITIAL_SESSION", sessionOf("user-a"));
    emit("SIGNED_IN", sessionOf("user-a"));
    emit("TOKEN_REFRESHED", sessionOf("user-a"));
    expect(hasProduct()).toBe(true);
    expect(mockRouter.refresh).not.toHaveBeenCalled();
  });

  it("언마운트하면 구독을 해제한다", () => {
    setup().unmount();
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });
});

import { QueryClient, isServer } from "@tanstack/react-query";

/**
 * SSR 환경에 맞춘 기본 옵션으로 QueryClient를 생성한다.
 * staleTime을 두어 서버에서 프리페치한 데이터가 클라이언트에서 즉시 리페치되지 않게 한다.
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

/**
 * 서버에서는 요청마다 새 QueryClient를 만들고,
 * 브라우저에서는 하나의 인스턴스를 재사용한다.
 */
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

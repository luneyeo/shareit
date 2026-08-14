import type { Group } from "./types";

// TODO: 실제 Supabase 멤버십 조회로 교체. 현재는 데이터 계층 연동 전까지 사용하는 임시 목업.
const MY_GROUPS: Group[] = [
  { id: "g1", name: "송파구 공주들" },
  { id: "g2", name: "강남 러너스" },
  { id: "g3", name: "한강 자전거" },
];

/**
 * 로그인한 사용자가 멤버로 속한 그룹 목록을 반환한다.
 *
 * TODO: Supabase 연동 시 내부를 실제 조회(useQuery)로 교체한다.
 */
export function useMyGroups(): Group[] {
  return MY_GROUPS;
}

// TODO: Supabase 연동 후 위 목업 버전을 아래 형태로 교체한다.
// 조회는 비동기라 반환 타입이 { data, isLoading, error }로 바뀌므로,
// 소비처(TabBar·views/dashboard)에서 로딩/에러 처리가 필요하다.
//
// import { useQuery } from "@tanstack/react-query";
// import { createClient } from "@/shared/lib/supabase/client";
// import { queryKeys } from "@/shared/constants/queryKey";
//
// export function useMyGroups() {
//   return useQuery({
//     queryKey: queryKeys.groups.my,
//     queryFn: async (): Promise<Group[]> => {
//       const supabase = createClient();
//       const { data, error } = await supabase.from("rooms").select("*");
//       if (error) throw error;
//       return data;
//     },
//   });
// }

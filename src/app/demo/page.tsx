import { Suspense } from "react";
import { DemoDashboardPage, DemoDashboardView } from "@/views/demo/DemoDashboardPage";

export const metadata = { title: "데모 체험" };

// useSearchParams를 쓰는 본문은 정적 HTML에서 빠지므로, fallback으로 기본 그룹 화면을 담는다.
export default function Page() {
  return (
    <Suspense fallback={<DemoDashboardView rawGroupId={null} />}>
      <DemoDashboardPage />
    </Suspense>
  );
}

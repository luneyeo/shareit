import { Suspense } from "react";
import { DemoDashboardPage } from "@/views/demo/DemoDashboardPage";

export const metadata = { title: "데모 체험" };

export default function Page() {
  return (
    <Suspense>
      <DemoDashboardPage />
    </Suspense>
  );
}

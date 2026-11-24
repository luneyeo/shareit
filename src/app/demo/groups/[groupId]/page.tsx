import { DEMO_GROUP_DETAILS } from "@/shared/mock/demoData";
import { DemoGroupDetailPage } from "@/views/demo/DemoGroupDetailPage";

export const metadata = { title: "그룹 상세 — 데모" };

export function generateStaticParams() {
  return Object.keys(DEMO_GROUP_DETAILS).map((groupId) => ({ groupId }));
}

// NOTE: 클라이언트 컴포넌트를 바로 default export하면 generateStaticParams가 무시되므로 서버 컴포넌트로 감싼다.
export default function Page() {
  return <DemoGroupDetailPage />;
}

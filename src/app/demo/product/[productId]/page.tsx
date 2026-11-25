import { DEMO_PRODUCTS_BY_ID } from "@/shared/mock/demoData";
import { DemoProductPage } from "@/views/demo/DemoProductPage";

export const metadata = { title: "상품 상세 — 데모" };

export function generateStaticParams() {
  return Object.keys(DEMO_PRODUCTS_BY_ID).map((productId) => ({ productId }));
}

// NOTE: 클라이언트 컴포넌트를 바로 default export하면 generateStaticParams가 무시되므로 서버 컴포넌트로 감싼다.
export default function Page() {
  return <DemoProductPage />;
}

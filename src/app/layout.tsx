import type { Metadata, Viewport } from "next";
import "@/shared/styles/global.css";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Toaster } from "@/shared/ui/feedback";
import { Analytics } from "@vercel/analytics/next";
import { getSiteUrl } from "@/shared/constants/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Shareit!",
    template: "%s | Shareit!",
  },
  description: "비공개 그룹 기반의 제품 정보를 공유하는 공간",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Shareit!",
    locale: "ko_KR",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Shareit!" }],
  },
  verification: {
    google: "QEfcAyhkCvlGFRRzAyd_M9YLc3ISI69OGAQ3EGsbqEA",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

// NOTE: 여기서 cookies() 등 요청 시점 API를 쓰면 모든 페이지가 동적 렌더링된다. 세션 조회는 (private) 레이아웃에서 한다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-dvh bg-[#0F1B20]">
        {/*
         * 데스크탑·태블릿에서도 모바일 폭(480px)으로 중앙 고정. transform-gpu로 내부 fixed(탭바·오버레이)를 프레임 안에 가둔다.
         * 프레임은 뷰포트 높이로 고정(h-dvh)하고 콘텐츠만 내부 스크롤시켜, fixed 푸터가 프레임(=뷰포트) 하단에 항상 고정되도록 한다.
         */}
        <div className="mx-auto flex h-dvh w-full max-w-120 flex-col overflow-hidden bg-background transform-gpu">
          <QueryProvider>
            <div className="flex-1 overflow-y-auto scrollbar-none">{children}</div>
          </QueryProvider>
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

# 비공개 그룹 플랫폼의 메타데이터 범위 설정

- SEO 메타데이터를 도입하려다, 일반 웹 서비스의 "최대한 색인" 가이드가 이 서비스엔 정반대로 위험하다는 걸 발견한 기록.
- 처음엔 "인증으로 막혀 있으니 괜찮겠지" 싶었지만, **색인 정책의 기본값 자체를 차단으로 뒤집는** 게 핵심이었다.

## 1. 문제 상황

프로젝트에 SEO 메타데이터(전역 메타태그·사이트맵·robots·동적 메타데이터)를 도입하려 했다. 그런데 일반적인 웹 서비스의 SEO 가이드를 그대로 적용하기 어려운 지점이 있었다.

**Shareit은 비공개 그룹 기반 플랫폼이다.** 랜딩·인증 페이지를 제외한 대부분의 콘텐츠(대시보드, 상품 상세, 그룹, 마이페이지)가 인증 뒤에 있는 그룹 내부용 데이터다.

일반적인 SEO는 "**최대한 많이 색인되게**"가 목표지만, 이 서비스는 **그룹 내부 콘텐츠가 검색 엔진에 노출되면 안 되는** 정반대의 요구가 있었다. 여기서 두 가지 판단이 필요했다.

- 메타데이터를 **어디까지** 정의할 것인가 (범위)
- 색인 정책의 **기본값**을 색인 허용으로 둘 것인가, 차단으로 둘 것인가

## 2. 원인 분석 — 기존 접근의 위험

인증으로 막혀 있으니 크롤러가 접근 못 해서 괜찮지 않냐고 생각할 수 있다. 하지만 다음 경우에 비공개 콘텐츠가 노출될 여지가 있었다.

- 인증 리다이렉트가 완료되기 전 서버 렌더링 순간의 노출
- 내부 링크가 외부로 유출됐을 때 크롤러의 접근 시도
- 상품 링크를 메신저로 공유할 때 스크래퍼 봇이 **로그인 없이** 페이지를 읽어 상품 정보(제목·이미지)가 미리보기로 새어 나가는 문제

즉 "색인 허용을 기본값으로 두고 비공개 페이지만 하나씩 차단"하는 방식은, **차단을 하나라도 빠뜨리면 곧바로 정보 노출로 이어지는** 구조였다.

## 3. 해결 — "기본 차단(default noindex), 공개 페이지만 허용"

색인 정책의 기본값을 **차단**으로 뒤집었다. 루트 레이아웃에서 전체를 noindex로 깔고, 공개해도 되는 페이지에서만 명시적으로 색인을 허용하는 **opt-in 방식**이다. 이렇게 하면 새 페이지를 추가할 때 실수로 색인 허용을 빠뜨려도 안전 방향(비노출)으로 작동한다.

이 원칙에 따라 메타데이터 범위를 아래와 같이 확정했다.

| 영역                                   | 색인    | OG/공유 미리보기 | 이유                          |
| -------------------------------------- | ------- | ---------------- | ----------------------------- |
| 랜딩 (`/`)                             | ✅ 허용 | ✅               | 유일한 공개 마케팅 페이지     |
| 인증 (`/auth`)                         | ❌ 차단 | ❌               | 로그인 게이트, 색인 가치 없음 |
| 대시보드·상품·마이페이지 (`(private)`) | ❌ 차단 | ❌               | 그룹 내부 비공개 데이터       |

상품 상세는 그룹원 공유 시 링크 미리보기가 있으면 편하지만, 그러려면 스크래퍼가 로그인 없이 페이지를 읽어야 해 **비공개 원칙과 정면으로 충돌**한다. 편의보다 프라이버시를 우선해 상품 페이지는 **완전 noindex + OG 미정의**로 결정했다.

## 4. 구현 내용

### (1) 환경별 사이트 URL 헬퍼

커스텀 도메인이 아직 없어 Vercel 환경변수로 URL을 분기했다. 도메인이 생기면 이 함수 한 곳만 수정하면 되도록 격리했다.

```ts
// src/shared/constants/site.ts
export function getSiteUrl() {
  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" &&
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`; // 프리뷰/브랜치 배포
  }
  return "http://localhost:3000"; // 로컬
}
```

### (2) 전역 메타데이터 — 기본값 noindex

```ts
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: "Shareit!", template: "%s | Shareit!" },
  description: "비공개 그룹에서 물건을 나누고 공유하는 공간, Shareit!",
  robots: { index: false, follow: false }, // ★ 루트 기본값은 차단
  openGraph: { type: "website", siteName: "Shareit!", locale: "ko_KR" },
};
```

`metadataBase`를 지정해 OG 이미지·canonical의 상대경로가 절대 URL로 해석되게 하고, `title.template`으로 하위 페이지 제목 규칙을 통일했다.

### (3) 공개 페이지에서만 색인 허용 (opt-in)

```ts
// src/app/(public)/(landing)/page.tsx
export const metadata: Metadata = {
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};
```

### (4) robots.ts / sitemap.ts

색인 대상 HTML이 없는 `/api`만 disallow. `/auth`·`/dashboard`·`/mypage`는 크롤러가 noindex를 읽어 URL까지 제외되도록 허용하고, 콘텐츠 접근 제어는 `proxy.ts` 인증에 위임했다.

```ts
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api"] },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
```

```ts
// src/app/sitemap.ts — 공개 라우트만. 비공개 URL은 절대 포함하지 않는다.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

## 5. 결과

- **비공개 콘텐츠의 검색 노출을 구조적으로 차단**했다. 기본값이 차단이라 페이지를 추가해도 안전 방향으로 동작한다.
- 색인·robots·sitemap의 정책이 **"공개 = 랜딩뿐"이라는 단일 기준**으로 일관되게 정렬됐다.
- 사이트 URL 로직을 헬퍼 한 곳에 격리해 도메인 확보 시 **수정 지점을 1개소로 최소화**했다.

## 마치며

이 작업의 핵심은 코드 구현보다 "**메타데이터를 어디까지 정의할지 범위를 먼저 정하는 것**"이었다. 서비스가 비공개 플랫폼이라는 도메인 특성에서 출발해 색인 정책의 기본값 자체를 뒤집은 것이 판단의 핵심이었다. 일반적인 베스트 프랙티스도 서비스 성격에 따라 정반대가 될 수 있다는 걸 다시 확인한 사례다.

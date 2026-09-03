# Shareit!(쉐어릿)

> 이 프로젝트는 아직 활발히 개발 중이며, 내용과 API가 변경될 수 있습니다.

사용자가 추천하고 싶은 제품을 그룹 단위로 공유할 수 있는 서비스로, 대시보드 형태로 탐색할 수 있는 커뮤니티 서비스로 사용자 간 정보 공유 UX 개선에 중점을 둔 프로젝트

---

<br>

## 📌 프로젝트 상태

| 항목          | 상태       |
| ------------- | ---------- |
| 현재 버전     | `v1.0.0`   |
| 최근 업데이트 | 2026-09-01 |

<br>

## ✨ 주요 기능

- [x] 소셜 로그인 (Kakao)
- [x] 그룹 관리(생성 및 입장)
- [x] 그룹 관리(수정 및 삭제)
- [x] 상품 관리(생성, 수정, 삭제)
- [ ] 좋아요 페이지

<br>

## 🛠️ 기술 스택

**언어**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

**프레임워크**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

**상태 관리 · 데이터 페칭**

![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=flat-square&logo=react&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

**데이터베이스**

![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)

**패키지 매니저 · 배포**

![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<br>

## 📂 폴더 구조

큰 틀에서 `app`, `features`, `shared`, `views` 네 영역으로 구분합니다.

- `app` — 라우팅 전용 영역으로, 경로와 레이아웃만 담당합니다.
- `views` — 페이지 조합용 영역으로, `features`와 `shared`를 조합해 하나의 페이지를 구성합니다.
- `features` — 도메인별 기능 단위로 UI·API·타입을 관리합니다.
- `shared` — 여러 곳에서 재사용하는 공통 리소스를 모아둡니다.

```
src/
├── app/                # 라우팅 전용
│   ├── (public)/           # 비로그인 접근
│   │   ├── (auth)/             # 인증 (Kakao 로그인)
│   │   └── (landing)/          # 랜딩
│   ├── (private)/          # 로그인 필요
│   │   ├── (tab)/              # 탭 네비게이션 (대시보드·마이페이지)
│   │   └── (action)/           # 상세·폼 등 단일 액션 화면
│   └── api/                # Route Handlers
│
├── views/              # 페이지 조합용 (features·shared를 조합해 한 페이지 구성)
│   ├── auth/
│   ├── landing/
│   ├── dashboard/          # 목록·상세·상품 폼
│   └── mypage/             # 그룹 목록·상세
│
├── features/           # 도메인별 기능 단위 (ui·hooks·api·types)
│   ├── auth/
│   ├── landing/
│   ├── dashboard/          # 그룹·상품 (product-detail, product-form)
│   │   ├── ui/                 # 도메인 UI 컴포넌트
│   │   ├── hooks/              # React Query 훅
│   │   ├── api/
│   │   └── types.ts
│   └── mypage/             # group-list, group-detail
│
└── shared/             # 공통 리소스
    ├── ui/                 # 공통 컴포넌트 (button, dialog, dropdown 등)
    ├── api/                # 도메인 API 함수 (group, product, auth)
    ├── hooks/              # 공통 훅
    ├── lib/                # 외부 라이브러리 래퍼 (supabase)
    ├── store/              # 전역 상태 (Zustand)
    ├── providers/          # 컨텍스트 프로바이더
    ├── constants/          # 상수 (queryKey, category 등)
    ├── utils/              # 유틸 함수
    ├── styles/             # 전역 스타일
    ├── types/              # 전역 타입
    └── assets/             # 폰트·아이콘·로티
```

<br>

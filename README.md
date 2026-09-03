# Shareit!(쉐어릿)

<!-- 이미지 영역 -->

## 소개 및 개요

- 배포 URL : [🔗 쉐어릿](https://shareit-puce.vercel.app/)

### [프로젝트 설명]

- 그룹 단위로 **제품을 추천하고 공유할 수 있는 커뮤니티 서비스**입니다.
- 사용자는 자신이 추천하고 싶은 제품을 등록하고, 그룹 멤버들과 실시간으로 정보를 공유할 수 있습니다.
- 대시보드 기반 UI를 통해 그룹 내 공유된 제품을 한눈에 탐색하고, 효율적으로 콘텐츠를 소비할 수 있습니다.
- 입장 코드를 통해 다른 사용자가 생성한 그룹에 참여하고, 관심사 기반의 소규모 커뮤니티를 형성할 수 있습니다.
- 그룹 관리자는 멤버 수 및 공유된 콘텐츠 현황을 확인하고, 그룹명 수정 및 삭제 등 그룹 운영을 직접 관리할 수 있습니다.

---

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

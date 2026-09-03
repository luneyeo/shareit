# Shareit!(쉐어릿)

<!-- 이미지 영역 -->

- 배포 URL : [🔗 쉐어릿](https://shareit-puce.vercel.app/)

## 프로젝트 소개

- 그룹 단위로 **제품을 추천하고 공유할 수 있는 커뮤니티 서비스**입니다.
- 사용자는 자신이 추천하고 싶은 제품을 등록하고, 그룹 멤버들과 실시간으로 정보를 공유할 수 있습니다.
- 대시보드 기반 UI를 통해 그룹 내 공유된 제품을 한눈에 탐색하고, 효율적으로 콘텐츠를 소비할 수 있습니다.
- 입장 코드를 통해 다른 사용자가 생성한 그룹에 참여하고, 관심사 기반의 소규모 커뮤니티를 형성할 수 있습니다.
- 그룹 관리자는 멤버 수 및 공유된 콘텐츠 현황을 확인하고, 그룹명 수정 및 삭제 등 그룹 운영을 직접 관리할 수 있습니다.

## 🛠️ 기술 스택

**언어**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

**프레임워크**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

**상태 관리 · 데이터 페칭**

![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=flat-square&logo=react&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

**폼 · 유효성 검사**

![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

**UI · 애니메이션**

![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white)
![Embla Carousel](https://img.shields.io/badge/Embla_Carousel-1A1A1A?style=flat-square&logo=embla&logoColor=white)
![Lottie](https://img.shields.io/badge/Lottie-00DDB3?style=flat-square&logo=lottiefiles&logoColor=white)

**데이터베이스**

![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)

> 테이블 스키마는 [테이블 정의서](./docs/database-schema.md)에서 확인할 수 있습니다.

**패키지 매니저 · 배포 · CI/CD**

![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

> 기술별 선택 이유와 트레이드오프는 [기술 스택](https://github.com/luneyeo/shareit/wiki/%5BFE%E2%80%90BE%5D-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D) 위키에서 확인할 수 있습니다.

<br>

## 🎬 페이지별 기능

<!-- TODO: 각 기능 GIF 추가 후 주석 해제
| 페이지        | 기능 설명                             | 미리보기          |
| ------------- | ------------------------------------- | ----------------- |
| 랜딩          | 서비스 소개 및 시작하기               | <img src="" width="240" /> |
| 로그인        | Kakao 소셜 로그인                     | <img src="" width="240" /> |
| 대시보드      | 그룹 내 공유 상품 목록·카테고리 탐색  | <img src="" width="240" /> |
| 상품 상세     | 상품 정보·이미지 캐러셀 조회          | <img src="" width="240" /> |
| 상품 등록·수정 | 상품 폼 작성 및 이미지 업로드         | <img src="" width="240" /> |
| 그룹 관리     | 그룹 생성·입장(입장 코드)             | <img src="" width="240" /> |
| 마이페이지    | 내 그룹 목록·그룹 상세(통계·관리)     | <img src="" width="240" /> |
-->

<br>

## 📂 폴더 구조

큰 틀에서 `app`, `features`, `shared`, `views` 네 영역으로 구분합니다.

- `app` — 라우팅 전용 영역으로, 경로와 레이아웃만 담당합니다.
- `views` — 페이지 조합용 영역으로, `features`와 `shared`를 조합해 하나의 페이지를 구성합니다.
- `features` — 도메인별 기능 단위로 UI·API·타입을 관리합니다.
- `shared` — 여러 곳에서 재사용하는 공통 리소스를 모아둡니다.

> 전체 폴더 트리와 레이어 의존 규칙은 [폴더와 레이어 구조](https://github.com/luneyeo/shareit/wiki/%5BFE%5D-%ED%8F%B4%EB%8D%94%EC%99%80-%EB%A0%88%EC%9D%B4%EC%96%B4-%EA%B5%AC%EC%A1%B0) 위키에서 확인할 수 있습니다.

<br>

## 📖 설계 문서

프로젝트의 설계와 컨벤션은 [Wiki](https://github.com/luneyeo/shareit/wiki)에서 확인할 수 있습니다.

- [테이블 정의서](https://github.com/luneyeo/shareit/wiki/%5BBE%5D%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%A0%95%EC%9D%98%EC%84%9C)
- [폴더와 레이어 구조](https://github.com/luneyeo/shareit/wiki/%5BFE%5D-%ED%8F%B4%EB%8D%94%EC%99%80-%EB%A0%88%EC%9D%B4%EC%96%B4-%EA%B5%AC%EC%A1%B0)
- [코드 컨벤션](https://github.com/luneyeo/shareit/wiki/%5BFE%5D-%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [커밋 컨벤션](https://github.com/luneyeo/shareit/wiki/%5BFE%5D-%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98)

<br>

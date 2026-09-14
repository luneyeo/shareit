# 테스트 러너 선택 — Jest vs Vitest

- 프로젝트에 테스트를 처음 도입하며 러너를 고르는 과정에서, 설정이 가벼운 Vitest와 Jest를 두고 고민한 기록.
- 대상은 `imageFile`·`formatDate` 같은 순수 유틸과 `useGroupFilter`·`useDelayedLoading` 같은 커스텀 훅이 1순위다.

## 1. 문제 상황

테스트 프레임워크가 없는 상태에서 처음 러너를 도입해야 했다. 두 러너 모두 우리 대상 코드에서 테스트 API(`describe/it/expect`)와 결과물은 거의 같아서, 차이가 나는 건 **환경 설정 방식**과 **앞으로의 확장 범위**였다.

## 2. 원인 분석 — Jest vs Vitest

| 기준                              | Jest                    | Vitest             |
| --------------------------------- | ----------------------- | ------------------ |
| ESM/TS 초기 설정                  | `next/jest`로 흡수      | 기본 지원, 가벼움  |
| 실행 속도                         | 보통                    | Vite 기반이라 빠름 |
| Next 컴포넌트(next/font·image 등) | `next/jest`가 자동 처리 | 플러그인·mock 수동 |
| 앱 번들러(webpack/Turbopack) 정합 | Next 설정 그대로        | 별도 Vite로 변환   |

> 참고: "Vitest = Vite 앱 전용"은 오해다. Vitest는 실행 시 자체 Vite를 띄워 테스트 파일만 변환하므로 Next 앱에서도 동작한다.

## 3. 해결 — Jest 채택

빠른 테스트 실행과 간편한 설정 등 테스트 환경만 보면 Vitest를 선택할 수도 있었다. 하지만 **현재 Vite 환경이 아니기도 하고**, 지금은 순수 유틸·커스텀 훅 테스트에 그치지만 **추후 더 넓은 범위(Next 컴포넌트 등)까지 테스트를 확장**할 수 있도록 Jest를 선택했다.

`next/jest`로 Next 설정(SWC 트랜스폼·경로 alias·환경변수 로딩)을 그대로 물려받아, 순수 유틸부터 Next 컴포넌트까지 하나의 러너로 일관되게 커버한다.

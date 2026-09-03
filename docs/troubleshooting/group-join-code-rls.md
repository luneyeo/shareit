# 그룹 입장 코드 조회 실패 (RLS × security invoker)

- 유효한 입장 코드인데도 "코드에 해당하는 그룹이 없다"며 그룹 입장에 실패한 문제를 파고든 기록.
- 처음엔 "코드나 데이터가 잘못됐나?" 싶었지만, 진짜 원인은 **RLS가 조회를 막아 그룹이 "없는 것처럼" 보인 것**이었다.

## 1. 문제 상황

DB에 정상적으로 존재하는 그룹인데도, 해당 그룹의 입장 코드를 입력하면 "코드에 해당하는 그룹이 없다"는 취지의 오류가 표시되며 그룹 입장에 실패했다.

- **관련 기능:** 입장 코드로 그룹 입장 (`joinGroup`)
- **관련 함수:** PostgreSQL 함수 `join_group_by_code` (Supabase RPC)

주요 증상은 다음과 같다.

- 유효한 입장 코드를 입력했음에도 `"입장 코드를 다시 확인해 주세요"` 메시지가 노출됨.
- 해당 그룹은 `groups` 테이블에 실제로 존재함을 확인함.
- 클라이언트 로직상 이 메시지는 **RPC가 빈 결과(`!data`)를 반환하는 경로**에서만 발생함. (네트워크·DB 오류였다면 `"입장에 실패했어요..."` 메시지가 떠야 함)

```ts
// src/shared/api/group/joinGroup.ts
if (error) throw new Error("입장에 실패했어요. 다시 시도해 주세요."); // 이 경로 아님
if (!data) throw new Error("입장 코드를 다시 확인해 주세요"); // ← 실제 발생 경로
```

즉, **에러가 아니라 "조회 결과가 비어 있는"** 상태가 문제였다.

## 2. 원인 분석

원인은 **RLS(Row Level Security) 정책과 함수 실행 권한 모드의 충돌**이었다.

`groups` 테이블에는 다음과 같은 SELECT RLS 정책이 설정되어 있었다.

```sql
-- 내가 멤버로 속한 그룹만 조회 가능
EXISTS (
  SELECT 1 FROM group_members
  WHERE group_members.group_id = groups.id
    AND group_members.user_id = auth.uid()
)
```

한편 입장 함수 `join_group_by_code`는 `security invoker`로 정의되어 있었다. `security invoker` 함수는 내부 쿼리가 **호출자(사용자)의 권한 = RLS 정책**을 그대로 적용받는다.

```sql
-- 함수 내부: 코드로 그룹을 찾는 조회
select g.id into target_group_id
from public.groups g
where g.invite_code = join_group_by_code.invite_code;
```

여기서 문제의 핵심은 다음과 같다.

- **입장은 본질적으로 "아직 멤버가 아닌 그룹"을 찾는 동작**이다.
- 그런데 RLS는 "멤버인 그룹만 조회 가능"이므로, 입장 대상자에게는 그 그룹 행이 **보이지 않는다.**
- RLS는 접근을 막을 때 에러를 던지지 않고 **행을 조용히 필터링**하므로, SELECT가 실패가 아니라 **빈 결과**를 반환한다.
- 결과적으로 `target_group_id`가 `null` → 함수가 빈 결과 반환 → 클라이언트가 "잘못된 코드"로 처리.

정리하면, **데이터가 없어서가 아니라 RLS가 조회를 차단해 "없는 것처럼" 보였던 것**이다.

진단 근거는 Supabase에서 다음 쿼리로 확정했다.

```sql
-- SELECT 정책 qual: 멤버만 조회 가능 (원인 확정)
select qual from pg_policies where tablename = 'groups' and cmd = 'SELECT';

-- 함수 실행 모드: prosecdef = false → security invoker (원인 확정)
select proname, prosecdef from pg_proc where proname = 'join_group_by_code';
```

## 3. 해결

입장 함수를 `security definer`로 변경했다.

`security definer`는 함수가 호출자가 아닌 **정의자(postgres) 권한**으로 실행되므로, 내부의 그룹 조회가 RLS를 우회해 코드에 맞는 그룹을 정상적으로 찾는다. 즉 RLS 보안은 그대로 유지한 채, **"코드를 아는 사람만 통과하는 전용 입장 통로"**를 함수로 열어주는 방식이다.

이 방식으로도 보안이 유지되는 근거는 다음과 같다.

- `groups`의 RLS 정책은 그대로 유지된다 → 일반 조회로는 여전히 멤버만 그룹을 볼 수 있음.
- 그룹 id는 **초대 코드가 정확히 일치할 때만** 반환된다 → 코드 자체가 접근 권한(capability) 역할.
- 멤버십 등록은 클라이언트 입력이 아닌 함수 내부 `auth.uid()`로만 수행 → 사용자 위조 불가.
- `set search_path = public`으로 정의자 권한 함수의 search_path 변조 공격을 방지.

## 4. 구현 내용

### (1) 함수를 `security definer`로 재정의

`join_group_by_code` 함수를 `security invoker`에서 `security definer`로 변경하고, 함께 `set search_path = public`을 지정했다.

```sql
create or replace function public.join_group_by_code(invite_code text)
returns table (id text)   -- groups.id는 bigint지만 JSON number 정밀도 한계를 피하려 text로 반환
language plpgsql
security definer          -- invoker → definer 로 변경
set search_path = public
as $$
...
$$;
```

### (2) 변경 사항을 실제 DB에 반영

SQL 파일 수정만으로는 반영되지 않는다. 실제 DB에 `create or replace function`을 **Supabase SQL Editor에서 재실행**해야 함수 정의가 갱신된다.

> ⚠️ 초기에 파일만 수정하고 재실행하지 않아 동일 증상이 지속되었다. 코드 변경 후 반드시 DB에 재실행하는 단계까지 완료해야 한다.

## 5. 결과

같은 시나리오로 다시 검증했다.

| 단계    | 결과                      | 비고                                  |
| ------- | ------------------------- | ------------------------------------- |
| 작업 전 | 유효한 코드로도 입장 실패 | RLS가 그룹 조회를 차단해 빈 결과 반환 |
| 작업 후 | 유효한 코드로 정상 입장   | `security definer`로 RLS 우회 조회    |

- 함수 재실행 후 실행 모드 확인:

  ```sql
  select proname, prosecdef from pg_proc where proname = 'join_group_by_code';
  -- prosecdef = true (security definer 반영 확인)
  ```

- 앱에서 유효한 입장 코드로 재시도 → **정상 입장 및 대시보드 진입 확인.**
- 잘못된 코드 입력 시에는 기존과 동일하게 `"입장 코드를 다시 확인해 주세요"` 정상 노출 (회귀 없음).

## 마치며

"조회 결과가 비어 있다"는 증상을 곧바로 "데이터가 없다"로 단정했다면 엉뚱한 곳을 팠을 것이다. RLS는 접근을 막을 때 **에러가 아니라 빈 결과**로 응답한다는 특성을 떠올린 게 원인을 좁힌 열쇠였다. 그리고 코드 수정과 별개로 **실제 DB에 함수를 재실행**하는 반영 단계까지 끝나야 문제가 닫힌다는 점도 다시 새겼다.

-- 그룹 생성과 생성자(owner) 멤버십 등록을 하나의 트랜잭션으로 원자화하는 함수.
--
-- 함수 본문은 단일 트랜잭션에서 실행되므로, groups insert와 group_members insert 중
-- 하나라도 실패하면 전체가 롤백된다. 따라서 멤버십 없이 그룹 행만 남는 고아 그룹이 생기지 않는다.
-- owner는 클라이언트가 넘기지 않고 함수 내부의 auth.uid()로 결정한다(위조 방지).
--
-- security definer인 이유:
-- groups insert의 `returning *`는 삽입 행을 다시 읽으므로 groups SELECT RLS(멤버만 조회)가
-- 평가되는데, 멤버십 행은 그 다음에 삽입되어 이 시점엔 아직 멤버가 아니다(정책 false → 403).
-- 정의자 권한으로 RLS를 우회하되, owner/user는 함수 내부 auth.uid()로만 정해 위조를 막는다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

-- 반환 타입(id)을 바꾸면 create or replace가 거부되므로 기존 함수를 먼저 제거한다.
drop function if exists public.create_group_with_owner(text);

create or replace function public.create_group_with_owner(group_name text)
returns table (id text, name text, invite_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_group public.groups;
begin
  insert into public.groups (name, owner_id)
  values (group_name, auth.uid())
  returning * into new_group;

  -- groups insert 트리거가 owner 멤버십을 이미 넣을 수 있어, 중복 시 조용히 무시한다(멱등).
  insert into public.group_members (group_id, user_id, role)
  values (new_group.id, auth.uid(), 'owner')
  on conflict (group_id, user_id) do nothing;

  -- id는 bigint지만 text로 반환한다. JSON number(2^53) 정밀도 한계로 큰 id가 깨지지 않도록,
  -- 클라이언트가 문자열 그대로 받게 한다.
  return query
    select new_group.id::text, new_group.name, new_group.invite_code;
end;
$$;

-- security definer 함수는 기본적으로 PUBLIC에 EXECUTE가 부여되므로, 미인증(anon) 호출을
-- 막기 위해 PUBLIC/anon 권한을 회수하고 authenticated에만 부여한다.
revoke execute on function public.create_group_with_owner(text) from public, anon;
grant execute on function public.create_group_with_owner(text) to authenticated;

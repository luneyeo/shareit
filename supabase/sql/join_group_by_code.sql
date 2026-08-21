-- 입장 코드로 그룹에 멱등하게 입장하는 함수 + 이를 뒷받침하는 복합 UNIQUE 제약.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

-- 1) (group_id, user_id) 복합 UNIQUE 제약 보장.
--    한 사용자가 같은 그룹에 두 번 등록될 수 없게 하여 중복 멤버십을 원천 차단한다.
--    (아래 함수의 ON CONFLICT가 이 제약을 대상으로 동작한다.)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'group_members_group_id_user_id_key'
  ) then
    alter table public.group_members
      add constraint group_members_group_id_user_id_key unique (group_id, user_id);
  end if;
end $$;

-- 2) 입장 함수.
--    코드로 그룹을 찾고, INSERT ... ON CONFLICT DO NOTHING으로 멤버십을 멱등하게 등록한다.
--    - 동시 요청이 들어와도 UNIQUE 제약 + ON CONFLICT로 중복 없이 한 행만 남고 에러도 나지 않는다.
--    - 이미 속한 그룹이어도 그룹 id를 그대로 반환한다.
--    - 잘못된 코드면 결과 행이 없다(빈 결과) → 클라이언트가 '잘못된 코드'로 처리.
--    - 사용자는 auth.uid()로 결정한다(위조 방지).
--
--    security definer인 이유:
--    입장 대상자는 아직 그룹 멤버가 아니므로, groups의 SELECT RLS(멤버만 조회 가능)로는
--    코드로 그룹을 찾는 조회 자체가 막힌다(빈 결과 → '잘못된 코드'로 오인). 코드가 곧 접근
--    권한이므로 정의자 권한으로 RLS를 우회해 조회하되, 멤버십은 함수 내부 auth.uid()로만
--    등록하여 위조를 막는다.
create or replace function public.join_group_by_code(invite_code text)
returns table (id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  target_group_id uuid;
begin
  select g.id into target_group_id
  from public.groups g
  where g.invite_code = join_group_by_code.invite_code;

  if target_group_id is null then
    return; -- 잘못된 코드: 빈 결과
  end if;

  insert into public.group_members (group_id, user_id, role)
  values (target_group_id, auth.uid(), 'member')
  on conflict (group_id, user_id) do nothing;

  return query select target_group_id;
end;
$$;

-- 3) EXECUTE 권한을 인증 사용자로 제한.
--    security definer 함수는 기본적으로 PUBLIC에 EXECUTE가 부여되므로, 앱의 로그인 검사와
--    무관하게 anon도 RPC를 직접 호출할 수 있다. 따라서 PUBLIC/anon 권한을 회수하고
--    authenticated에만 부여하여 RLS 우회 조회가 미인증 요청에 노출되지 않도록 한다.
revoke execute on function public.join_group_by_code(text) from public, anon;
grant execute on function public.join_group_by_code(text) to authenticated;

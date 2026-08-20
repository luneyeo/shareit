-- 그룹 생성과 생성자(owner) 멤버십 등록을 하나의 트랜잭션으로 원자화하는 함수.
--
-- 함수 본문은 단일 트랜잭션에서 실행되므로, groups insert와 group_members insert 중
-- 하나라도 실패하면 전체가 롤백된다. 따라서 멤버십 없이 그룹 행만 남는 고아 그룹이 생기지 않는다.
-- owner는 클라이언트가 넘기지 않고 함수 내부의 auth.uid()로 결정한다(위조 방지).
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.
create or replace function public.create_group_with_owner(group_name text)
returns table (id uuid, name text, invite_code text)
language plpgsql
security invoker
set search_path = public
as $$
declare
  new_group public.groups;
begin
  insert into public.groups (name, owner_id)
  values (group_name, auth.uid())
  returning * into new_group;

  insert into public.group_members (group_id, user_id, role)
  values (new_group.id, auth.uid(), 'owner');

  return query
    select new_group.id, new_group.name, new_group.invite_code;
end;
$$;

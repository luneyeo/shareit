-- groups.member_count를 group_members 변화에 맞춰 자동 동기화하는 트리거.
--
-- 멤버 insert(그룹 생성 시 owner 등록 포함)/delete마다 카운트를 ±1 한다.
-- '생성 시 1로 세팅'만 하면 이후 입장·탈퇴에 값이 어긋나므로, 원천에서 항상 동기화한다.
--   - 그룹 생성: handle_new_group 트리거가 owner를 넣음 → 이 트리거가 member_count = 1로 만든다.
--   - 입장(join_group_by_code) / 탈퇴: 각각 +1 / -1.
-- create_group_with_owner의 owner insert는 on conflict do nothing이라 중복 시 행이 안 들어가고,
-- 그때는 AFTER INSERT도 발동하지 않아 이중 카운트되지 않는다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

create or replace function public.sync_group_member_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.groups
    set member_count = member_count + 1
    where id = new.group_id;
  elsif tg_op = 'DELETE' then
    update public.groups
    set member_count = member_count - 1
    where id = old.group_id;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_sync_group_member_count on public.group_members;
create trigger trg_sync_group_member_count
after insert or delete on public.group_members
for each row execute function public.sync_group_member_count();

-- 트리거 도입 이전에 생성돼 member_count가 어긋난 기존 그룹을 실제 멤버 수로 보정한다(1회성).
update public.groups g
set member_count = (
  select count(*) from public.group_members m where m.group_id = g.id
);

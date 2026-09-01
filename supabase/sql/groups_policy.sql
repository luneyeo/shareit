-- groups / group_members 테이블의 RLS 정책.
--
-- 이 정책들은 기존 프로젝트 대시보드에만 있고 저장소엔 없어서, 새 DB로 옮길 때 누락됐다.
-- RLS는 켜져 있으나 정책이 없어 security invoker 함수(create_group_with_owner)의
-- INSERT가 전부 차단되어 그룹 생성이 403으로 실패했다. 이를 복구한다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

-- 0) 멤버십 확인 헬퍼.
--    "같은 그룹 멤버끼리 서로 보이게" 하려면 group_members SELECT 정책이 group_members를
--    다시 참조해야 하는데, 그대로 두면 RLS가 자기 자신을 재귀 평가해 무한 루프가 난다.
--    security definer 함수 안에서는 RLS가 적용되지 않으므로, 이 함수로 재귀를 끊는다.
create or replace function public.is_group_member(gid bigint)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.group_members
    where group_id = gid and user_id = auth.uid()
  );
$$;

-- 1) groups
alter table public.groups enable row level security;

-- 본인을 owner로 하는 그룹만 생성 가능. (owner 위조 방지)
drop policy if exists "insert own group" on public.groups;
create policy "insert own group"
on public.groups for insert to authenticated
with check (owner_id = (select auth.uid()));

-- 멤버로 속한 그룹만 조회 가능.
drop policy if exists "select member groups" on public.groups;
create policy "select member groups"
on public.groups for select to authenticated
using (public.is_group_member(id));

-- owner만 그룹 정보(이름 등) 수정 가능.
-- (정책 없으면 update가 오류 없이 0행 처리되어 조용히 무시된다.)
drop policy if exists "update own group" on public.groups;
create policy "update own group"
on public.groups for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

-- owner만 그룹 삭제 가능.
-- (정책 없으면 delete가 오류 없이 0행 처리되어 프론트가 "권한 없음"으로 실패 처리한다.)
-- group_members·products는 group_id FK의 ON DELETE CASCADE로 함께 정리된다.
drop policy if exists "delete own group" on public.groups;
create policy "delete own group"
on public.groups for delete to authenticated
using (owner_id = (select auth.uid()));

-- 2) group_members
alter table public.group_members enable row level security;

-- 본인 멤버십만 등록 가능. (다른 유저 명의로 입장 위조 방지)
drop policy if exists "insert own membership" on public.group_members;
create policy "insert own membership"
on public.group_members for insert to authenticated
with check (user_id = (select auth.uid()));

-- 자신이 속한 그룹의 멤버 행을 볼 수 있다. (멤버 수 집계·멤버 목록에 필요)
drop policy if exists "select group memberships" on public.group_members;
create policy "select group memberships"
on public.group_members for select to authenticated
using (public.is_group_member(group_id));

-- 본인 멤버십만 삭제 가능. (그룹 나가기)
-- (정책 없으면 delete가 오류 없이 0행 처리되어 프론트가 "나갈 수 없음"으로 실패 처리한다.)
-- 단, 방장은 나가기로 자기 멤버십만 지우면 groups.owner_id가 남아 상태가 불일치하므로 제외한다.
-- (방장은 그룹 삭제로만 정리 가능. 삭제 시 group_members는 CASCADE로 함께 제거된다.)
drop policy if exists "delete own membership" on public.group_members;
create policy "delete own membership"
on public.group_members for delete to authenticated
using (
  user_id = (select auth.uid())
  and not exists (
    select 1 from public.groups g
    where g.id = group_id and g.owner_id = (select auth.uid())
  )
);

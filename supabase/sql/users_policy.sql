-- users 테이블의 RLS 정책 (SELECT / INSERT / UPDATE).
--
-- 새 DB 이전 시 기존 대시보드에만 있던 정책이 누락됐다. RLS는 켜져 있으나 정책이 없어:
--   - SELECT 불가 → products_with_recommender 뷰의 닉네임 조인이 null이 되어 '알 수 없음'으로 뜬다.
--   - INSERT/UPDATE 불가 → 로그인 콜백의 saveUserProfile upsert(route.ts)가 조용히 막힌다.
--
-- 접근 모델:
--   - SELECT : 본인 + 같은 그룹에 속한 멤버의 프로필(닉네임 등)을 조회할 수 있다.
--   - INSERT : 본인 행만 생성(가입 트리거와 별개로 upsert의 insert 경로 대비).
--   - UPDATE : 본인 프로필만 수정.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

-- 0) 같은 그룹 소속 여부 헬퍼.
--    users 정책에서 group_members를 직접 참조하면 RLS 평가가 얽히므로, security definer 함수로
--    RLS를 우회해 판정한다. (is_group_member와 동일한 패턴)
create or replace function public.shares_group_with(target uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.group_members me
    join public.group_members other on other.group_id = me.group_id
    where me.user_id = auth.uid()
      and other.user_id = target
  );
$$;

alter table public.users enable row level security;

-- SELECT: 본인 + 같은 그룹 멤버.
drop policy if exists "select self and co-members" on public.users;
create policy "select self and co-members"
on public.users for select
to authenticated
using (
  id = (select auth.uid())
  or public.shares_group_with(id)
);

-- INSERT: 본인 행만.
drop policy if exists "insert own user" on public.users;
create policy "insert own user"
on public.users for insert
to authenticated
with check (id = (select auth.uid()));

-- UPDATE: 본인 프로필만.
drop policy if exists "update own user" on public.users;
create policy "update own user"
on public.users for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

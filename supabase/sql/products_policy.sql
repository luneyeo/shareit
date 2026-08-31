-- products 테이블 RLS 정책 (SELECT / INSERT / UPDATE / DELETE).
--
-- 새 DB 이전 시 기존 대시보드에만 있던 SELECT·INSERT 정책이 누락됐다. 삭제 기능용
-- DELETE 정책과 함께 전체를 정의한다.
--
-- 접근 모델:
--   - SELECT : 자신이 속한 그룹의 상품만 조회한다.
--   - INSERT : 본인(user_id=auth.uid()) 명의로, 자신이 속한 그룹에만 등록한다.
--   - UPDATE : 등록자 본인만 수정한다. (정책 없으면 update가 0행으로 조용히 무시됨)
--   - DELETE : 등록자 본인만 삭제한다.
--
-- group_id는 groups(id)를 참조하는 스칼라 bigint로 보고 is_group_member(group_id)로 검사한다.
-- is_group_member() 헬퍼는 groups_policy.sql에서 정의하므로 이 파일보다 먼저 실행돼 있어야 한다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

alter table public.products enable row level security;

-- SELECT: 자신이 속한 그룹의 상품만.
drop policy if exists "select group products" on public.products;
create policy "select group products"
on public.products for select
to authenticated
using (public.is_group_member(group_id));

-- INSERT: 본인 명의로, 자신이 속한 그룹에만.
drop policy if exists "insert own products" on public.products;
create policy "insert own products"
on public.products for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and public.is_group_member(group_id)
);

-- UPDATE: 등록자 본인만.
drop policy if exists "update own products" on public.products;
create policy "update own products"
on public.products for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

-- DELETE: 등록자 본인만.
drop policy if exists "delete own products" on public.products;
create policy "delete own products"
on public.products for delete
to authenticated
using (user_id = (select auth.uid()));

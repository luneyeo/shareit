-- products 테이블 수정(UPDATE)에 대한 RLS 정책.
--
-- INSERT·SELECT 정책은 있으나 UPDATE 정책이 없어, 소유자의 수정 요청이 정책에 걸려
-- '0행 갱신'으로 조용히 무시됐다. (Supabase는 RLS로 막힌 update를 에러 없이 0행 처리한다.)
-- 등록자(user_id) 본인만 자신의 상품을 수정하도록 허용한다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

drop policy if exists "update own products" on public.products;

create policy "update own products"
on public.products for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

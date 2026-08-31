-- products에 등록자(추천인) 닉네임을 조인해 노출하는 뷰.
--
-- getProduct는 이 뷰를 조회해 상품 컬럼 + 추천인 nickname을 한 번에 받는다.
-- (products.user_id → users.id 조인. 등록자가 users에 없거나 볼 수 없으면 nickname은 null →
--  화면에선 '알 수 없음' 폴백으로 표시된다. 그래서 inner가 아닌 left join을 쓴다.)
--
-- security_invoker = on 인 이유:
-- 뷰는 기본적으로 정의자(postgres) 권한으로 실행되어 밑단 테이블의 RLS를 우회한다.
-- 그대로 두면 이 뷰로 남의 그룹 상품까지 읽힌다. invoker로 지정해 조회자의 권한으로 실행시켜,
-- products의 SELECT RLS(select group products = is_group_member)와 users의 RLS가 그대로 적용되게 한다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

create or replace view public.products_with_recommender
with (security_invoker = on)
as
select
  p.id,
  p.brand_name,
  p.prd_name,
  p.price,
  p.description,
  p.image_url,
  p.tag,
  p.category,
  p.store,
  p.user_id,
  p.group_id,
  p.created_at,
  u.nickname
from public.products p
left join public.users u on u.id = p.user_id;

-- PostgREST가 authenticated 롤로 뷰를 조회할 수 있도록 SELECT 권한을 부여한다.
-- (security_invoker라 권한과 별개로 RLS는 그대로 적용된다.)
grant select on public.products_with_recommender to authenticated;

-- groups.product_count를 products 변화에 맞춰 자동 동기화하는 트리거.
--
-- 상품 insert/delete마다 해당 그룹의 카운트를 ±1 하고, group_id가 바뀌면(그룹 이동)
-- 이전 그룹에서 차감하고 새 그룹에 더한다. (products UPDATE 정책이 group_id 변경을 허용함)
-- '조회 시 count(*)'가 아니라 컬럼으로 두는 이유는 getGroupDetail이 groups.product_count를
-- 필수로 읽기 때문이다. 원천(products)에서 항상 동기화해 실제 상품 수와 어긋나지 않게 한다.
--
-- 컬럼이 없는 배포에서는 조회 자체가 실패하므로, 컬럼 선언·백필·트리거를 하나의
-- 트랜잭션으로 함께 적용한다. (member_count와 동일한 방식)
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

begin;

-- 컬럼이 없으면 NOT NULL DEFAULT 0으로 추가한다. (기존 행은 0으로 채워진 뒤 아래에서 보정)
alter table public.groups
  add column if not exists product_count integer not null default 0;

create or replace function public.sync_group_product_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.groups
    set product_count = product_count + 1
    where id = new.group_id;
  elsif tg_op = 'DELETE' then
    update public.groups
    set product_count = product_count - 1
    where id = old.group_id;
  elsif tg_op = 'UPDATE' then
    -- group_id가 실제로 바뀐 경우에만 이전 그룹 -1, 새 그룹 +1로 옮긴다.
    if old.group_id is distinct from new.group_id then
      update public.groups
      set product_count = product_count - 1
      where id = old.group_id;
      update public.groups
      set product_count = product_count + 1
      where id = new.group_id;
    end if;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_sync_group_product_count on public.products;
create trigger trg_sync_group_product_count
after insert or delete or update of group_id on public.products
for each row execute function public.sync_group_product_count();

-- 컬럼 추가/트리거 도입 이전에 존재하던 상품을 실제 개수로 보정한다(1회성).
update public.groups g
set product_count = (
  select count(*) from public.products p where p.group_id = g.id
);

commit;

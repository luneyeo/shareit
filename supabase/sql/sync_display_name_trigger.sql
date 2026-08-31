-- public.users.nickname을 auth.users의 display_name(대시보드 Authentication > Users 표시명)으로 동기화.
--
-- 대시보드의 'Display name' 컬럼은 auth.users.raw_user_meta_data->>'display_name'에서 읽는다.
-- 앱의 nickname을 소스로 삼아, users.nickname이 생성/변경될 때마다 그 값을 display_name에 반영한다.
--
-- security definer인 이유: authenticated 롤은 auth.users를 수정할 수 없으므로, 정의자(postgres)
-- 권한으로 갱신한다. raw_user_meta_data는 기존 키를 보존하도록 병합(||)한다.
--
-- 무한 루프 없음: 이 트리거는 public.users → auth.users(UPDATE)로만 쓰고, 가입 트리거
-- (handle_new_user)는 auth.users INSERT에서만 발동하므로 서로 재귀하지 않는다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

create or replace function public.sync_display_name()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update auth.users
  set raw_user_meta_data =
    coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('display_name', new.nickname)
  where id = new.id;
  return new;
end;
$$;

-- nickname이 실제로 설정/변경될 때만 발동한다.
drop trigger if exists trg_sync_display_name on public.users;
create trigger trg_sync_display_name
after insert or update of nickname on public.users
for each row
execute function public.sync_display_name();

-- 트리거 도입 이전에 만들어진 기존 유저의 display_name을 현재 nickname으로 1회 보정한다.
update auth.users au
set raw_user_meta_data =
  coalesce(au.raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('display_name', pu.nickname)
from public.users pu
where pu.id = au.id;

-- Images 버킷에 대한 Storage 업로드(INSERT) 정책.
--
-- storage.objects에는 기본적으로 RLS가 켜져 있어, 정책이 없으면 로그인한 사용자라도
-- 업로드가 "row-level security policy" 위반으로 거부된다. 이 앱은 anon key + 세션으로
-- 요청하므로 authenticated 역할에 대해 Images 버킷 업로드를 허용한다.
-- 조회는 public 버킷의 공개 엔드포인트로 처리되므로 SELECT 정책은 두지 않는다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.
drop policy if exists "authenticated upload to Images" on storage.objects;

create policy "authenticated upload to Images"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'Images' );

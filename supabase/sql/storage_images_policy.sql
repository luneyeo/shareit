-- product-images 버킷 생성 및 업로드에 대한 서버 측 제한.
--
-- 클라이언트의 형식·크기 검사는 악의적 사용자가 Storage API를 직접 호출하면 우회할 수
-- 있다. 따라서 크기·MIME은 버킷 설정으로, 사용자 범위(경로)는 storage.objects RLS로
-- 서버에서 강제한다. (DoS 완화, CWE-400)
--
-- 사용자당 파일 수 상한은 여기서 강제하지 않는다. RLS에서 storage.objects를 자기참조로
-- 세는 방식은 재귀·호환성 문제가 있어, 개수 제한이 필요해지면 트리거나 정리 작업으로 뺀다.
--
-- 적용: Supabase SQL Editor(또는 마이그레이션)에서 1회 실행한다.

-- 1) product-images 버킷을 멱등하게 생성/설정한다.
--    버킷이 없으면 uploadProductImages의 업로드가 Storage 오류로 실패하므로, 초기화 시 함께 만든다.
--    getPublicUrl로 공개 URL을 사용하므로 public = true. 버킷 단위로 크기(50MB)·MIME(이미지)도 제한한다.
--    이미 있으면 공개 범위·크기·MIME 설정만 현재 값으로 맞춘다.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 52428800, array['image/*']) -- 52428800 = 50 MiB
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) 로그인 사용자가 '자신의 폴더'({uid}/...)에만 업로드하도록 제한한다. (사용자 범위 격리)
drop policy if exists "authenticated upload to Images" on storage.objects;

create policy "authenticated upload to Images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

-- 3) 로그인 사용자가 '자신의 폴더'({uid}/...)의 객체만 삭제하도록 허용한다.
--    상품 삭제 시 deleteProduct가 참조 없는 이미지를 함께 정리한다. 업로드와 동일한 소유 검사를
--    쓰므로, 상품 등록자(=이미지 업로더=폴더 소유자)만 자기 이미지를 지울 수 있다.
drop policy if exists "authenticated delete own Images" on storage.objects;

create policy "authenticated delete own Images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

-- (정리) 개수 제한을 위해 추가했던 SELECT 정책이 남아 있으면 제거한다.
drop policy if exists "authenticated read own Images" on storage.objects;

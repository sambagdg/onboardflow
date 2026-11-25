-- 004 : bucket privé, les fichiers ne sont accessibles que par URL signée

update storage.buckets set public = false where id = 'onboarding-files';
drop policy if exists "public_read_files" on storage.objects;

-- Rattrapage des fichiers envoyés par l'ancien code entre la 003 et le déploiement
update public.submissions
set file_path = split_part(file_url, '/onboarding-files/', 2)
where file_path is null;

-- Tout fichier a désormais un chemin
alter table public.submissions alter column file_path set not null;

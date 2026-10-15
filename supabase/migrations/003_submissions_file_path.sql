-- 003 : stocker le chemin du fichier (et non l'URL publique) pour générer des URL signées

alter table public.submissions add column if not exists file_path text;

-- Remplir le chemin des fichiers existants à partir de leur URL publique
update public.submissions
set file_path = split_part(file_url, '/onboarding-files/', 2)
where file_path is null;

-- Le nouveau code n'écrira plus file_url
alter table public.submissions alter column file_url drop not null;

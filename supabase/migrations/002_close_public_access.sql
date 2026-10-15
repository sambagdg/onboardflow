-- 002 : le client passe par le serveur (clé secrète) ; plus aucun accès anonyme

-- Tâches : plus de lecture ni de modification publique
drop policy if exists "public_read_tasks" on public.tasks;
drop policy if exists "public_update_completed" on public.tasks;

-- Fichiers reçus : plus d'insertion publique
drop policy if exists "public_insert_submissions" on public.submissions;

-- Storage : plus d'upload public (il passe par /api/upload)
drop policy if exists "public_upload_files" on storage.objects;

-- Storage : l'ancienne règle laissait TOUT compte connecté supprimer
-- les fichiers de TOUTES les agences. On la limite à l'agence propriétaire.
drop policy if exists "agence_delete_files" on storage.objects;
create policy "agence_delete_own_files" on storage.objects
  for delete using (
    bucket_id = 'onboarding-files'
    and exists (
      select 1 from public.projects p
      where p.slug = (storage.foldername(name))[1]
        and p.agency_id = auth.uid()
    )
  );

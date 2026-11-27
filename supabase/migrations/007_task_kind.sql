-- 007 : type de tâche choisi par l'agence (action à cocher, ou document à joindre)

alter table public.tasks
  add column if not exists kind text not null default 'action'
  check (kind in ('action', 'document'));

-- Les tâches qui ont déjà reçu un fichier sont des tâches "document"
update public.tasks t
set kind = 'document'
where kind = 'action'
  and exists (select 1 from public.submissions s where s.task_id = t.id);

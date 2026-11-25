-- 005 : date limite optionnelle sur une tâche (un jour, sans heure ni fuseau)
alter table public.tasks add column if not exists due_date date;

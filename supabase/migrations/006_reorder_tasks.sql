-- 006 : réordonner les tâches d'un projet en une seule transaction

create or replace function public.reorder_tasks(p_project_id uuid, p_task_ids uuid[])
returns void
language sql
security invoker
set search_path = ''
as $$
  update public.tasks t
  set position = o.ord - 1
  from unnest(p_task_ids) with ordinality as o(id, ord)
  where t.id = o.id
    and t.project_id = p_project_id;
$$;

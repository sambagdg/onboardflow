-- 008 : validation des tâches par l'agence

-- Date de validation par l'agence (vide = pas encore validée)
alter table public.tasks add column if not exists approved_at timestamptz;

-- Message de l'agence quand elle refuse un envoi ("le scan est illisible")
alter table public.tasks add column if not exists review_note text;

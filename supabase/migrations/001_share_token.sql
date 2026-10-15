-- 001 : jeton aléatoire pour le lien client (remplace le slug devinable)
alter table public.projects
  add column share_token uuid not null unique default gen_random_uuid();

-- ============================================================
-- OnboardFlow — Schéma Supabase
-- À coller dans l'éditeur SQL de ton projet Supabase
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- Table : projects
-- Un espace onboarding par client, créé par l'agence
-- ============================================================
create table public.projects (
  id          uuid primary key default uuid_generate_v4(),
  agency_id   uuid not null references auth.users(id) on delete cascade,
  client_name text not null,
  description text,
  slug        text not null unique,
  created_at  timestamptz not null default now()
);

-- Index pour retrouver rapidement les projets d'une agence
create index projects_agency_id_idx on public.projects(agency_id);

-- RLS : l'agence ne voit que ses propres projets
alter table public.projects enable row level security;

create policy "agence_select_own" on public.projects
  for select using (auth.uid() = agency_id);

create policy "agence_insert_own" on public.projects
  for insert with check (auth.uid() = agency_id);

create policy "agence_update_own" on public.projects
  for update using (auth.uid() = agency_id);

create policy "agence_delete_own" on public.projects
  for delete using (auth.uid() = agency_id);

-- ============================================================
-- Table : tasks
-- Éléments de checklist définis par l'agence
-- ============================================================
create table public.tasks (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  title       text not null,
  description text,
  completed   boolean not null default false,
  position    int not null default 0,
  created_at  timestamptz not null default now()
);

create index tasks_project_id_idx on public.tasks(project_id);

alter table public.tasks enable row level security;

-- L'agence gère ses tâches
create policy "agence_manage_tasks" on public.tasks
  for all using (
    exists (
      select 1 from public.projects
      where projects.id = tasks.project_id
        and projects.agency_id = auth.uid()
    )
  );

-- Le client peut lire et cocher les tâches (accès anon via slug)
create policy "public_read_tasks" on public.tasks
  for select using (true);

create policy "public_update_completed" on public.tasks
  for update using (true) with check (true);

-- ============================================================
-- Table : submissions
-- Fichiers envoyés par le client
-- ============================================================
create table public.submissions (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  task_id     uuid references public.tasks(id) on delete set null,
  file_url    text not null,
  file_name   text not null,
  created_at  timestamptz not null default now()
);

create index submissions_project_id_idx on public.submissions(project_id);

alter table public.submissions enable row level security;

-- L'agence voit les soumissions de ses projets
create policy "agence_select_submissions" on public.submissions
  for select using (
    exists (
      select 1 from public.projects
      where projects.id = submissions.project_id
        and projects.agency_id = auth.uid()
    )
  );

-- N'importe qui peut uploader (page publique client)
create policy "public_insert_submissions" on public.submissions
  for insert with check (true);

-- ============================================================
-- Storage : bucket onboarding-files
-- ============================================================
insert into storage.buckets (id, name, public)
values ('onboarding-files', 'onboarding-files', true)
on conflict (id) do nothing;

-- Lecture publique des fichiers
create policy "public_read_files" on storage.objects
  for select using (bucket_id = 'onboarding-files');

-- Upload public (page client sans auth)
create policy "public_upload_files" on storage.objects
  for insert with check (bucket_id = 'onboarding-files');

-- Suppression réservée à l'agence authentifiée
create policy "agence_delete_files" on storage.objects
  for delete using (
    bucket_id = 'onboarding-files' and auth.uid() is not null
  );

# OnboardFlow 🚀

> SaaS B2B d'onboarding clients — Next.js 16 · Supabase · Docker · CI/CD

[![CI/CD](https://github.com/sambagdg/onboardflow/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/sambagdg/onboardflow/actions/workflows/ci-cd.yml)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://onboardflow-woad.vercel.app)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)
![Node](https://img.shields.io/badge/Node-22-339933?logo=node.js)
![Security](https://img.shields.io/badge/npm%20audit-0%20faille-brightgreen)

**Démo :** https://onboardflow-woad.vercel.app

## Le produit

Une agence crée un **projet d'onboarding** pour chaque client et lui partage un lien public (`/onboarding/[slug]`). Le client suit sa checklist, coche les tâches et envoie ses fichiers, sans créer de compte. L'agence suit l'avancement depuis son dashboard.

| Côté agence (connecté) | Côté client (lien public) |
| --- | --- |
| Inscription / connexion (Supabase Auth) | Checklist de tâches à cocher |
| Création et gestion des projets | Envoi de fichiers (Supabase Storage) |
| Suivi des tâches et des fichiers reçus | Aucun compte requis |

## Stack

- **Frontend** : Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend** : Supabase (Auth, Postgres, Storage) avec Row Level Security sur toutes les tables
- **DevOps** : Docker multi-stage, GitHub Actions, Vercel
- **Sécurité** : `npm audit` dans la CI, branche `main` protégée, PR obligatoire

## Pipeline CI/CD

Un seul workflow : [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml). Du merge sur `main` à la prod en ~2 min 45.

```
push dev / PR → main
        │
        ▼
┌──────────────────────────────────────────────┐
│ 1. Lint, typecheck & build                   │  lint · tsc · npm audit · tests · next build
└──────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────┐
│ 2. Docker Build                              │  valide le Dockerfile
└──────────────────────────────────────────────┘
        │  main uniquement ↓
        ▼
┌──────────────────────────────────────────────┐
│ 3. Deploy to Vercel                          │  vercel build --prod + deploy --prebuilt
└──────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────┐
│ 4. Healthcheck                               │  GET /api/health → 200 sur PROD_URL
└──────────────────────────────────────────────┘
```

**Flux Git** : on travaille sur `dev`, on ouvre une PR `dev → main`. Le push direct sur `main` est refusé et le check « Lint, typecheck & build » doit passer avant le merge.

## Lancer en local

Prérequis : Node 22 et un projet Supabase.

```bash
git clone https://github.com/sambagdg/onboardflow.git
cd onboardflow
npm install
cp .env.example .env.local   # remplir les clés Supabase
npm run dev                  # http://localhost:3000
```

Variables d'environnement :

| Variable | Où la trouver |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |

Base de données : exécuter [supabase/schema.sql](supabase/schema.sql) dans le SQL Editor de Supabase (tables, policies RLS et bucket `onboarding-files`).

### Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript (`tsc --noEmit`) |

## Lancer avec Docker

Les variables `NEXT_PUBLIC_*` sont intégrées au bundle **au moment du build** : il faut les passer en `--build-arg`, pas au `docker run`.

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx \
  -t onboardflow .

docker run -p 3000:3000 onboardflow
curl http://localhost:3000/api/health
```

L'image est construite en 3 étapes (`deps` → `builder` → `runner`) à partir de la sortie `standalone` de Next.js : l'image finale ne contient que le serveur et les fichiers statiques.

## Structure

```
src/
├── app/
│   ├── (auth)/              # login, register
│   ├── (dashboard)/         # dashboard agence, création et détail de projet
│   ├── onboarding/[slug]/   # page publique côté client
│   ├── auth/callback/       # retour des liens email Supabase
│   └── api/                 # health, projects, upload
├── components/
└── lib/supabase/            # clients Supabase (navigateur / serveur)
supabase/schema.sql          # schéma, RLS, storage
Dockerfile
.github/workflows/ci-cd.yml
```

## Ce que j'ai appris

| Problème rencontré | Leçon |
| --- | --- |
| Supabase cassé dans l'image Docker | Les `NEXT_PUBLIC_*` sont figées au build, pas au démarrage → `ARG` + `--build-arg` |
| PR bloquées après le changement de pipeline | Le nom d'un check requis doit correspondre exactement au nom du job |
| `npm audit` en échec | L'audit en CI trouve de vraies failles (Next 16.2.4 critique → 16.3.8) |
| Healthcheck en 401 | Tester l'URL que visitent les utilisateurs, pas l'URL unique (protégée) du déploiement |
| Variable Vercel renommée par le CLI | Lire les options d'un assistant au lieu de valider par défaut |
| Typecheck cassé en local | Garder le projet hors d'iCloud (doublons `routes.d 2.ts` dans `.next`) |

## Roadmap

- [ ] Environnements de preview depuis `dev`
- [ ] Rollback automatique si le healthcheck échoue
- [ ] Tests (Vitest, Playwright) sur le login et l'onboarding
- [ ] Image publiée sur GitHub Container Registry
- [ ] Cache du build Docker

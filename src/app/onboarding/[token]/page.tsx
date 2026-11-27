import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { ChecklistClient } from "@/components/onboarding/ChecklistClient";
import { FileUpload } from "@/components/onboarding/FileUpload";
import { Reveal } from "@/components/landing/reveal";
import { withSignedUrls } from "@/lib/storage";
import type { Project } from "@/types";

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Le jeton du lien est la seule preuve d'accès (pas de compte côté client)
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("projects")
    .select("id, client_name, description, tasks(*), submissions(*)")
    .eq("share_token", token)
    .single();

  if (!data) notFound();

  const project = data as Project;
  const tasks = (project.tasks ?? []).sort((a, b) => a.position - b.position || a.created_at.localeCompare(b.created_at));
  const submissions = await withSignedUrls(project.submissions ?? []);
  const taskFiles = submissions.filter((s) => s.task_id);
  const generalFiles = submissions.filter((s) => !s.task_id);

  // La progression et le message de fin vivent dans ChecklistClient (une seule source de vérité,
  // mise à jour à chaque coche) : la page ne les calcule plus côté serveur.
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl backdrop-saturate-150 supports-backdrop-filter:bg-background/70">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:px-6">
          <span className="text-[17px] font-semibold tracking-tight">OnboardFlow</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Espace privé
          </span>
        </div>
      </header>

      <Reveal className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <div data-reveal className="mb-12">
          <p className="mb-3 text-sm font-medium text-primary">Espace d&apos;onboarding</p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
            {project.client_name}
          </h1>
          {project.description && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{project.description}</p>
          )}
        </div>

        <section data-reveal className="mb-14">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Votre checklist</h2>
          <ChecklistClient initialTasks={tasks} initialSubmissions={taskFiles} token={token} />
        </section>

        <section data-reveal>
          <h2 className="mb-1 text-lg font-semibold tracking-tight">Autres documents</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Un fichier qui ne correspond à aucune tâche ? Déposez-le ici.
          </p>
          <FileUpload token={token} initialSubmissions={generalFiles} />
        </section>
      </Reveal>
    </div>
  );
}

import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { ChecklistClient } from "@/components/onboarding/ChecklistClient";
import { FileUpload } from "@/components/onboarding/FileUpload";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types";

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*, tasks(*), submissions(*)")
    .eq("slug", slug)
    .single();

  if (!data) notFound();

  const project = data as Project;
  const tasks = (project.tasks ?? []).sort((a, b) => a.position - b.position);
  const submissions = project.submissions ?? [];

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Top progress bar */}
      <div className="fixed top-0 inset-x-0 z-50 h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <span className="font-bold text-base tracking-tight">
            Onboard<span className="text-primary">Flow</span>
          </span>
          {total > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground tabular-nums hidden sm:block">
                {completed}/{total} tâches
              </span>
              <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-primary tabular-nums">{percent}%</span>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-10">

        {/* Project header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">Espace d'onboarding</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{project.client_name}</h1>
          {project.description && (
            <p className="text-muted-foreground">{project.description}</p>
          )}
        </div>

        {/* Completion banner */}
        {percent === 100 && total > 0 && (
          <Card className="mb-8 border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="flex items-center gap-4 py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                  Tout est complété, bravo !
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Votre agence a été notifiée et va traiter votre dossier.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Checklist */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Votre checklist</h2>
          <ChecklistClient initialTasks={tasks} projectId={project.id} />
        </section>

        {/* File upload */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold tracking-tight">Documents à envoyer</h2>
            {submissions.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {submissions.length} fichier{submissions.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <FileUpload projectSlug={slug} initialSubmissions={submissions} />
        </section>
      </div>
    </div>
  );
}

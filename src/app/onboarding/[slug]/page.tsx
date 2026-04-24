import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { ChecklistClient } from "@/components/onboarding/ChecklistClient";
import { FileUpload } from "@/components/onboarding/FileUpload";
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
    <div className="min-h-screen bg-[#06090F]">
      {/* Top progress bar */}
      <div className="fixed top-0 inset-x-0 z-50 h-0.5 bg-[#1A2840]">
        <div
          className="h-full bg-sky-400 transition-all duration-700"
          style={{
            width: `${percent}%`,
            boxShadow: "0 0 12px rgba(56,189,248,0.6)",
          }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-[#1A2840] bg-[#06090F]/90 backdrop-blur-xl px-6 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
            Onboard<span className="text-sky-400">Flow</span>
          </span>
          {total > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{completed}/{total} tâches</span>
              <div className="h-1.5 w-20 bg-[#1A2840] rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-sky-400">{percent}%</span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Project header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span className="text-xs font-medium text-sky-400">Espace d'onboarding</span>
          </div>
          <h1
            className="text-3xl font-bold text-slate-100 mb-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {project.client_name}
          </h1>
          {project.description && (
            <p className="text-slate-400">{project.description}</p>
          )}
        </div>

        {/* Completion banner */}
        {percent === 100 && total > 0 && (
          <div className="mb-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
              <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5 8-8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-emerald-400" style={{ fontFamily: "var(--font-syne)" }}>
                Tout est complété, bravo !
              </p>
              <p className="text-sm text-slate-400 mt-0.5">
                Votre agence a été notifiée et va traiter votre dossier.
              </p>
            </div>
          </div>
        )}

        {/* Checklist */}
        <section className="mb-8">
          <h2
            className="text-base font-bold text-slate-100 mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Votre checklist
          </h2>
          <ChecklistClient
            initialTasks={tasks}
            projectId={project.id}
          />
        </section>

        {/* Documents */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-base font-bold text-slate-100"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Documents à envoyer
            </h2>
            {submissions.length > 0 && (
              <span className="text-xs text-slate-500">
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

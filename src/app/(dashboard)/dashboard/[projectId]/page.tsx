import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { AddTaskForm } from "@/components/dashboard/AddTaskForm";
import { TaskRow } from "@/components/dashboard/TaskRow";
import { CopyLinkButton } from "@/components/dashboard/CopyLinkButton";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const supabase = await createServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*, tasks(*), submissions(*)")
    .eq("id", projectId)
    .single();

  if (!data) notFound();

  const project = data as Project;
  const tasks = (project.tasks ?? []).sort((a, b) => a.position - b.position);
  const submissions = project.submissions ?? [];
  const completed = tasks.filter((t) => t.completed).length;
  const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
  const isComplete = tasks.length > 0 && percent === 100;

  const clientUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/onboarding/${project.slug}`;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-200 transition-colors mb-6"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Retour
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center shrink-0">
            <span
              className="text-sm font-bold text-sky-400"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {project.client_name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <h1
              className="text-xl font-bold text-slate-100"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {project.client_name}
            </h1>
            {project.description && (
              <p className="text-sm text-slate-500 mt-0.5">{project.description}</p>
            )}
          </div>
        </div>
        <CopyLinkButton url={clientUrl} />
      </div>

      {/* Progress card */}
      <div className="rounded-2xl border border-[#1A2840] bg-[#0D1424] p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-400">Progression client</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-200 tabular-nums">
              {completed} / {tasks.length}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                isComplete
                  ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                  : tasks.length === 0
                  ? "bg-[#1A2840] text-slate-500 border-transparent"
                  : "bg-sky-400/10 text-sky-400 border-sky-400/20"
              }`}
            >
              {percent}%
            </span>
          </div>
        </div>
        <div className="h-1.5 bg-[#1A2840] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percent}%`,
              background: isComplete
                ? "#34D399"
                : "linear-gradient(90deg, #38BDF8, #818CF8)",
              boxShadow: percent > 0 && !isComplete
                ? "0 0 10px rgba(56,189,248,0.4)"
                : undefined,
            }}
          />
        </div>
        {isComplete && (
          <p className="mt-3 text-sm text-center font-semibold text-emerald-400">
            🎉 Le client a complété toutes les tâches !
          </p>
        )}
      </div>

      {/* Checklist */}
      <section className="rounded-2xl border border-[#1A2840] bg-[#0D1424] p-6 mb-4">
        <h2
          className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Checklist
        </h2>

        {tasks.length > 0 ? (
          <ul className="flex flex-col gap-2 mb-5">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} projectId={projectId} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-600 italic mb-5">
            Aucune tâche. Ajoutez les éléments que votre client doit fournir.
          </p>
        )}

        <AddTaskForm projectId={projectId} />
      </section>

      {/* Documents */}
      <section className="rounded-2xl border border-[#1A2840] bg-[#0D1424] p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2
            className="text-sm font-bold text-slate-100 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Documents reçus
          </h2>
          {submissions.length > 0 && (
            <span className="text-xs font-semibold bg-[#1A2840] text-slate-400 px-2 py-0.5 rounded-full">
              {submissions.length}
            </span>
          )}
        </div>

        {submissions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#1A2840] py-8 text-center">
            <p className="text-sm text-slate-600 italic">
              Aucun fichier reçu pour l'instant.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-[#1A2840] rounded-xl border border-[#1A2840] overflow-hidden">
            {submissions.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#0A1020] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-base shrink-0">
                    {s.file_name.endsWith(".pdf") ? "📄" : s.file_name.match(/\.(png|jpg|jpeg|webp)$/i) ? "🖼️" : "📎"}
                  </span>
                  <a
                    href={s.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-300 hover:text-sky-400 transition-colors truncate"
                  >
                    {s.file_name}
                  </a>
                </div>
                <span className="text-xs text-slate-600 shrink-0 ml-4 tabular-nums">
                  {formatDate(s.created_at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import type { Project } from "@/types";

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let projects: Project[] = [];

  if (user) {
    const { data } = await supabase
      .from("projects")
      .select("*, tasks(*)")
      .eq("agency_id", user.id)
      .order("created_at", { ascending: false });

    projects = (data as Project[]) ?? [];
  }

  const totalTasks = projects.reduce((acc, p) => acc + (p.tasks?.length ?? 0), 0);
  const completedTasks = projects.reduce(
    (acc, p) => acc + (p.tasks?.filter((t) => t.completed).length ?? 0),
    0
  );
  const avgCompletion =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activeProjects = projects.filter((p) => {
    const tasks = p.tasks ?? [];
    return tasks.length > 0 && tasks.some((t) => !t.completed);
  }).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-slate-100"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Mes espaces clients
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {projects.length} espace{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-4 py-2 text-sm font-bold text-[#06090F] hover:bg-sky-300 transition-all hover:shadow-[0_0_16px_rgba(56,189,248,0.3)] shrink-0"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Nouveau client
        </Link>
      </div>

      {/* Stats */}
      {projects.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Espaces actifs", value: activeProjects, color: "text-sky-400" },
            { label: "Tâches complétées", value: `${completedTasks}/${totalTasks}`, color: "text-violet-400" },
            { label: "Taux de complétion", value: `${avgCompletion}%`, color: "text-emerald-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#1A2840] bg-[#0D1424] p-4"
            >
              <p className={`text-2xl font-bold mb-0.5 ${stat.color}`} style={{ fontFamily: "var(--font-syne)" }}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects grid */}
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#1A2840] p-16 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl border border-[#1A2840] bg-[#0D1424] flex items-center justify-center">
            <svg className="h-6 w-6 text-slate-500" viewBox="0 0 20 20" fill="none">
              <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-slate-400 mb-1">
            Aucun espace pour l'instant
          </p>
          <p className="text-xs text-slate-600 mb-5">
            Créez votre premier espace client pour démarrer.
          </p>
          <Link
            href="/dashboard/new"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-4 py-2 text-sm font-bold text-[#06090F] hover:bg-sky-300 transition-colors"
          >
            Créer un espace
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

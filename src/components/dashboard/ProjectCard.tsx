import Link from "next/link";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const total = project.tasks?.length ?? 0;
  const completed = project.tasks?.filter((t) => t.completed).length ?? 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = total > 0 && percent === 100;
  const isEmpty = total === 0;

  return (
    <Link
      href={`/dashboard/${project.id}`}
      className="group block rounded-2xl border border-[#1A2840] bg-[#0D1424] p-5 hover:border-[#2A3F60] transition-all duration-200 hover:shadow-[0_0_24px_rgba(56,189,248,0.06)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="h-9 w-9 rounded-xl bg-[#0A1020] border border-[#1A2840] flex items-center justify-center shrink-0 group-hover:border-sky-400/20 group-hover:bg-sky-400/5 transition-colors">
          <span
            className="text-xs font-bold text-slate-400 group-hover:text-sky-400 transition-colors"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {project.client_name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {isComplete ? (
          <span className="text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/20">
            Complété
          </span>
        ) : isEmpty ? (
          <span className="text-[10px] font-semibold bg-[#1A2840] text-slate-500 px-2 py-0.5 rounded-full">
            Vide
          </span>
        ) : (
          <span className="text-[10px] font-semibold bg-sky-400/10 text-sky-400 px-2 py-0.5 rounded-full border border-sky-400/20">
            En cours
          </span>
        )}
      </div>

      {/* Name */}
      <p
        className="font-semibold text-slate-100 mb-0.5 truncate"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {project.client_name}
      </p>
      {project.description ? (
        <p className="text-xs text-slate-500 mb-4 line-clamp-1">{project.description}</p>
      ) : (
        <p className="text-xs text-slate-600 mb-4 italic">Aucune description</p>
      )}

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-500">Progression</span>
          <span className={isComplete ? "text-emerald-400 font-medium" : "text-slate-400 tabular-nums"}>
            {isEmpty ? "—" : `${completed}/${total}`}
          </span>
        </div>
        <div className="h-1 bg-[#1A2840] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete ? "bg-emerald-400" : "bg-sky-400"
            }`}
            style={{
              width: isEmpty ? "0%" : `${percent}%`,
              boxShadow: !isEmpty && !isComplete ? "0 0 8px rgba(56,189,248,0.4)" : undefined,
            }}
          />
        </div>
      </div>
    </Link>
  );
}

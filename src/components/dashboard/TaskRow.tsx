"use client";

import { useTransition } from "react";
import { deleteTask } from "@/app/actions";
import type { Task } from "@/types";

export function TaskRow({ task, projectId }: { task: Task; projectId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <li className="group flex items-start gap-3 rounded-xl border border-[#1A2840] bg-[#0A1020] px-4 py-3 hover:border-[#2A3F60] transition-colors">
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          task.completed
            ? "border-sky-400 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
            : "border-[#2A3F60]"
        }`}
      >
        {task.completed && (
          <svg className="h-2.5 w-2.5 text-[#06090F]" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate transition-colors ${
            task.completed ? "line-through text-slate-600" : "text-slate-200"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
        )}
      </div>

      {task.completed && (
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded-full shrink-0 mt-0.5">
          Fait
        </span>
      )}

      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => deleteTask(task.id, projectId))}
        className="shrink-0 mt-0.5 text-slate-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-30 text-base leading-none"
        aria-label="Supprimer la tâche"
      >
        ×
      </button>
    </li>
  );
}

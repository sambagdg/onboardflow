"use client";

import { useState, useTransition } from "react";
import { toggleTask } from "@/app/actions";
import type { Task } from "@/types";

function TaskItem({
  task,
  onToggle,
  disabled,
}: {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onToggle(task.id, !task.completed)}
      className={`group w-full flex items-start gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 disabled:cursor-wait ${
        task.completed
          ? "border-[#1A2840]/60 bg-[#0A1020]"
          : "border-[#1A2840] bg-[#0D1424] hover:border-[#2A3F60] hover:shadow-[0_0_16px_rgba(56,189,248,0.05)]"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
          task.completed
            ? "border-sky-400 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
            : "border-[#2A3F60] group-hover:border-sky-400/40"
        }`}
      >
        {task.completed && (
          <svg className="h-3 w-3 text-[#06090F]" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium transition-colors ${
            task.completed
              ? "line-through text-slate-600"
              : "text-slate-200"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
        )}
      </div>

      {task.completed && (
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full shrink-0 mt-0.5">
          Fait
        </span>
      )}
    </button>
  );
}

export function ChecklistClient({
  initialTasks,
  projectId,
}: {
  initialTasks: Task[];
  projectId: string;
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [pending, startTransition] = useTransition();

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  function handleToggle(id: string, newCompleted: boolean) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
    );
    startTransition(async () => {
      try {
        await toggleTask(id, newCompleted, projectId);
      } catch {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, completed: !newCompleted } : t
          )
        );
      }
    });
  }

  if (total === 0) {
    return (
      <p className="text-sm text-slate-600 italic text-center py-8 rounded-xl border border-dashed border-[#1A2840]">
        Aucune tâche définie pour cet espace.
      </p>
    );
  }

  return (
    <div>
      {/* Progress summary */}
      <div className="rounded-xl border border-[#1A2840] bg-[#0D1424] p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">
            {completed === total ? "Tout est complété !" : `${total - completed} tâche${total - completed !== 1 ? "s" : ""} restante${total - completed !== 1 ? "s" : ""}`}
          </span>
          <span className="text-xs font-semibold text-sky-400">{percent}%</span>
        </div>
        <div className="h-1.5 bg-[#1A2840] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percent}%`,
              background: percent === 100
                ? "#34D399"
                : "linear-gradient(90deg, #38BDF8, #818CF8)",
              boxShadow: percent > 0 ? "0 0 8px rgba(56,189,248,0.4)" : undefined,
            }}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            disabled={pending}
          />
        ))}
      </div>
    </div>
  );
}

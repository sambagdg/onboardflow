"use client";

import { useTransition } from "react";
import { Trash2, Check } from "lucide-react";
import { deleteTask } from "@/app/actions";
import { cn } from "@/lib/utils";
import type { Task } from "@/types";

export function TaskRow({ task, projectId }: { task: Task; projectId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <li className="group flex items-start gap-3 rounded-lg border bg-card px-4 py-3 hover:bg-accent/30 transition-colors">
      <span
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors",
          task.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input"
        )}
      >
        {task.completed && <Check className="h-2.5 w-2.5" />}
      </span>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium truncate transition-colors",
            task.completed ? "line-through text-muted-foreground" : "text-foreground"
          )}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
        )}
      </div>

      {task.completed && (
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full shrink-0 mt-0.5">
          Fait
        </span>
      )}

      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => deleteTask(task.id, projectId))}
        className="shrink-0 mt-0.5 text-muted-foreground/40 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-30"
        aria-label="Supprimer la tâche"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </li>
  );
}

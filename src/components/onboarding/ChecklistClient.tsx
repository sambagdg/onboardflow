"use client";

import { useState, useTransition } from "react";
import { toggleTask } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
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
      className={cn(
        "group w-full flex items-start gap-3.5 rounded-lg border p-4 text-left transition-all duration-200 disabled:cursor-wait",
        task.completed
          ? "bg-accent/50 border-border/60"
          : "bg-card border-border hover:border-primary/40 hover:bg-accent/30"
      )}
    >
      <Checkbox
        checked={task.completed}
        tabIndex={-1}
        className="mt-0.5 pointer-events-none"
      />

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium transition-colors",
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

  const done = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  function handleToggle(id: string, newCompleted: boolean) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
    );
    startTransition(async () => {
      try {
        await toggleTask(id, newCompleted, projectId);
      } catch {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !newCompleted } : t))
        );
      }
    });
  }

  if (total === 0) {
    return (
      <div className="rounded-lg border border-dashed py-10 text-center">
        <p className="text-sm text-muted-foreground">Aucune tâche définie pour cet espace.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Progress summary */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">
            {done === total
              ? "Tout est complété !"
              : `${total - done} tâche${total - done !== 1 ? "s" : ""} restante${total - done !== 1 ? "s" : ""}`}
          </span>
          <span className="text-sm font-semibold text-primary tabular-nums">{percent}%</span>
        </div>
        <Progress value={percent} className="w-full" />
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

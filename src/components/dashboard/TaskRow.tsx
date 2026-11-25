"use client";

import { useState, useTransition } from "react";
import { Trash2, Check, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import { deleteTask, updateTask, moveTask } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatDueDate, isOverdue } from "@/lib/utils";
import type { Task } from "@/types";

export function TaskRow({
  task,
  projectId,
  isFirst,
  isLast,
}: {
  task: Task;
  projectId: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);

  async function handleSubmit(formData: FormData) {
    await updateTask(formData);
    setEditing(false);
  }

  if (editing) {
    return (
      <li className="rounded-lg border bg-card px-4 py-3">
        <form action={handleSubmit} className="flex flex-col gap-2">
          <input type="hidden" name="taskId" value={task.id} />
          <input type="hidden" name="projectId" value={projectId} />
          <Input
            name="title"
            defaultValue={task.title}
            required
            autoFocus
            aria-label="Titre"
          />
          <Input
            name="description"
            defaultValue={task.description ?? ""}
            placeholder="Instructions pour le client… (optionnel)"
            aria-label="Description"
          />
          <Input
            name="dueDate"
            type="date"
            defaultValue={task.due_date ?? ""}
            aria-label="Date limite"
            className="w-fit"
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm">
              Enregistrer
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditing(false)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="group flex items-start gap-3 rounded-lg border bg-card px-4 py-3 hover:bg-accent/30 transition-colors">
      <span
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors",
          task.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input",
        )}
      >
        {task.completed && <Check className="h-2.5 w-2.5" />}
      </span>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium truncate transition-colors",
            task.completed
              ? "line-through text-muted-foreground"
              : "text-foreground",
          )}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {task.description}
          </p>
        )}
      </div>

      {task.due_date && (
        <span
          className={cn(
            "text-[10px] font-medium px-1.5 py-0.5 rounded-full border shrink-0 mt-0.5 tabular-nums",
            isOverdue(task.due_date, task.completed)
              ? "text-destructive bg-destructive/10 border-destructive/20"
              : "text-muted-foreground border-border"
          )}
        >
          {isOverdue(task.due_date, task.completed) ? "En retard · " : ""}
          {formatDueDate(task.due_date)}
        </span>
      )}

      {task.completed && (
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full shrink-0 mt-0.5">
          Fait
        </span>
      )}

      <div className="flex flex-col -my-1 shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <button
          type="button"
          disabled={isFirst || pending}
          onClick={() => startTransition(() => moveTask(projectId, task.id, "up"))}
          className="text-muted-foreground/60 hover:text-foreground disabled:opacity-20"
          aria-label="Monter la tâche"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={isLast || pending}
          onClick={() => startTransition(() => moveTask(projectId, task.id, "down"))}
          className="text-muted-foreground/60 hover:text-foreground disabled:opacity-20"
          aria-label="Descendre la tâche"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setEditing(true)}
        className="shrink-0 mt-0.5 text-muted-foreground/40 hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Modifier la tâche"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => deleteTask(task.id, projectId))}
        className="shrink-0 mt-0.5 text-muted-foreground/40 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-30"
        aria-label="Supprimer la tâche"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </li>
  );
}

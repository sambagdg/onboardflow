"use client";

import type { Task } from "@/types";

interface ChecklistItemProps {
  task: Task;
  onToggle?: (id: string, completed: boolean) => void;
}

export function ChecklistItem({ task, onToggle }: ChecklistItemProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
        task.completed
          ? "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <button
        onClick={() => onToggle?.(task.id, !task.completed)}
        className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${
          task.completed
            ? "border-zinc-900 bg-zinc-900 dark:border-zinc-50 dark:bg-zinc-50"
            : "border-zinc-300 dark:border-zinc-600"
        }`}
        aria-label={task.completed ? "Marquer incomplet" : "Marquer complet"}
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            task.completed
              ? "line-through text-zinc-400"
              : "text-zinc-900 dark:text-zinc-50"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-zinc-500 mt-0.5">{task.description}</p>
        )}
      </div>
    </div>
  );
}

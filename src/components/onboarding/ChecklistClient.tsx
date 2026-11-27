"use client";

import { useRef, useState, useTransition } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, Paperclip, Loader2, FileText } from "lucide-react";
import { toggleTaskByToken } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn, formatDueDate, isOverdue } from "@/lib/utils";
import { uploadFile } from "@/lib/upload-client";
import type { Submission, Task } from "@/types";

gsap.registerPlugin(useGSAP);

function TaskItem({
  task,
  files,
  onToggle,
  onAttach,
  disabled,
  uploading,
}: {
  task: Task;
  files: Submission[];
  onToggle: (id: string, completed: boolean) => void;
  onAttach: (taskId: string, file: File) => void;
  disabled: boolean;
  uploading: boolean;
}) {
  // Case + titre, partagés par les deux types (seul le conteneur change)
  const header = (
    <>
      <Checkbox checked={task.completed} tabIndex={-1} className="mt-0.5 pointer-events-none" />
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
    </>
  );

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        task.completed
          ? "bg-accent/50 border-border/60"
          : "bg-card border-border hover:border-primary/40"
      )}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Action : le client coche. Document : la tâche se valide en joignant un fichier */}
        {task.kind === "action" ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onToggle(task.id, !task.completed)}
            className="flex flex-1 min-w-0 items-start gap-3.5 text-left disabled:cursor-wait"
          >
            {header}
          </button>
        ) : (
          <div className="flex flex-1 min-w-0 items-start gap-3.5">{header}</div>
        )}

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

        {/* Joindre : un <label> qui ouvre l'<input type="file"> (pas un bouton dans un bouton) */}
        {task.kind === "document" && (
          <label
            title="Joindre un fichier"
            className={cn(
              "shrink-0 mt-0.5 rounded text-muted-foreground hover:text-primary focus-within:text-primary focus-within:ring-2 focus-within:ring-ring transition-colors",
              uploading ? "cursor-wait" : "cursor-pointer"
            )}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
            <input
              type="file"
              className="sr-only"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.zip"
              disabled={uploading}
              aria-label={`Joindre un fichier à « ${task.title} »`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onAttach(task.id, file);
                e.target.value = "";
              }}
            />
          </label>
        )}
      </div>

      {files.length > 0 && (
        <ul className="border-t px-4 py-2 flex flex-col gap-1">
          {files.map((s) => (
            <li key={s.id}>
              <a
                href={s.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{s.file_name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ChecklistClient({
  initialTasks,
  initialSubmissions,
  token,
}: {
  initialTasks: Task[];
  initialSubmissions: Submission[];
  token: string;
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [files, setFiles] = useState<Submission[]>(initialSubmissions);
  const [uploadingTaskId, setUploadingTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const done = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = total > 0 && done === total;

  // Célébration discrète au moment où le client termine (pas si c'était déjà fini au chargement)
  const root = useRef<HTMLDivElement>(null);
  const wasDone = useRef(allDone);
  useGSAP(
    () => {
      if (!allDone) {
        wasDone.current = false;
        return;
      }
      if (wasDone.current) return;
      wasDone.current = true;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline()
          .from("[data-done-banner]", { autoAlpha: 0, y: 12, scale: 0.98, duration: 0.7, ease: "expo.out" })
          .from("[data-done-icon]", { scale: 0, rotate: -20, duration: 0.6, ease: "back.out(1.7)" }, "-=0.45");
      });
    },
    { dependencies: [allDone], scope: root }
  );

  function handleToggle(id: string, newCompleted: boolean) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
    );
    startTransition(async () => {
      try {
        await toggleTaskByToken(token, id, newCompleted);
      } catch {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !newCompleted } : t))
        );
      }
    });
  }

  async function handleAttach(taskId: string, file: File) {
    setUploadingTaskId(taskId);
    setError(null);
    const result = await uploadFile(token, file, taskId);
    if ("error" in result) {
      setError(result.error);
    } else {
      setFiles((prev) => [result.submission, ...prev]);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t)));
    }
    setUploadingTaskId(null);
  }

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-10 text-center">
        <p className="text-sm text-muted-foreground">Aucune tâche définie pour cet espace.</p>
      </div>
    );
  }

  return (
    <div ref={root} className="flex flex-col gap-4">
      {/* Progression : seule source de vérité côté client, elle suit chaque coche et chaque fichier */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">
            {allDone
              ? "Tout est complété"
              : `${total - done} tâche${total - done !== 1 ? "s" : ""} restante${total - done !== 1 ? "s" : ""}`}
          </span>
          <span className="text-2xl font-semibold tabular-nums tracking-[-0.03em]">{percent}%</span>
        </div>
        <Progress value={percent} className="h-2 w-full" />
      </div>

      {/* role="status" : la fin est aussi annoncée aux lecteurs d'écran */}
      <div role="status">
        {allDone && (
          <div
            data-done-banner
            className="flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
          >
            <div
              data-done-icon
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <Check className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-semibold text-emerald-700 dark:text-emerald-400">Tout est complété, merci !</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Votre agence va maintenant traiter votre dossier.
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Task list */}
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            files={files.filter((f) => f.task_id === task.id)}
            onToggle={handleToggle}
            onAttach={handleAttach}
            disabled={pending}
            uploading={uploadingTaskId === task.id}
          />
        ))}
      </div>
    </div>
  );
}

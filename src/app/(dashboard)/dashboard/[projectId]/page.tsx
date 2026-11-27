import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, PartyPopper } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { AddTaskForm } from "@/components/dashboard/AddTaskForm";
import { TaskRow } from "@/components/dashboard/TaskRow";
import { CopyLinkButton } from "@/components/dashboard/CopyLinkButton";
import { EditProjectDialog } from "@/components/dashboard/EditProjectDialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";
import { getAppUrl } from "@/lib/app-url";
import { withSignedUrls } from "@/lib/storage";
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
  const tasks = (project.tasks ?? []).sort((a, b) => a.position - b.position || a.created_at.localeCompare(b.created_at));
  const taskTitles = new Map(tasks.map((t) => [t.id, t.title]));
  const submissions = await withSignedUrls(project.submissions ?? []);
  const completed = tasks.filter((t) => t.completed).length;
  const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
  const isComplete = tasks.length > 0 && percent === 100;

  const clientUrl = `${await getAppUrl()}/onboarding/${project.share_token}`;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <div>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 mb-8 gap-1.5 rounded-full")}
        >
          <ArrowLeft className="h-4 w-4" />
          Tous les clients
        </Link>

        {/* En-tête */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-muted/50">
              <span className="text-sm font-semibold text-primary">
                {project.client_name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-3xl font-semibold tracking-[-0.03em]">{project.client_name}</h1>
              {project.description && (
                <p className="mt-0.5 text-[15px] text-muted-foreground">{project.description}</p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <EditProjectDialog
              id={project.id}
              clientName={project.client_name}
              description={project.description}
            />
            <CopyLinkButton url={clientUrl} />
          </div>
        </div>
      </div>

      {/* Progression */}
      <section className="rounded-2xl border p-6">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium text-muted-foreground">Progression du client</h2>
          <p className="text-sm tabular-nums text-muted-foreground">
            <span className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{percent}%</span>
            <span className="ml-2">
              {completed}/{tasks.length} tâche{tasks.length !== 1 ? "s" : ""}
            </span>
          </p>
        </div>
        <Progress value={percent} className="h-2 w-full" />
        {isComplete && (
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <PartyPopper className="h-4 w-4" />
            Le client a complété toutes les tâches.
          </p>
        )}
      </section>

      {/* Checklist */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Checklist</h2>
        <div className="flex flex-col gap-4">
          {tasks.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {tasks.map((task, i) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  projectId={projectId}
                  isFirst={i === 0}
                  isLast={i === tasks.length - 1}
                />
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed px-6 py-8 text-center text-[15px] text-muted-foreground">
              Aucune tâche. Ajoutez ce que votre client doit faire ou fournir.
            </p>
          )}
          <AddTaskForm projectId={projectId} />
        </div>
      </section>

      {/* Documents */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight">Documents reçus</h2>
          {submissions.length > 0 && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
              {submissions.length}
            </span>
          )}
        </div>

        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-dashed py-12 text-center">
            <FileText className="mx-auto mb-3 h-7 w-7 text-muted-foreground/40" strokeWidth={1.5} />
            <p className="text-[15px] text-muted-foreground">Aucun fichier reçu pour l&apos;instant.</p>
          </div>
        ) : (
          <ul className="divide-y overflow-hidden rounded-2xl border">
            {submissions.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-muted/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
                  <a
                    href={s.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm transition-colors hover:text-primary"
                  >
                    {s.file_name}
                  </a>
                  {s.task_id && taskTitles.has(s.task_id) && (
                    <Badge variant="secondary" className="max-w-40 shrink-0 truncate rounded-full font-normal">
                      {taskTitles.get(s.task_id)}
                    </Badge>
                  )}
                </div>
                <span className="ml-4 shrink-0 text-xs tabular-nums text-muted-foreground">
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

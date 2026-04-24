import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, PartyPopper } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { AddTaskForm } from "@/components/dashboard/AddTaskForm";
import { TaskRow } from "@/components/dashboard/TaskRow";
import { CopyLinkButton } from "@/components/dashboard/CopyLinkButton";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";
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
  const tasks = (project.tasks ?? []).sort((a, b) => a.position - b.position);
  const submissions = project.submissions ?? [];
  const completed = tasks.filter((t) => t.completed).length;
  const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
  const isComplete = tasks.length > 0 && percent === 100;

  const clientUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/onboarding/${project.slug}`;

  return (
    <div className="flex flex-col gap-6">

      {/* Back */}
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 self-start -ml-2")}
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les clients
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-sm font-bold text-primary">
              {project.client_name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{project.client_name}</h1>
            {project.description && (
              <p className="text-sm text-muted-foreground mt-0.5">{project.description}</p>
            )}
          </div>
        </div>
        <CopyLinkButton url={clientUrl} />
      </div>

      {/* Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Progression client
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground tabular-nums">
              {completed} / {tasks.length}
            </span>
            {tasks.length > 0 && (
              isComplete ? (
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                  Complété
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {percent}%
                </Badge>
              )
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Progress value={percent} className="w-full" />
          {isComplete && (
            <p className="mt-3 text-sm text-center font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
              <PartyPopper className="h-4 w-4" />
              Le client a complété toutes les tâches !
            </p>
          )}
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Checklist</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {tasks.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} projectId={projectId} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Aucune tâche. Ajoutez les éléments que votre client doit fournir.
            </p>
          )}
          <AddTaskForm projectId={projectId} />
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-3">
          <CardTitle className="text-base">Documents reçus</CardTitle>
          {submissions.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {submissions.length}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="rounded-lg border border-dashed py-10 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Aucun fichier reçu pour l'instant.</p>
            </div>
          ) : (
            <ul className="flex flex-col divide-y rounded-lg border overflow-hidden">
              {submissions.map((s) => (
                <li key={s.id} className="flex items-center justify-between px-4 py-3 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <a
                      href={s.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-primary transition-colors truncate"
                    >
                      {s.file_name}
                    </a>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-4 tabular-nums">
                    {formatDate(s.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

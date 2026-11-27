import Link from "next/link";
import { Users } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { NewProjectDialog } from "@/components/dashboard/NewProjectDialog";
import { ProjectActions } from "@/components/dashboard/ProjectActions";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatDate } from "@/lib/utils";
import { getAppUrl } from "@/lib/app-url";
import type { Project } from "@/types";

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let projects: Project[] = [];
  if (user) {
    const { data } = await supabase
      .from("projects")
      .select("*, tasks(*), submissions(*)")
      .eq("agency_id", user.id)
      .order("created_at", { ascending: false });
    projects = (data as Project[]) ?? [];
  }

  /* Calcul des stats */
  const totalTasks = projects.reduce((acc, p) => acc + (p.tasks?.length ?? 0), 0);
  const completedTasks = projects.reduce(
    (acc, p) => acc + (p.tasks?.filter((t) => t.completed).length ?? 0),
    0,
  );
  const avgCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalDocs = projects.reduce((acc, p) => acc + (p.submissions?.length ?? 0), 0);
  const activeCount = projects.filter((p) => {
    const tasks = p.tasks ?? [];
    return tasks.length > 0 && tasks.some((t) => !t.completed);
  }).length;

  const stats = [
    { label: "Clients en cours", value: String(activeCount), hint: "onboarding non terminé" },
    { label: "Taux de complétion", value: `${avgCompletion}%`, hint: "sur toutes les tâches" },
    { label: "Documents reçus", value: String(totalDocs), hint: "fichiers collectés" },
  ];

  const appUrl = await getAppUrl();

  return (
    <div className="flex flex-col gap-10">
      {/* En-tête */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">Vos clients</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">
            {projects.length} espace{projects.length !== 1 ? "s" : ""} d&apos;onboarding
          </p>
        </div>
        <NewProjectDialog />
      </div>

      {projects.length === 0 ? (
        /* État vide */
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed px-6 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted/50">
            <Users className="h-6 w-6 text-primary" strokeWidth={1.75} />
          </div>
          <div>
            <p className="mb-1 text-lg font-semibold tracking-tight">Aucun client pour l&apos;instant</p>
            <p className="text-balance text-[15px] text-muted-foreground">
              Créez votre premier espace : une checklist, un lien, et votre client s&apos;occupe du reste.
            </p>
          </div>
          <NewProjectDialog />
        </div>
      ) : (
        <>
          {/* Stats : une seule bande, séparée par des filets */}
          <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-6">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="mt-2 text-3xl font-semibold tabular-nums tracking-[-0.03em]">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
              </div>
            ))}
          </div>

          {/* Table des clients */}
          <div className="overflow-hidden rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="pl-5">Client</TableHead>
                  <TableHead className="hidden sm:table-cell">Statut</TableHead>
                  <TableHead className="hidden w-48 md:table-cell">Progression</TableHead>
                  <TableHead className="hidden lg:table-cell">Créé le</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => {
                  const tasks = project.tasks ?? [];
                  const done = tasks.filter((t) => t.completed).length;
                  const total = tasks.length;
                  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                  const isComplete = total > 0 && pct === 100;
                  const isEmpty = total === 0;
                  const clientUrl = `${appUrl}/onboarding/${project.share_token}`;

                  return (
                    <TableRow key={project.id} className="group">
                      {/* Nom — cliquable vers le détail */}
                      <TableCell className="py-4 pl-5">
                        <Link
                          href={`/dashboard/${project.id}`}
                          className="font-medium transition-colors hover:text-primary"
                        >
                          {project.client_name}
                        </Link>
                        {project.description && (
                          <p className="mt-0.5 max-w-60 truncate text-xs text-muted-foreground">
                            {project.description}
                          </p>
                        )}
                      </TableCell>

                      {/* Statut */}
                      <TableCell className="hidden sm:table-cell">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                            isEmpty && "bg-muted text-muted-foreground",
                            isComplete && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                            !isEmpty && !isComplete && "bg-primary/10 text-primary"
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isEmpty ? "bg-muted-foreground/50" : isComplete ? "bg-emerald-500" : "bg-primary"
                            )}
                          />
                          {isEmpty ? "Vide" : isComplete ? "Complété" : "En cours"}
                        </span>
                      </TableCell>

                      {/* Progression */}
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-3">
                          <Progress value={pct} className="h-1.5 flex-1" />
                          <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">
                            {total > 0 ? `${done}/${total}` : "—"}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                        {formatDate(project.created_at)}
                      </TableCell>

                      <TableCell>
                        <ProjectActions projectId={project.id} clientUrl={clientUrl} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}

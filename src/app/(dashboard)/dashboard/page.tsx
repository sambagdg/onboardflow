import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { NewProjectDialog } from "@/components/dashboard/NewProjectDialog";
import { ProjectActions } from "@/components/dashboard/ProjectActions";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Users, TrendingUp, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

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
  const completedTasks = projects.reduce((acc, p) => acc + (p.tasks?.filter((t) => t.completed).length ?? 0), 0);
  const avgCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalDocs = projects.reduce((acc, p) => acc + (p.submissions?.length ?? 0), 0);
  const activeCount = projects.filter((p) => {
    const tasks = p.tasks ?? [];
    return tasks.length > 0 && tasks.some((t) => !t.completed);
  }).length;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <div className="flex flex-col gap-8">

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mes clients</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {projects.length} espace{projects.length !== 1 ? "s" : ""} d&apos;onboarding
          </p>
        </div>
        <NewProjectDialog />
      </div>

      {/* Stats — affichées seulement s'il y a des projets */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clients actifs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{activeCount}</p>
              <p className="text-xs text-muted-foreground mt-0.5">en cours d&apos;onboarding</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Taux de complétion
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{avgCompletion}%</p>
              <p className="text-xs text-muted-foreground mt-0.5">moyenne sur tous les clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Documents reçus
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{totalDocs}</p>
              <p className="text-xs text-muted-foreground mt-0.5">fichiers collectés</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Table des clients */}
      {projects.length === 0 ? (
        /* État vide */
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold mb-1">Aucun client pour l&apos;instant</p>
              <p className="text-sm text-muted-foreground">
                Créez votre premier espace d&apos;onboarding pour démarrer.
              </p>
            </div>
            <NewProjectDialog />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                <TableHead className="hidden md:table-cell w-40">Progression</TableHead>
                <TableHead className="hidden lg:table-cell">Créé le</TableHead>
                <TableHead className="w-10" />
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
                const clientUrl = `${appUrl}/onboarding/${project.slug}`;

                return (
                  <TableRow key={project.id} className="group">
                    {/* Nom — cliquable vers le détail */}
                    <TableCell>
                      <Link
                        href={`/dashboard/${project.id}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {project.client_name}
                      </Link>
                      {project.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-[220px] mt-0.5">
                          {project.description}
                        </p>
                      )}
                    </TableCell>

                    {/* Badge statut */}
                    <TableCell className="hidden sm:table-cell">
                      {isEmpty ? (
                        <Badge variant="secondary">Vide</Badge>
                      ) : isComplete ? (
                        <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
                          Complété
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                          En cours
                        </Badge>
                      )}
                    </TableCell>

                    {/* Barre de progression */}
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">
                          {total > 0 ? `${done}/${total}` : "—"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {formatDate(project.created_at)}
                    </TableCell>

                    {/* Actions DropdownMenu */}
                    <TableCell>
                      <ProjectActions projectId={project.id} clientUrl={clientUrl} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

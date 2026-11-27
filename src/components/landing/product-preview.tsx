import { Check, Copy, FileText, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

/* Maquettes statiques de l'app, rendues côté serveur.
   L'état affiché est l'état FINAL : sans JS (ou avec moins d'animations), l'aperçu reste juste.
   Les attributs data-* servent de cibles aux animations GSAP. */

const previewTasks = [
  { title: "Contrat de prestation signé", kind: "action", done: true },
  { title: "RIB de l'entreprise", kind: "document", done: true, file: "rib-acme.pdf" },
  { title: "Pièce d'identité du gérant", kind: "document", done: true, file: "passeport.pdf" },
  { title: "Justificatif de domicile", kind: "document", done: false, due: "En retard · 12 nov.", late: true },
  { title: "Logo en SVG", kind: "document", done: false, due: "28 nov." },
] as const;

function Window({ url, children, className }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-card text-left shadow-xl shadow-black/5 dark:shadow-black/40", className)}>
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="ml-2 min-w-0 truncate font-mono text-[11px] text-muted-foreground">{url}</span>
      </div>
      {children}
    </div>
  );
}

/* Page client d'onboarding (hero) */
export function ProductPreview() {
  return (
    <Window url="onboardflow.app/onboarding/3f9c1e2a-…">
      <div className="p-5 sm:p-6">
        <div className="mb-1 flex items-center justify-between gap-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Espace d&apos;onboarding</p>
          <p className="text-xs tabular-nums text-muted-foreground">
            <span data-count>3</span>/5 tâches
          </p>
        </div>
        <p className="mb-4 text-lg font-semibold tracking-tight">Acme Studio</p>

        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div data-progress-bar className="h-full w-3/5 origin-left rounded-full bg-primary" />
        </div>

        <ul className="flex flex-col gap-2">
          {previewTasks.map((t) => (
            <li
              key={t.title}
              data-task
              className={cn(
                "rounded-xl border px-3.5 py-2.5",
                t.done ? "border-border/60 bg-accent/40" : "bg-card"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border",
                    t.done ? "border-primary bg-primary" : "border-foreground/20"
                  )}
                >
                  {t.done && <Check data-check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
                </span>
                <span className={cn("min-w-0 flex-1 truncate text-sm", t.done && "text-muted-foreground line-through")}>
                  {t.title}
                </span>
                {"due" in t && t.due && (
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium tabular-nums",
                      "late" in t && t.late
                        ? "border-destructive/20 bg-destructive/10 text-destructive"
                        : "text-muted-foreground"
                    )}
                  >
                    {t.due}
                  </span>
                )}
                {t.kind === "document" && !t.done && <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
              </div>
              {"file" in t && t.file && (
                <p data-file className="mt-1.5 flex items-center gap-1.5 pl-7 text-xs text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  {t.file}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

/* Étape 1 : l'agence crée l'espace et sa checklist */
export function CreateSpaceMock() {
  return (
    <Window url="onboardflow.app/dashboard/nouveau">
      <div className="flex flex-col gap-4 p-6">
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Nom du client</p>
          <div className="rounded-lg border px-3 py-2 text-sm">Acme Studio</div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Checklist</p>
          <ul className="flex flex-col gap-2">
            {[
              ["Contrat de prestation signé", "Action"],
              ["RIB de l'entreprise", "Document"],
              ["Pièce d'identité du gérant", "Document"],
              ["Logo en SVG", "Document · 28 nov."],
            ].map(([title, meta]) => (
              <li key={title} className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm">
                <span className="min-w-0 truncate">{title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{meta}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="self-end rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground">
          Créer l&apos;espace
        </div>
      </div>
    </Window>
  );
}

/* Étape 2 : le lien unique à partager */
export function ShareLinkMock() {
  return (
    <Window url="onboardflow.app/dashboard/acme-studio">
      <div className="flex flex-col gap-5 p-6">
        <div>
          <p className="text-lg font-semibold tracking-tight">Acme Studio</p>
          <p className="text-sm text-muted-foreground">4 tâches · créé à l&apos;instant</p>
        </div>
        <div className="rounded-xl border bg-muted/40 p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Lien client</p>
          <div className="flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded-lg border bg-background px-3 py-2 font-mono text-xs">
              onboardflow.app/onboarding/3f9c1e2a-7b41-4d0e-9a6c-52e1f0b8c3d7
            </code>
            <span className="flex shrink-0 items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs font-medium">
              <Copy className="h-3.5 w-3.5" />
              Copié
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Votre client l&apos;ouvre directement : aucun compte à créer, aucun mot de passe à retenir.
        </p>
      </div>
    </Window>
  );
}

/* Étape 3 : le suivi côté agence */
export function DashboardMock() {
  const clients = [
    { name: "Nova Conseil", pct: 100, note: "Complété" },
    { name: "Acme Studio", pct: 60, note: "3/5" },
    { name: "Atelier Brun", pct: 20, note: "En retard", late: true },
  ];
  return (
    <Window url="onboardflow.app/dashboard">
      <div className="flex flex-col gap-1 p-6">
        <p className="mb-3 text-lg font-semibold tracking-tight">Vos clients</p>
        {clients.map((c) => (
          <div key={c.name} className="flex items-center gap-4 border-t py-3 first-of-type:border-t-0">
            <span className="w-28 shrink-0 truncate text-sm font-medium">{c.name}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full", c.pct === 100 ? "bg-emerald-500" : "bg-primary")}
                style={{ width: `${c.pct}%` }}
              />
            </div>
            <span
              className={cn(
                "w-20 shrink-0 text-right text-xs tabular-nums",
                c.late ? "text-destructive" : c.pct === 100 ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
              )}
            >
              {c.note}
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}

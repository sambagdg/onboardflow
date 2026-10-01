import Link from "next/link";
import { ArrowRight, Check, Link2, LayoutDashboard, UploadCloud } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Link2,
    title: "Un lien unique par client",
    description:
      "Générez un espace d'onboarding dédié en quelques secondes. Votre client y accède d'un clic, sans créer de compte.",
  },
  {
    icon: LayoutDashboard,
    title: "Suivi en temps réel",
    description:
      "Visualisez la progression de chaque client depuis votre dashboard : tâches cochées, documents reçus, statut global.",
  },
  {
    icon: UploadCloud,
    title: "Collecte de documents centralisée",
    description:
      "Vos clients déposent leurs fichiers directement dans leur espace. Tout est centralisé et accessible à tout moment.",
  },
];

const steps = [
  {
    number: "01",
    title: "Créez l'espace",
    description:
      "Définissez la checklist de documents à fournir et les étapes d'onboarding spécifiques à ce client.",
  },
  {
    number: "02",
    title: "Envoyez le lien",
    description:
      "Copiez et partagez le lien unique avec votre client par email ou tout autre canal.",
  },
  {
    number: "03",
    title: "Suivez la progression",
    description:
      "Votre client remplit la checklist et dépose ses documents. Vous voyez tout avancer en temps réel.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "19€",
    description: "Pour démarrer et tester le concept.",
    popular: false,
    features: ["5 espaces actifs", "Checklist illimitée", "Stockage 1 Go", "Support email"],
    cta: "Commencer",
    href: "/register",
  },
  {
    name: "Pro",
    price: "49€",
    description: "Pour les agences en croissance.",
    popular: true,
    features: [
      "Espaces illimités",
      "Checklist illimitée",
      "Stockage 20 Go",
      "Notifications email",
      "Support prioritaire",
    ],
    cta: "Essayer 14 jours gratuits",
    href: "/register",
  },
  {
    name: "Agence",
    price: "99€",
    description: "Pour les équipes et grandes agences.",
    popular: false,
    features: [
      "Tout du plan Pro",
      "Multi-utilisateurs",
      "Stockage 100 Go",
      "White-label",
      "Account manager dédié",
    ],
    cta: "Nous contacter",
    href: "/register",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────
            Fond avec gradient radial bleu subtil + dot grid */}
        <section className="relative overflow-hidden">
          {/* Gradient de fond */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.546 0.245 262.881 / 0.12), transparent)",
            }}
          />
          {/* Grille de points décorative */}
          <div
            className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="mx-auto max-w-5xl px-4 py-28 text-center">
            <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1 text-xs font-medium">
              ✦ Suivi en temps réel disponible
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 leading-[1.05]">
              L&apos;onboarding client{" "}
              <span className="text-primary">sans friction</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
              Créez un espace dédié par client, envoyez un lien, collectez documents
              et validations en temps réel.{" "}
              <strong className="text-foreground font-medium">Fini les allers-retours par email.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "gap-2 px-6")}>
                Essayer gratuitement
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-6")}
              >
                Voir comment ça marche
              </a>
            </div>

            {/* Preuve sociale */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-1.5">
                {["bg-blue-400", "bg-indigo-400", "bg-violet-400", "bg-sky-400"].map((c, i) => (
                  <div
                    key={i}
                    className={`h-6 w-6 rounded-full border-2 border-background ${c}`}
                  />
                ))}
              </div>
              <span>
                Déjà utilisé par{" "}
                <span className="font-semibold text-foreground">200+ agences</span>
              </span>
            </div>

            {/* Mini-mockup de l'app */}
            <div className="mt-16 mx-auto max-w-lg">
              <div className="rounded-xl border bg-card shadow-2xl overflow-hidden text-left">
                {/* Barre de titre de fenêtre */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/40">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-[10px] text-muted-foreground font-mono">
                    onboardflow.app/onboarding/acme-corp
                  </span>
                </div>
                <div className="p-5">
                  {/* En-tête client */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-sm">Acme Corp</p>
                      <p className="text-xs text-muted-foreground">Onboarding en cours</p>
                    </div>
                    <Badge className="text-[10px]">3 / 5</Badge>
                  </div>
                  {/* Barre de progression */}
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden mb-4">
                    <div className="h-full w-3/5 rounded-full bg-primary" />
                  </div>
                  {/* Tâches */}
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Contrat de prestation signé", done: true },
                      { label: "RIB bancaire (PDF)", done: true },
                      { label: "Pièce d'identité recto-verso", done: true },
                      { label: "Justificatif de domicile", done: false },
                      { label: "Photo de profil", done: false },
                    ].map((t) => (
                      <div
                        key={t.label}
                        className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-xs border ${
                          t.done
                            ? "bg-primary/5 border-primary/15 text-muted-foreground"
                            : "bg-muted/30 border-border"
                        }`}
                      >
                        <div
                          className={`h-3.5 w-3.5 shrink-0 rounded-full flex items-center justify-center ${
                            t.done ? "bg-primary" : "border-2 border-muted-foreground/30"
                          }`}
                        >
                          {t.done && <Check className="h-2 w-2 text-primary-foreground stroke-[3]" />}
                        </div>
                        <span className={t.done ? "line-through" : ""}>{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Stats ─────────────────────────────────────────────── */}
        <section className="bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "−80%", label: "d'allers-retours par email" },
              { value: "3×", label: "plus rapide à onboarder" },
              { value: "98%", label: "de satisfaction client" },
            ].map((s) => (
              <div key={s.value}>
                <p className="text-4xl font-bold text-primary mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Comment ça marche ────────────────────────────────── */}
        <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Comment ça marche
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Opérationnel en 3 minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col gap-3 relative">
                {/* Ligne de connexion entre étapes (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-px bg-border -translate-x-1/2 translate-x-4" />
                )}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-bold text-sm text-primary">
                  {step.number}
                </div>
                <h3 className="font-semibold text-base">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Fonctionnalités ──────────────────────────────────── */}
        <section id="features" className="bg-muted/20">
          <div className="mx-auto max-w-5xl px-4 py-20">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Fonctionnalités
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Tout ce dont vous avez besoin
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border-border/60 hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Tarifs ───────────────────────────────────────────── */}
        <section id="pricing" className="mx-auto max-w-5xl px-4 py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Tarifs
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Simple et transparent
            </h2>
            <p className="text-muted-foreground">
              Sans engagement. Changez de plan à tout moment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  plan.popular
                    ? "ring-2 ring-primary border-primary/40 shadow-lg shadow-primary/10"
                    : "border-border/60"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-base">{plan.name}</CardTitle>
                    {plan.popular && <Badge className="text-[10px] px-2">Populaire</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/mois</span>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-sm">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-2.5 w-2.5 text-primary stroke-[2.5]" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={cn(
                      buttonVariants({ variant: plan.popular ? "default" : "outline" }),
                      "w-full justify-center mt-2"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── CTA final ────────────────────────────────────────── */}
        <section className="border-t">
          <div className="relative overflow-hidden">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 50% 100%, oklch(0.546 0.245 262.881 / 0.08), transparent)",
              }}
            />
            <div className="mx-auto max-w-5xl px-4 py-24 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Prêt à transformer votre onboarding ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Rejoignez 200+ agences qui ont dit adieu aux emails d&apos;onboarding.
                Gratuit pour commencer, sans carte bancaire requise.
              </p>
              <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "gap-2 px-8")}>
                Commencer gratuitement
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-sm">OnboardFlow</span>
          <p className="text-xs text-muted-foreground">© 2026 OnboardFlow. Tous droits réservés.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Confidentialité</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">CGU</a>
            <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Connexion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

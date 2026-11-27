import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  FileCheck2,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  ListOrdered,
  Lock,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

/* Uniquement des fonctionnalités réellement disponibles dans l'app */
const features = [
  {
    icon: ListChecks,
    title: "Actions et documents",
    description:
      "Chaque tâche est soit une action que le client coche, soit un document qu'il joint. Pas d'ambiguïté sur ce qui est attendu.",
  },
  {
    icon: FileCheck2,
    title: "Fichiers au bon endroit",
    description:
      "Le client joint son fichier directement à la tâche concernée, qui se valide toute seule. Vous savez ce que chaque PDF représente.",
  },
  {
    icon: CalendarClock,
    title: "Dates limites",
    description:
      "Fixez une échéance par tâche. Les retards ressortent en rouge, chez vous comme chez votre client.",
  },
  {
    icon: LayoutDashboard,
    title: "Tout suivre d'un coup d'œil",
    description:
      "Progression de chaque client, documents reçus et tâches restantes, réunis dans un seul tableau de bord.",
  },
  {
    icon: ListOrdered,
    title: "Une checklist qui évolue",
    description:
      "Ajoutez, modifiez, réordonnez les tâches à tout moment. Le client voit toujours la version à jour.",
  },
  {
    icon: KeyRound,
    title: "Zéro compte côté client",
    description:
      "Votre client n'a ni inscription ni mot de passe : le lien unique suffit. Moins de friction, plus de réponses.",
  },
];

const security = [
  {
    icon: KeyRound,
    title: "Liens impossibles à deviner",
    description: "Chaque espace s'ouvre avec un jeton aléatoire de 122 bits, pas avec le nom du client.",
  },
  {
    icon: Lock,
    title: "Stockage privé",
    description: "Les documents ne sont jamais publics : chaque ouverture passe par une URL signée qui expire après 1 heure.",
  },
  {
    icon: ShieldCheck,
    title: "Données cloisonnées",
    description: "Des règles au niveau de la base (Row Level Security) garantissent qu'une agence ne voit que ses propres clients.",
  },
  {
    icon: Timer,
    title: "Vérifié côté serveur",
    description: "Type de fichier, taille, appartenance de chaque tâche : rien de ce qu'envoie le navigateur n'est pris pour acquis.",
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

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div data-reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl text-balance">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Hero />

        <HowItWorks />

        {/* ── Fonctionnalités ─────────────────────────────────── */}
        <section id="features" className="scroll-mt-14 border-t bg-muted/30">
          <Reveal className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <SectionHeading
              eyebrow="Fonctionnalités"
              title="Ce dont une agence a vraiment besoin."
              subtitle="Pas de modules superflus : chaque fonction répond à un aller-retour par email que vous n'aurez plus à faire."
            />
            <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} data-reveal className="bg-background p-7">
                  <Icon className="mb-5 h-5 w-5 text-primary" strokeWidth={1.75} />
                  <h3 className="mb-2 font-semibold tracking-tight">{title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Sécurité ────────────────────────────────────────── */}
        <section id="security" className="scroll-mt-14 border-t">
          <Reveal className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <SectionHeading
              eyebrow="Sécurité"
              title="Les documents de vos clients restent les leurs."
              subtitle="Pièces d'identité, RIB, contrats : OnboardFlow est conçu pour des données sensibles dès la première ligne de code."
            />
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {security.map(({ icon: Icon, title, description }) => (
                <div key={title} data-reveal className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
                    <Icon className="h-[18px] w-[18px] text-foreground" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-semibold tracking-tight">{title}</h3>
                    <p className="text-[15px] leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Tarifs ──────────────────────────────────────────── */}
        <section id="pricing" className="scroll-mt-14 border-t bg-muted/30">
          <Reveal className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <SectionHeading
              eyebrow="Tarifs"
              title="Simple et transparent."
              subtitle="Sans engagement. Changez de plan à tout moment."
            />
            <div className="grid items-start gap-5 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  data-reveal
                  className={cn(
                    "flex flex-col rounded-2xl border bg-background p-7",
                    plan.popular && "border-primary/40 shadow-xl shadow-primary/10 ring-1 ring-primary/40"
                  )}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-semibold">{plan.name}</h3>
                    {plan.popular && (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground">
                        Populaire
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <p className="mb-6 mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-[-0.03em]">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/mois</span>
                  </p>
                  <ul className="mb-8 flex flex-col gap-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={cn(
                      buttonVariants({ variant: plan.popular ? "default" : "outline" }),
                      "mt-auto h-10 w-full justify-center rounded-full transition-transform active:scale-[0.97]"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Appel à l'action final ──────────────────────────── */}
        <section className="border-t">
          <Reveal className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
            <h2
              data-reveal
              className="mb-5 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl text-balance"
            >
              Votre prochain client mérite un meilleur premier jour.
            </h2>
            <p data-reveal className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Créez votre premier espace en quelques minutes. Gratuit pour commencer, sans carte bancaire.
            </p>
            <div data-reveal>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 gap-2 rounded-full px-7 transition-transform active:scale-[0.97]"
                )}
              >
                Créer mon premier espace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <span className="text-sm font-semibold tracking-tight">OnboardFlow</span>
          <p className="text-xs text-muted-foreground">© 2026 OnboardFlow. Tous droits réservés.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Confidentialité</a>
            <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">CGU</a>
            <Link href="/login" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Connexion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8l3.5 3.5 6.5-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AppMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-sky-400/10 blur-3xl rounded-full animate-glow-pulse pointer-events-none" />
      <div className="relative animate-float">
        <div
          className="rounded-2xl border border-[#1A2840] bg-[#0D1424] shadow-2xl overflow-hidden"
          style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(56,189,248,0.05)" }}
        >
          {/* Window bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1A2840] bg-[#09111F]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
            <span className="ml-3 text-[10px] text-slate-500 font-mono">
              onboardflow.app/onboarding/techcorp
            </span>
          </div>

          <div className="p-5 w-[340px]">
            {/* Client header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-xl bg-sky-400/15 flex items-center justify-center shrink-0 border border-sky-400/20">
                <span className="text-xs font-bold text-sky-400" style={{ fontFamily: "var(--font-syne)" }}>TC</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-100 truncate">TechCorp SAS</p>
                <p className="text-xs text-slate-500">Onboarding en cours</p>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/20">
                60%
              </span>
            </div>

            {/* Progress */}
            <div className="mb-5">
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-slate-500">Progression</span>
                <span className="text-sky-400 font-medium">3 / 5 tâches</span>
              </div>
              <div className="h-1.5 bg-[#1A2840] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-400 w-3/5"
                  style={{ boxShadow: "0 0 12px rgba(56,189,248,0.5)" }}
                />
              </div>
            </div>

            {/* Tasks */}
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Contrat de prestation signé", done: true },
                { label: "RIB bancaire (PDF)", done: true },
                { label: "Pièce d'identité recto-verso", done: true },
                { label: "Justificatif de domicile", done: false },
                { label: "Photo de profil (PNG/JPG)", done: false },
              ].map((task) => (
                <div
                  key={task.label}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 border transition-colors ${
                    task.done
                      ? "border-[#1A2840]/50 bg-[#0A1020]"
                      : "border-[#1A2840] bg-[#0D1830]"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 border ${
                      task.done
                        ? "bg-sky-400 border-sky-400"
                        : "border-[#2A3F60]"
                    }`}
                  >
                    {task.done && (
                      <svg className="h-2.5 w-2.5 text-[#06090F]" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-[11px] ${
                      task.done ? "text-slate-500 line-through" : "text-slate-300"
                    }`}
                  >
                    {task.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Upload zone */}
            <div className="mt-4 rounded-lg border border-dashed border-[#1A2840] p-3 text-center">
              <p className="text-[10px] text-slate-500">
                📎 Déposez vos fichiers ici
              </p>
            </div>
          </div>
        </div>

        {/* Floating notification card */}
        <div
          className="absolute -right-6 -bottom-4 rounded-xl border border-[#1A2840] bg-[#0D1424] px-3 py-2.5 flex items-center gap-2.5 shadow-xl"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
        >
          <span className="h-7 w-7 rounded-lg bg-emerald-400/15 flex items-center justify-center border border-emerald-400/20 shrink-0">
            <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-[10px] font-semibold text-slate-200">Nouveau document</p>
            <p className="text-[9px] text-slate-500">TechCorp vient d'envoyer un fichier</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
        <path d="M13 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 3v1m0 12v1M3 10h1m12 0h1m-2.05-4.95-.71.71M5.76 14.24l-.71.71M5.76 5.76l-.71-.71M14.24 14.24l-.71-.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "sky",
    title: "Un lien, c'est tout",
    desc: "Générez un espace unique par client en 10 secondes. Aucun compte à créer, aucune app à installer côté client.",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
        <path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    color: "violet",
    title: "Suivi en temps réel",
    desc: "Visualisez la progression de chaque client depuis votre dashboard. Soyez notifié à chaque action.",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
        <path d="M4 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="8" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "emerald",
    title: "Tout centralisé",
    desc: "Documents, formulaires, validations — tout est au même endroit. Zéro email perdu, zéro pièce manquante.",
  },
];

const steps = [
  {
    n: "01",
    title: "Créez l'espace",
    desc: "Définissez la checklist de ce que vous attendez : documents, formulaires, validations.",
  },
  {
    n: "02",
    title: "Envoyez le lien",
    desc: "Copiez et envoyez le lien unique à votre client. Un seul clic, aucune inscription requise.",
  },
  {
    n: "03",
    title: "Suivez en direct",
    desc: "Votre client complète à son rythme. Vous voyez la progression en temps réel depuis le dashboard.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Gratuit",
    sub: "Pour démarrer",
    features: ["3 espaces actifs", "Checklist illimitée", "Stockage 500 Mo", "Support email"],
    cta: "Commencer gratuitement",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "29€",
    sub: "par mois",
    features: ["Espaces illimités", "Checklist illimitée", "Stockage 10 Go", "Notifications email", "Support prioritaire"],
    cta: "Démarrer l'essai",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "79€",
    sub: "par mois",
    features: ["Tout du Pro", "Multi-utilisateurs", "Stockage 100 Go", "White-label", "Account manager dédié"],
    cta: "Nous contacter",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 overflow-x-hidden">
      {/* ── Navigation ───────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 flex items-center px-6 md:px-10 border-b border-[#1A2840]/60 bg-[#06090F]/80 backdrop-blur-xl">
        <span
          className="text-lg font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Onboard<span className="text-sky-400">Flow</span>
        </span>

        <div className="ml-auto hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
            Fonctionnalités
          </a>
          <a href="#how" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
            Comment ça marche
          </a>
          <a href="#pricing" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
            Tarifs
          </a>
        </div>

        <div className="ml-auto md:ml-8 flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-slate-400 hover:text-slate-100 transition-colors hidden sm:block"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-sky-400 px-4 py-1.5 text-sm font-semibold text-[#06090F] hover:bg-sky-300 transition-colors"
          >
            Essai gratuit
          </Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 px-6 md:px-10">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-sky-400/5 blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle, #1A2840 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06090F]" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-20">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-medium text-sky-400">
                Nouveau — Dashboard temps réel disponible
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              L'onboarding client{" "}
              <span className="gradient-text">sans friction</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
              Créez un espace dédié par client. Envoyez un lien. Collectez
              documents et validations en temps réel.{" "}
              <span className="text-slate-300">Fini les emails perdus.</span>
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-6 py-3 text-sm font-semibold text-[#06090F] hover:bg-sky-300 transition-all hover:shadow-[0_0_24px_rgba(56,189,248,0.4)]"
              >
                Commencer gratuitement
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1A2840] bg-[#0D1424] px-6 py-3 text-sm font-medium text-slate-300 hover:border-[#2A3F60] hover:text-slate-100 transition-colors"
              >
                Voir comment ça marche
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {["#38BDF8", "#818CF8", "#34D399", "#F472B6"].map((c, i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-[#06090F] flex items-center justify-center text-[9px] font-bold"
                    style={{ background: `${c}22`, borderColor: "#06090F", color: c }}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                <span className="text-slate-200 font-medium">200+ agences</span>{" "}
                ont simplifié leur onboarding
              </p>
            </div>
          </div>

          {/* Right — app mockup */}
          <div className="flex justify-center lg:justify-end">
            <AppMockup />
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section className="border-y border-[#1A2840] bg-[#0D1424]/50">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "−80%", label: "d'allers-retours par email" },
            { value: "3×", label: "plus rapide à onboarder" },
            { value: "98%", label: "de taux de satisfaction client" },
          ].map((stat) => (
            <div key={stat.value}>
              <p
                className="text-4xl font-bold text-sky-400 mb-1"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section id="features" className="py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3">
              Fonctionnalités
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-100"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Tout ce dont vous avez besoin
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#1A2840] bg-[#0D1424] p-6 hover:border-[#2A3F60] transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.05)]"
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${
                    f.color === "sky"
                      ? "bg-sky-400/10 text-sky-400 border border-sky-400/20"
                      : f.color === "violet"
                      ? "bg-violet-400/10 text-violet-400 border border-violet-400/20"
                      : "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  }`}
                >
                  {f.icon}
                </div>
                <h3
                  className="text-base font-bold text-slate-100 mb-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────── */}
      <section id="how" className="py-24 px-6 md:px-10 bg-[#0D1424]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3">
              Comment ça marche
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-100"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Opérationnel en 3 minutes
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/0 via-sky-400/30 to-sky-400/0 hidden sm:block" />
            <div className="flex flex-col gap-10">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-8 items-start">
                  <div className="relative shrink-0 h-16 w-16 rounded-2xl border border-[#1A2840] bg-[#0D1424] flex items-center justify-center">
                    <span
                      className="text-xl font-bold text-sky-400"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <div className="pt-3">
                    <h3
                      className="text-lg font-bold text-slate-100 mb-1"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3">
              Tarifs
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Simple, transparent
            </h2>
            <p className="text-slate-400">Sans engagement. Changez de plan à tout moment.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 flex flex-col transition-all ${
                  plan.highlighted
                    ? "border-sky-400/50 bg-[#0D1830] shadow-[0_0_40px_rgba(56,189,248,0.1)]"
                    : "border-[#1A2840] bg-[#0D1424] hover:border-[#2A3F60]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-sky-400 text-[#06090F] text-[10px] font-bold px-3 py-1 rounded-full">
                      RECOMMANDÉ
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className="text-sm font-semibold text-slate-300 mb-3"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-3xl font-bold text-slate-100"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm text-slate-500">{plan.sub}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <CheckIcon
                        className={`h-4 w-4 shrink-0 ${
                          plan.highlighted ? "text-sky-400" : "text-slate-500"
                        }`}
                      />
                      <span className="text-sm text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`w-full rounded-xl py-2.5 text-sm font-semibold text-center transition-all ${
                    plan.highlighted
                      ? "bg-sky-400 text-[#06090F] hover:bg-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                      : "border border-[#1A2840] text-slate-300 hover:border-[#2A3F60] hover:text-slate-100"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative rounded-3xl border border-[#1A2840] bg-[#0D1424] p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/5 via-transparent to-violet-500/5 pointer-events-none" />
            <div className="relative">
              <h2
                className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Prêt à transformer votre onboarding ?
              </h2>
              <p className="text-slate-400 mb-8">
                Rejoignez 200+ agences qui ont dit adieu aux emails d'onboarding.
                Gratuit pour commencer, sans carte bancaire.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-8 py-3.5 text-sm font-bold text-[#06090F] hover:bg-sky-300 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
              >
                Commencer gratuitement
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-[#1A2840] px-6 md:px-10 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="font-bold text-slate-300"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Onboard<span className="text-sky-400">Flow</span>
          </span>
          <p className="text-sm text-slate-500">
            © 2026 OnboardFlow. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Confidentialité</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">CGU</a>
            <Link href="/login" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Connexion
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

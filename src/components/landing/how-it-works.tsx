"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CreateSpaceMock, DashboardMock, ShareLinkMock } from "@/components/landing/product-preview";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Créez l'espace",
    description:
      "Nommez votre client et listez ce qu'il doit faire : des actions à cocher, des documents à joindre, avec une date limite si besoin.",
    Mock: CreateSpaceMock,
  },
  {
    number: "02",
    title: "Envoyez le lien",
    description:
      "Chaque espace a son lien unique, impossible à deviner. Votre client l'ouvre sans créer de compte.",
    Mock: ShareLinkMock,
  },
  {
    number: "03",
    title: "Suivez la progression",
    description:
      "Les tâches se cochent, les fichiers arrivent rangés sous la bonne tâche, les retards ressortent en rouge.",
    Mock: DashboardMock,
  },
];

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Version épinglée : grand écran uniquement, et seulement si l'utilisateur accepte les animations.
      // Sinon, la version empilée (plus bas) s'affiche via CSS, sans aucune animation.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const screens = gsap.utils.toArray<HTMLElement>("[data-screen]");
        const items = gsap.utils.toArray<HTMLElement>("[data-step]");

        gsap.set("[data-rail]", { scaleY: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 0.6 },
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 0.6,
            // S'arrête sur une étape entière plutôt qu'entre deux écrans
            snap: { snapTo: [0, 0.5, 1], duration: 0.5, ease: "power2.inOut" },
          },
        });

        tl.to("[data-rail]", { scaleY: 1, ease: "none", duration: 2 }, 0);

        for (let i = 1; i < screens.length; i++) {
          const at = i - 0.8;
          tl.to(screens[i - 1], { autoAlpha: 0, y: -24, scale: 0.98 }, at)
            .to(screens[i], { autoAlpha: 1, y: 0, scale: 1 }, at)
            .to(items[i - 1], { opacity: 0.35 }, at)
            .to(items[i], { opacity: 1 }, at);
        }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="how-it-works" className="scroll-mt-14">
      {/* ── Grand écran : section épinglée, l'écran change au fil du défilement ── */}
      <div data-pin className="hidden h-screen items-center lg:motion-safe:flex">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_1.15fr] items-center gap-16 px-6">
          <div>
            <p className="mb-3 text-sm font-medium text-primary">Comment ça marche</p>
            <h2 className="mb-10 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-balance">
              Trois étapes, aucun email.
            </h2>
            <div className="relative pl-8">
              <div className="absolute left-0 top-1 bottom-1 w-px bg-border" />
              <div data-rail className="absolute left-0 top-1 bottom-1 w-px origin-top bg-primary" />
              <ol className="flex flex-col gap-8">
                {steps.map((step, i) => (
                  <li key={step.number} data-step className={cn(i > 0 && "opacity-35")}>
                    <p className="mb-1 font-mono text-xs text-muted-foreground">{step.number}</p>
                    <h3 className="mb-1.5 text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative min-h-[26rem]">
            {steps.map(({ number, Mock }, i) => (
              <div
                key={number}
                data-screen
                aria-hidden
                className={cn("absolute inset-x-0 top-1/2 -translate-y-1/2", i > 0 && "invisible opacity-0")}
              >
                <Mock />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile, tablette, ou moins d'animations : étapes empilées ── */}
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:motion-safe:hidden">
        <p className="mb-3 text-sm font-medium text-primary">Comment ça marche</p>
        <h2 className="mb-12 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl text-balance">
          Trois étapes, aucun email.
        </h2>
        <ol className="flex flex-col gap-14">
          {steps.map(({ number, title, description, Mock }) => (
            <li key={number}>
              <p className="mb-1 font-mono text-xs text-muted-foreground">{number}</p>
              <h3 className="mb-1.5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
              <div aria-hidden>
                <Mock />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

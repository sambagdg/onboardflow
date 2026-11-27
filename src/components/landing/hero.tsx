"use client";

import { Fragment, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ProductPreview } from "@/components/landing/product-preview";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const headline = ["L'onboarding", "client,", "sans", "les", "allers-retours."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Moins d'animations demandé : la page s'affiche directement dans son état final
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = root.current?.querySelector<HTMLElement>("[data-count]");
        const count = { value: 0 };

        const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } });

        tl.from("[data-hero-word]", { yPercent: 130, stagger: 0.06 })
          .from("[data-hero-fade]", { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.8 }, "-=0.7")
          .from("[data-preview]", { autoAlpha: 0, y: 48, duration: 1.2 }, "-=0.8")
          // La checklist se remplit : barre, compteur, coches, puis fichiers joints
          .addLabel("fill", "-=0.5")
          .from("[data-progress-bar]", { scaleX: 0, duration: 1.4, ease: "power2.inOut" }, "fill")
          .to(
            count,
            {
              value: 3,
              duration: 1.4,
              ease: "power2.inOut",
              snap: { value: 1 },
              onUpdate: () => {
                if (counter) counter.textContent = String(count.value);
              },
            },
            "fill"
          )
          .from("[data-check]", { scale: 0, autoAlpha: 0, stagger: 0.4, duration: 0.5, ease: "back.out(1.7)" }, "fill+=0.2")
          .from("[data-file]", { autoAlpha: 0, x: -8, stagger: 0.4, duration: 0.6 }, "fill+=0.6");
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-28">
        <div className="text-center lg:text-left">
          <p
            data-hero-fade
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Pour les agences et les freelances
          </p>

          <h1 className="mb-6 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem] text-balance">
            {headline.map((word, i) => (
              <Fragment key={i}>
                {/* Boîte de découpe agrandie (py) pour cacher aussi le haut des lettres pendant l'animation */}
                <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
                  <span data-hero-word className={cn("inline-block", i >= 2 && "text-primary")}>
                    {word}
                  </span>
                </span>
                {/* L'espace reste HORS du inline-block, sinon il est supprimé */}
                {i < headline.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <p
            data-hero-fade
            className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0"
          >
            Un espace par client, un lien à partager. Votre client coche ses tâches et dépose ses
            documents au bon endroit ; vous suivez tout depuis un seul tableau de bord.
          </p>

          <div data-hero-fade className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 rounded-full px-6 transition-transform active:scale-[0.97]"
              )}
            >
              Créer mon premier espace
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-11 rounded-full px-6 transition-transform active:scale-[0.97]"
              )}
            >
              Voir comment ça marche
            </a>
          </div>

          <p data-hero-fade className="mt-6 text-sm text-muted-foreground">
            Gratuit pour commencer · Aucun compte côté client
          </p>
        </div>

        <div data-preview aria-hidden className="mx-auto w-full max-w-md lg:max-w-none">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}

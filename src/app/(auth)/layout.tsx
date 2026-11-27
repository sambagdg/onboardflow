import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProductPreview } from "@/components/landing/product-preview";
import { Reveal } from "@/components/landing/reveal";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl backdrop-saturate-150 supports-backdrop-filter:bg-background/70">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-[17px] font-semibold tracking-tight">
            OnboardFlow
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="grid flex-1 lg:grid-cols-2">
        {/* Formulaire */}
        <main className="flex items-center justify-center px-4 py-12 sm:px-6">
          <Reveal className="w-full max-w-sm">{children}</Reveal>
        </main>

        {/* Aperçu produit : rappelle ce que l'on vient chercher (grand écran uniquement) */}
        <aside className="hidden items-center justify-center border-l bg-muted/40 px-12 lg:flex">
          <div className="w-full max-w-md">
            <div aria-hidden>
              <ProductPreview />
            </div>
            <p className="mt-8 text-balance text-center text-[15px] leading-relaxed text-muted-foreground">
              Votre client ouvre son lien, coche ses tâches et joint ses documents.
              Vous suivez tout depuis votre tableau de bord.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

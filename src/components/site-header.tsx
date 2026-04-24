"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#how-it-works", label: "Comment ça marche" },
  { href: "#pricing", label: "Tarifs" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-4">

        {/* Logo */}
        <Link href="/" className="mr-8 font-bold text-lg tracking-tight">
          OnboardFlow
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions desktop — buttonVariants sur Link évite le besoin d'asChild */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Connexion
          </Link>
          <Link href="/register" className={cn(buttonVariants({ size: "sm" }))}>
            Commencer gratuitement
          </Link>
        </div>

        {/* Actions mobile */}
        <div className="flex md:hidden items-center gap-1 ml-auto">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            {/* SheetTrigger n'accepte pas asChild (Base UI), on applique buttonVariants via className */}
            <SheetTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-bold text-base mb-6">OnboardFlow</SheetTitle>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <Separator className="my-4" />
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "outline" }), "justify-center")}
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants(), "justify-center")}
                >
                  Commencer gratuitement
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}

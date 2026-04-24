import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  /* Initiales pour l'avatar */
  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header principal */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
          {/* Logo */}
          <Link href="/dashboard" className="font-bold text-base tracking-tight">
            OnboardFlow
          </Link>

          <Separator orientation="vertical" className="h-5" />

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              Clients
            </Link>
          </nav>

          {/* Actions à droite */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            {/* Email affiché sur desktop */}
            <span className="hidden md:block text-xs text-muted-foreground">
              {user.email}
            </span>

            {/* Avatar avec initiales */}
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Bouton déconnexion */}
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground">
                Déconnexion
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}

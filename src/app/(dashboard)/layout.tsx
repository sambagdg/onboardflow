import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-[#06090F] flex flex-col">
      <header className="h-14 border-b border-[#1A2840] bg-[#06090F]/90 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40">
        <Link
          href="/dashboard"
          className="text-base font-bold text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Onboard<span className="text-sky-400">Flow</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-slate-500">{user.email}</span>
          <div className="h-7 w-7 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-sky-400">{initials}</span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs text-slate-500 hover:text-slate-200 transition-colors border border-[#1A2840] rounded-lg px-3 py-1.5 hover:border-[#2A3F60]"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}

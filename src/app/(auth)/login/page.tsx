import Link from "next/link";
import { login } from "@/app/actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams;

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-slate-100 mb-1.5"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Content de vous revoir
        </h1>
        <p className="text-sm text-slate-400">Accédez à votre espace agence</p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 flex items-start gap-2.5">
          <svg className="h-4 w-4 text-red-400 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-red-400">{decodeURIComponent(error as string)}</p>
        </div>
      )}

      <form action={login} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="vous@agence.com"
            className="rounded-xl border border-[#1A2840] bg-[#0D1424] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="rounded-xl border border-[#1A2840] bg-[#0D1424] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="mt-1 rounded-xl bg-sky-400 py-2.5 text-sm font-bold text-[#06090F] hover:bg-sky-300 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] active:scale-[0.98]"
        >
          Se connecter →
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-semibold text-sky-400 hover:text-sky-300 transition-colors">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}

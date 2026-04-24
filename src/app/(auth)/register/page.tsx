import Link from "next/link";
import { register } from "@/app/actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const { error, confirm } = await searchParams;

  if (confirm) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 h-16 w-16 rounded-2xl border border-sky-400/20 bg-sky-400/10 flex items-center justify-center">
          <svg className="h-8 w-8 text-sky-400" viewBox="0 0 24 24" fill="none">
            <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-100 mb-2" style={{ fontFamily: "var(--font-syne)" }}>
          Vérifiez votre boîte mail
        </h1>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Un lien de confirmation a été envoyé à votre adresse.
          Cliquez dessus pour activer votre compte.
        </p>
        <Link
          href="/login"
          className="text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
        >
          ← Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-slate-100 mb-1.5"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Créer votre compte
        </h1>
        <p className="text-sm text-slate-400">
          Commencez à onboarder vos clients en quelques minutes
        </p>
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

      <form action={register} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Email professionnel
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
            minLength={8}
            autoComplete="new-password"
            placeholder="8 caractères minimum"
            className="rounded-xl border border-[#1A2840] bg-[#0D1424] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="mt-1 rounded-xl bg-sky-400 py-2.5 text-sm font-bold text-[#06090F] hover:bg-sky-300 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] active:scale-[0.98]"
        >
          Créer mon compte →
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-600">
        En créant un compte, vous acceptez nos{" "}
        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">CGU</a>
        {" "}et notre{" "}
        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">politique de confidentialité</a>.
      </p>

      <p className="mt-4 text-center text-sm text-slate-500">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-semibold text-sky-400 hover:text-sky-300 transition-colors">
          Se connecter
        </Link>
      </p>
    </div>
  );
}

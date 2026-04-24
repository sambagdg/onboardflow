import Link from "next/link";
import { createProject } from "@/app/actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-200 transition-colors mb-6"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Retour
      </Link>

      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-slate-100 mb-1"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Nouvel espace client
        </h1>
        <p className="text-sm text-slate-500">
          Créez un espace d'onboarding dédié. Vous pourrez y ajouter une checklist et partager un lien unique.
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

      <form
        action={createProject}
        className="rounded-2xl border border-[#1A2840] bg-[#0D1424] p-6 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="clientName"
            className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
          >
            Nom du client
          </label>
          <input
            id="clientName"
            type="text"
            name="clientName"
            placeholder="Ex : Acme Corp"
            required
            autoFocus
            className="rounded-xl border border-[#1A2840] bg-[#06090F] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
          >
            Description{" "}
            <span className="font-normal normal-case text-slate-600">(optionnel)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Contexte du projet, notes internes…"
            className="rounded-xl border border-[#1A2840] bg-[#06090F] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="rounded-xl bg-sky-400 px-6 py-2.5 text-sm font-bold text-[#06090F] hover:bg-sky-300 transition-all hover:shadow-[0_0_16px_rgba(56,189,248,0.3)]"
          >
            Créer l'espace →
          </button>
          <Link
            href="/dashboard"
            className="rounded-xl border border-[#1A2840] px-4 py-2.5 text-sm text-slate-400 hover:border-[#2A3F60] hover:text-slate-200 transition-colors"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { addTask } from "@/app/actions";

export function AddTaskForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await addTask(formData);
    formRef.current?.reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-sky-400 transition-colors group"
      >
        <span className="h-5 w-5 rounded-md border border-[#1A2840] bg-[#0A1020] flex items-center justify-center group-hover:border-sky-400/30 group-hover:bg-sky-400/5 transition-colors">
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        Ajouter une tâche
      </button>
    );
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-3 pt-1">
      <input type="hidden" name="projectId" value={projectId} />

      <input
        name="title"
        type="text"
        placeholder="Ex : Envoyer le logo en SVG"
        required
        autoFocus
        className="rounded-xl border border-[#1A2840] bg-[#06090F] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20 transition-colors"
      />
      <input
        name="description"
        type="text"
        placeholder="Description optionnelle…"
        className="rounded-xl border border-[#1A2840] bg-[#06090F] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/20 transition-colors"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-[#06090F] hover:bg-sky-300 transition-all hover:shadow-[0_0_14px_rgba(56,189,248,0.3)]"
        >
          Ajouter
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-[#1A2840] px-4 py-2 text-sm text-slate-400 hover:border-[#2A3F60] hover:text-slate-200 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

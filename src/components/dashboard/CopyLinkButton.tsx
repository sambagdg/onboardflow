"use client";

import { useState } from "react";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`shrink-0 inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all ${
        copied
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
          : "border-[#1A2840] bg-[#0D1424] text-slate-400 hover:border-sky-400/30 hover:text-sky-400 hover:bg-sky-400/5"
      }`}
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copié !
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
            <path d="M9 1H3a1 1 0 0 0-1 1v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <rect x="4" y="4" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          Copier le lien client
        </>
      )}
    </button>
  );
}

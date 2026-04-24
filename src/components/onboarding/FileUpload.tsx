"use client";

import { useState, useRef } from "react";
import type { Submission } from "@/types";

export function FileUpload({
  projectSlug,
  initialSubmissions,
}: {
  projectSlug: string;
  initialSubmissions: Submission[];
}) {
  const [uploading, setUploading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList) {
    if (!files.length) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectSlug", projectSlug);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const submission: Submission = await res.json();
          setSubmissions((prev) => [submission, ...prev]);
        }
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) uploadFiles(e.target.files);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
  }

  function getFileIcon(name: string) {
    const ext = name.split(".").pop()?.toLowerCase();
    if (["pdf"].includes(ext ?? "")) return "📄";
    if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext ?? "")) return "🖼️";
    if (["zip", "rar", "7z"].includes(ext ?? "")) return "🗜️";
    return "📎";
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <div
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? "border-sky-400/60 bg-sky-400/5"
            : uploading
            ? "border-[#1A2840] bg-[#0D1424] opacity-70"
            : "border-[#1A2840] bg-[#0D1424] hover:border-sky-400/30 hover:bg-sky-400/[0.02]"
        }`}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <>
              <div className="h-10 w-10 rounded-xl border border-sky-400/20 bg-sky-400/10 flex items-center justify-center">
                <svg className="h-5 w-5 text-sky-400 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-medium text-sky-400">Envoi en cours…</p>
            </>
          ) : (
            <>
              <div className={`h-10 w-10 rounded-xl border flex items-center justify-center transition-colors ${
                dragOver ? "border-sky-400/40 bg-sky-400/10" : "border-[#1A2840] bg-[#0A1020]"
              }`}>
                <svg className={`h-5 w-5 transition-colors ${dragOver ? "text-sky-400" : "text-slate-500"}`} viewBox="0 0 20 20" fill="none">
                  <path d="M10 13V7m0 0L7 10m3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 14v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-300 mb-0.5">
                  {dragOver ? "Relâchez pour envoyer" : "Déposez vos fichiers ici"}
                </p>
                <p className="text-xs text-slate-500">ou cliquez pour parcourir — PDF, PNG, JPG, ZIP</p>
              </div>
            </>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          disabled={uploading}
          onChange={handleChange}
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.rar"
        />
      </div>

      {/* File list */}
      {submissions.length > 0 && (
        <div className="rounded-xl border border-[#1A2840] bg-[#0D1424] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[#1A2840]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Fichiers envoyés ({submissions.length})
            </p>
          </div>
          <ul className="divide-y divide-[#1A2840]">
            {submissions.map((s) => (
              <li key={s.id}>
                <a
                  href={s.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#0A1020] transition-colors"
                >
                  <span className="text-lg shrink-0">{getFileIcon(s.file_name)}</span>
                  <span className="text-sm text-slate-300 truncate flex-1 hover:text-sky-400 transition-colors">
                    {s.file_name}
                  </span>
                  <svg className="h-3.5 w-3.5 text-slate-600 shrink-0" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

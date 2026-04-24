"use client";

import { useState, useRef } from "react";
import { Upload, FileText, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
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

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200",
          dragOver
            ? "border-primary/60 bg-primary/5"
            : uploading
            ? "border-border bg-accent/30 opacity-70 cursor-wait"
            : "border-border bg-card hover:border-primary/40 hover:bg-accent/20"
        )}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border transition-colors",
              dragOver
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground"
            )}
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">
              {uploading
                ? "Envoi en cours…"
                : dragOver
                ? "Relâchez pour envoyer"
                : "Déposez vos fichiers ici"}
            </p>
            {!uploading && (
              <p className="text-xs text-muted-foreground mt-0.5">
                ou cliquez pour parcourir — PDF, PNG, JPG, ZIP
              </p>
            )}
          </div>
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
        <div className="rounded-lg border overflow-hidden">
          <div className="px-4 py-2 border-b bg-muted/50">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Fichiers envoyés ({submissions.length})
            </p>
          </div>
          <ul className="divide-y">
            {submissions.map((s) => (
              <li key={s.id}>
                <a
                  href={s.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors"
                >
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm truncate flex-1 hover:text-primary transition-colors">
                    {s.file_name}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

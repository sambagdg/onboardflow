import type { Submission } from "@/types";

export type UploadResult = { submission: Submission } | { error: string };

/* Envoie un fichier à /api/upload (page client), éventuellement rattaché à une tâche */
export async function uploadFile(token: string, file: File, taskId?: string): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("token", token);
  if (taskId) formData.append("taskId", taskId);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: `${file.name} : ${body?.error ?? "échec de l'envoi"}` };
  }
  return { submission: await res.json() };
}

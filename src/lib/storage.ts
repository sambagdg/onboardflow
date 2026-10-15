import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Submission } from "@/types";

const BUCKET = "onboarding-files";
const SIGNED_URL_TTL = 60 * 60; // 1 h

/* Le bucket est privé : on remplace file_url par une URL signée temporaire.
   À n'appeler qu'après avoir vérifié l'accès au projet (jeton ou compte agence). */
export async function withSignedUrls(submissions: Submission[]) {
  if (submissions.length === 0) return submissions;

  const { data } = await createAdminClient()
    .storage.from(BUCKET)
    .createSignedUrls(submissions.map((s) => s.file_path), SIGNED_URL_TTL);

  return submissions.map((s, i) => ({ ...s, file_url: data?.[i]?.signedUrl ?? "" }));
}

import "server-only";
import { createClient } from "@supabase/supabase-js";

/* Client avec la clé secrète : ignore les RLS, réservé au serveur.
   Toujours filtrer par share_token avant de lire ou d'écrire. */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Vercel refuse les requêtes de plus de 4,5 Mo
const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/zip",
  "application/x-zip-compressed",
];

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const token = formData.get("token");

  if (!(file instanceof File) || typeof token !== "string") {
    return NextResponse.json(
      { error: "Fichier et jeton requis" },
      { status: 400 },
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Fichier trop volumineux (4 Mo max)" },
      { status: 413 },
    );
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Type de fichier non autorisé" },
      { status: 415 },
    );
  }

  const supabase = createAdminClient();

  // Le jeton du lien est la seule preuve d'accès
  const { data: project } = await supabase
    .from("projects")
    .select("id, slug")
    .eq("share_token", token)
    .single();

  if (!project) {
    return NextResponse.json({ error: "Lien invalide" }, { status: 404 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${project.slug}/${Date.now()}-${safeName}`;

  const { error: storageError } = await supabase.storage
    .from("onboarding-files")
    .upload(path, file, { contentType: file.type });

  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("onboarding-files")
    .getPublicUrl(path);

  const { data: submission, error: dbError } = await supabase
    .from("submissions")
    .insert({
      project_id: project.id,
      file_url: urlData.publicUrl,
      file_name: file.name,
    })
    .select()
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json(submission, { status: 201 });
}

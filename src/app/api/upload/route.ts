import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createServerClient();

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const projectSlug = formData.get("projectSlug") as string | null;

  if (!file || !projectSlug) {
    return NextResponse.json(
      { error: "Fichier et slug du projet requis" },
      { status: 400 }
    );
  }

  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", projectSlug)
    .single();

  if (!project) {
    return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `${projectSlug}/${Date.now()}-${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("onboarding-files")
    .upload(path, buffer, { contentType: file.type });

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

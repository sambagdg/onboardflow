"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  // Email confirmation required — no session yet
  if (!data.session) {
    redirect("/register?confirm=1");
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createProject(formData: FormData) {
  const clientName = (formData.get("clientName") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();

  if (!clientName) return;

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const slug = `${slugify(clientName)}-${Date.now()}`;

  const { data, error } = await supabase
    .from("projects")
    .insert({ agency_id: user.id, client_name: clientName, description, slug })
    .select()
    .single();

  if (error) {
    redirect(`/dashboard/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/${data.id}`);
}

export async function toggleTask(taskId: string, completed: boolean, projectId: string) {
  const supabase = await createServerClient();
  await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", taskId);
  revalidatePath(`/dashboard/${projectId}`);
}

export async function addTask(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();

  if (!projectId || !title) return;

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { count } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId);

  await supabase.from("tasks").insert({
    project_id: projectId,
    title,
    description: description || null,
    position: count ?? 0,
  });

  revalidatePath(`/dashboard/${projectId}`);
}

export async function deleteTask(taskId: string, projectId: string) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  await supabase.from("tasks").delete().eq("id", taskId);

  revalidatePath(`/dashboard/${projectId}`);
}

export async function deleteProject(id: string) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("agency_id", user.id);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

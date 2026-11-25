"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { createAdminClient } from "@/lib/supabase/admin";

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

export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;
  const clientName = (formData.get("clientName") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();

  if (!id || !clientName) return;

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Liste blanche : seuls ces 2 champs sont modifiables (pas de mass assignment)
  await supabase
    .from("projects")
    .update({ client_name: clientName, description: description || null })
    .eq("id", id)
    .eq("agency_id", user.id);

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/${id}`);
}

/* Page client (sans compte) : le jeton du lien est la seule preuve d'accès */
export async function toggleTaskByToken(
  token: string,
  taskId: string,
  completed: boolean,
) {
  const supabase = createAdminClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("share_token", token)
    .single();

  if (!project) throw new Error("Lien invalide");

  // Le client admin ignore les RLS : on limite nous-mêmes aux tâches de ce projet
  const { error } = await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", taskId)
    .eq("project_id", project.id);

  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/${project.id}`);
}

export async function addTask(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const dueDate = formData.get("dueDate") as string;

  if (!projectId || !title) return;

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Dernière position + 1 (le nombre de tâches crée des doublons après une suppression)
  const { data: last } = await supabase
    .from("tasks")
    .select("position")
    .eq("project_id", projectId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("tasks").insert({
    project_id: projectId,
    title,
    description: description || null,
    due_date: dueDate || null,
    position: (last?.position ?? -1) + 1,
  });

  revalidatePath(`/dashboard/${projectId}`);
}

export async function updateTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const projectId = formData.get("projectId") as string;
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const dueDate = formData.get("dueDate") as string;

  if (!taskId || !projectId || !title) return;

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Liste blanche des champs ; la RLS "agence_manage_tasks" garantit que
  // la tâche appartient à un projet de cette agence
  await supabase
    .from("tasks")
    .update({ title, description: description || null, due_date: dueDate || null })
    .eq("id", taskId)
    .eq("project_id", projectId);

  revalidatePath(`/dashboard/${projectId}`);
}

export async function moveTask(projectId: string, taskId: string, direction: "up" | "down") {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Même ordre que l'affichage : position, puis date de création en cas d'égalité
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id")
    .eq("project_id", projectId)
    .order("position")
    .order("created_at");

  if (!tasks) return;

  const ids = tasks.map((t) => t.id);
  const from = ids.indexOf(taskId);
  const to = direction === "up" ? from - 1 : from + 1;
  if (from === -1 || to < 0 || to >= ids.length) return;

  [ids[from], ids[to]] = [ids[to], ids[from]];

  // Renumérote toutes les tâches en une seule transaction (migration 006)
  await supabase.rpc("reorder_tasks", { p_project_id: projectId, p_task_ids: ids });

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

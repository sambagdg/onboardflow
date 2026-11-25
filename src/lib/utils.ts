import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

/* Date limite "AAAA-MM-JJ" → "25 oct." (sans décalage de fuseau) */
export function formatDueDate(dueDate: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${dueDate}T00:00:00Z`));
}

/* En retard si la date est passée (jour de Paris) et la tâche non faite */
export function isOverdue(
  dueDate: string | null | undefined,
  completed: boolean,
): boolean {
  if (!dueDate || completed) return false;
  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Paris",
  }).format(new Date());
  return dueDate < today;
}

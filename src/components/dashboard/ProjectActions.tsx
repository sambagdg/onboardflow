"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, ExternalLink, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { deleteProject } from "@/app/actions";
import { cn } from "@/lib/utils";

interface ProjectActionsProps {
  projectId: string;
  clientUrl: string;
}

export function ProjectActions({ projectId, clientUrl }: ProjectActionsProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm("Supprimer cet espace client ? Cette action est irréversible.")) return;
    startTransition(() => deleteProject(projectId));
  }

  function handleCopy() {
    navigator.clipboard.writeText(clientUrl);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-8 w-8 text-muted-foreground"
        )}
        aria-label="Actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/dashboard/${projectId}`)}>
          Voir le projet
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          Copier le lien client
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={pending}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

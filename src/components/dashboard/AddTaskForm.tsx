"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { addTask } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddTaskForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await addTask(formData);
    formRef.current?.reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-1.5 text-muted-foreground hover:text-foreground w-full justify-start px-0"
      >
        <Plus className="h-4 w-4" />
        Ajouter une tâche
      </Button>
    );
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-3 pt-1">
      <input type="hidden" name="projectId" value={projectId} />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="task-title">Tâche</Label>
        <Input
          id="task-title"
          name="title"
          placeholder="Ex : Envoyer le logo en SVG"
          required
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="task-desc">
          Description{" "}
          <span className="font-normal text-muted-foreground">(optionnel)</span>
        </Label>
        <Input
          id="task-desc"
          name="description"
          placeholder="Instructions pour le client…"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <Button type="submit" size="sm">Ajouter</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
          Annuler
        </Button>
      </div>
    </form>
  );
}

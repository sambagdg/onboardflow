"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProject } from "@/app/actions";
import { cn } from "@/lib/utils";

export function EditProjectDialog({
  id,
  clientName,
  description,
}: {
  id: string;
  clientName: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await updateProject(formData);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-8 w-8 text-muted-foreground",
        )}
        aria-label="Modifier le projet"
      >
        <Pencil className="h-3.5 w-3.5" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier l&apos;espace client</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="flex flex-col gap-4 mt-2">
          <input type="hidden" name="id" value={id} />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-clientName">Nom du client</Label>
            <Input
              id="edit-clientName"
              name="clientName"
              defaultValue={clientName}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-description">
              Description{" "}
              <span className="font-normal text-muted-foreground">
                (optionnel)
              </span>
            </Label>
            <Input
              id="edit-description"
              name="description"
              defaultValue={description ?? ""}
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

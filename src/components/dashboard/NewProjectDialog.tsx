"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject } from "@/app/actions";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewProjectDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* DialogTrigger Base UI — className avec buttonVariants, pas asChild */}
      <DialogTrigger className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}>
        <Plus className="h-4 w-4" />
        Nouveau client
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvel espace client</DialogTitle>
        </DialogHeader>

        {/* Server Action directement dans le form — fonctionne depuis un Client Component */}
        <form action={createProject} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clientName">Nom du client</Label>
            <Input
              id="clientName"
              name="clientName"
              placeholder="Ex : Acme Corp"
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">
              Description{" "}
              <span className="font-normal text-muted-foreground">(optionnel)</span>
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Contexte du projet, notes internes…"
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
            <Button type="submit">Créer l&apos;espace</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

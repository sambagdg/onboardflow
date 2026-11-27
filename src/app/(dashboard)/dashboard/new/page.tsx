import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { createProject } from "@/app/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-xl">
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2 mb-8 gap-1.5 rounded-full")}
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les clients
      </Link>

      <h1 className="text-3xl font-semibold tracking-[-0.03em]">Nouvel espace client</h1>
      <p className="mb-8 mt-1 text-[15px] text-muted-foreground">
        Le nom et la description sont visibles par votre client.
      </p>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{decodeURIComponent(error as string)}</AlertDescription>
        </Alert>
      )}

      <form action={createProject} className="flex flex-col gap-5 rounded-2xl border p-6 sm:p-7">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="clientName">Nom du client</Label>
          <Input
            id="clientName"
            type="text"
            name="clientName"
            placeholder="Ex : Acme Corp"
            required
            autoFocus
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description">
            Description <span className="font-normal text-muted-foreground">(optionnel)</span>
          </Label>
          <Input
            id="description"
            name="description"
            placeholder="Contexte du projet, notes internes…"
            className="h-10"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost" }), "h-10 rounded-full px-4")}>
            Annuler
          </Link>
          <Button type="submit" className="h-10 rounded-full px-5">
            Créer l&apos;espace
          </Button>
        </div>
      </form>
    </div>
  );
}

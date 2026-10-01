import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { createProject } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-xl mx-auto">
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 mb-6 -ml-2")}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Nouvel espace client</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Créez un espace d&apos;onboarding dédié avec checklist et lien partageable.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Informations du client</CardTitle>
          <CardDescription>Ces informations seront visibles par votre client.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{decodeURIComponent(error as string)}</AlertDescription>
            </Alert>
          )}

          <form action={createProject} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="clientName">Nom du client</Label>
              <Input
                id="clientName"
                type="text"
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

            <div className="flex items-center gap-2 pt-1">
              <Button type="submit">Créer l&apos;espace</Button>
              <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
                Annuler
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

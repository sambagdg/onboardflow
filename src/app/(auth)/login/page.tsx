import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { login } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-col gap-8">
      <div data-reveal>
        <h1 className="mb-2 text-3xl font-semibold tracking-[-0.03em]">Bon retour.</h1>
        <p className="text-[15px] text-muted-foreground">Connectez-vous pour retrouver vos espaces clients.</p>
      </div>

      {error && (
        <Alert variant="destructive" data-reveal>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{decodeURIComponent(error as string)}</AlertDescription>
        </Alert>
      )}

      <form action={login} data-reveal className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="vous@agence.com"
            required
            autoComplete="email"
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            className="h-10"
          />
        </div>

        <Button type="submit" className="mt-2 h-10 w-full rounded-full">
          Se connecter
        </Button>
      </form>

      <p data-reveal className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}

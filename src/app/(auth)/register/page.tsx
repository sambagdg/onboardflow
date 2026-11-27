import Link from "next/link";
import { AlertCircle, Mail } from "lucide-react";
import { register } from "@/app/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const { error, confirm } = await searchParams;

  /* ── Écran de confirmation email ── */
  if (confirm) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div data-reveal className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted/50">
          <Mail className="h-6 w-6 text-primary" strokeWidth={1.75} />
        </div>
        <div data-reveal>
          <h1 className="mb-2 text-3xl font-semibold tracking-[-0.03em]">Vérifiez vos emails.</h1>
          <p className="text-balance text-[15px] leading-relaxed text-muted-foreground">
            Un lien de confirmation vient d&apos;être envoyé à votre adresse. Cliquez dessus pour activer
            votre compte.
          </p>
        </div>
        <Link
          href="/login"
          data-reveal
          className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-5")}
        >
          Retour à la connexion
        </Link>
      </div>
    );
  }

  /* ── Formulaire d'inscription ── */
  return (
    <div className="flex flex-col gap-8">
      <div data-reveal>
        <h1 className="mb-2 text-3xl font-semibold tracking-[-0.03em]">Créez votre compte.</h1>
        <p className="text-[15px] text-muted-foreground">Votre premier espace client sera prêt en quelques minutes.</p>
      </div>

      {error && (
        <Alert variant="destructive" data-reveal>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{decodeURIComponent(error as string)}</AlertDescription>
        </Alert>
      )}

      <form action={register} data-reveal className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email professionnel</Label>
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
            placeholder="8 caractères minimum"
            required
            minLength={8}
            autoComplete="new-password"
            className="h-10"
          />
        </div>

        <Button type="submit" className="mt-2 h-10 w-full rounded-full">
          Créer mon compte
        </Button>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          En créant un compte, vous acceptez nos{" "}
          <a href="#" className="underline underline-offset-2 transition-colors hover:text-foreground">CGU</a>
          {" "}et notre{" "}
          <a href="#" className="underline underline-offset-2 transition-colors hover:text-foreground">
            politique de confidentialité
          </a>
          .
        </p>
      </form>

      <p data-reveal className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}

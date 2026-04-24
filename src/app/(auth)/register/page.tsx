import Link from "next/link";
import { register } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const { error, confirm } = await searchParams;

  /* ── Écran de confirmation email ── */
  if (confirm) {
    return (
      <Card className="shadow-md text-center">
        <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-lg mb-1">Vérifiez votre boîte mail</h2>
            <p className="text-sm text-muted-foreground">
              Un lien de confirmation a été envoyé à votre adresse.
              Cliquez dessus pour activer votre compte.
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "mt-2")}>
            Retour à la connexion
          </Link>
        </CardContent>
      </Card>
    );
  }

  /* ── Formulaire d'inscription ── */
  return (
    <Card className="shadow-md">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">Créer un compte</CardTitle>
        <CardDescription>
          Commencez à onboarder vos clients en quelques minutes
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {decodeURIComponent(error as string)}
            </AlertDescription>
          </Alert>
        )}

        <form action={register} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email professionnel</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="vous@agence.com"
              required
              autoComplete="email"
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
            />
          </div>

          <Button type="submit" className="w-full mt-1">
            Créer mon compte
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          En créant un compte, vous acceptez nos{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">CGU</a>
          {" "}et notre{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">
            politique de confidentialité
          </a>.
        </p>

        <p className="text-center text-sm text-muted-foreground border-t pt-4">
          Déjà un compte ?{" "}
          <Link href="/login" className={cn(buttonVariants({ variant: "link" }), "p-0 h-auto text-sm")}>
            Se connecter
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

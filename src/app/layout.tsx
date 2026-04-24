import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

/* Police principale — Geist est la font par défaut de shadcn/ui */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnboardFlow — Onboarding client simplifié",
  description:
    "Créez un espace d'onboarding unique par client. Collectez documents et validations en temps réel.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * suppressHydrationWarning est requis par next-themes :
     * il évite l'avertissement React quand next-themes injecte
     * la classe "dark" côté serveur vs client.
     */
    <html lang="fr" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/*
         * ThemeProvider de next-themes :
         * - attribute="class" → ajoute/retire la classe "dark" sur <html>
         * - defaultTheme="system" → respecte la préférence système par défaut
         * - enableSystem → active la détection automatique
         * - disableTransitionOnChange → évite le flash de transition au changement
         */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

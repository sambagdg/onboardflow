import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header minimal avec logo + toggle thème */}
      <header className="h-14 flex items-center justify-between px-6 border-b">
        <Link href="/" className="font-bold text-base tracking-tight">
          OnboardFlow
        </Link>
        <ThemeToggle />
      </header>

      {/* Contenu centré */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}

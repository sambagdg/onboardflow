import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06090F] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-[#1A2840]">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-sky-400/5 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #1A2840 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Logo */}
        <Link
          href="/"
          className="relative text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Onboard<span className="text-sky-400">Flow</span>
        </Link>

        {/* Testimonial */}
        <div className="relative">
          <blockquote className="text-lg text-slate-300 leading-relaxed mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            "OnboardFlow a réduit de 3 semaines à 3 jours notre processus
            d'onboarding. Nos clients adorent la simplicité."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-sky-400/15 border border-sky-400/30 flex items-center justify-center">
              <span className="text-xs font-bold text-sky-400">ML</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Marie Laurent</p>
              <p className="text-xs text-slate-500">Directrice, Agence Momentum</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { value: "200+", label: "Agences" },
            { value: "12k+", label: "Clients onboardés" },
            { value: "98%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-[#1A2840] bg-[#0D1424]/60 p-4 text-center">
              <p className="text-xl font-bold text-sky-400 mb-0.5" style={{ fontFamily: "var(--font-syne)" }}>
                {s.value}
              </p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Mobile logo */}
        <Link
          href="/"
          className="lg:hidden mb-8 text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Onboard<span className="text-sky-400">Flow</span>
        </Link>
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}

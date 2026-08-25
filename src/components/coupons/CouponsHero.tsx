export function CouponsHero() {
  return (
    <section className="relative pt-32 pb-14 overflow-hidden border-b border-[#222]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 30%, rgba(236,72,153,0.45), transparent 70%), radial-gradient(35% 30% at 70% 60%, rgba(236,72,153,0.25), transparent 75%)",
          filter: "blur(20px)",
        }}
      />
      <div className="grid-lines" />
      <div className="relative max-w-7xl mx-auto px-6">
        <nav className="text-xs text-[#888] mb-6" aria-label="Breadcrumb">
          <a href="/" className="hover:text-white">Home</a>
          <span className="mx-2 text-[#444]">/</span>
          <span className="text-white/80">Coupons</span>
        </nav>
        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
          Prop Firm <span className="text-gradient">Discount Codes</span>
        </h1>
        <p className="mt-4 text-[#888] text-base md:text-lg max-w-2xl">
          Verified codes, checked regularly. No expired promo pages wasting your time.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2a2a2a] text-xs text-white/90">
            <span className="text-[#00d97e]">✓</span> Verified & Working Codes
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2a2a2a] text-xs text-white/90">
            <span className="text-[#00d97e]">✓</span> Updated Weekly
          </span>
        </div>
      </div>
    </section>
  );
}
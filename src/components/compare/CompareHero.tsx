export function CompareHero() {
  return (
    <section className="relative pt-32 pb-14 overflow-hidden border-b border-[#222]">
      <div className="hero-bloom opacity-50" />
      <div className="grid-lines" />
      <div className="relative max-w-7xl mx-auto px-6">
        <nav className="text-xs text-[#888] mb-6" aria-label="Breadcrumb">
          <a href="/" className="hover:text-white">Home</a>
          <span className="mx-2 text-[#444]">/</span>
          <span className="text-white/80">Compare</span>
        </nav>
        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
          Compare Prop Firms <span className="text-gradient">Side by Side</span>
        </h1>
        <p className="mt-4 text-[#888] text-base md:text-lg max-w-2xl">
          Cut through the noise. Compare funding, rules, fees and payouts across all major prop firms in one place.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2a2a2a] text-xs text-[#888]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d97e]" /> Updated January 2025
        </div>
      </div>
    </section>
  );
}
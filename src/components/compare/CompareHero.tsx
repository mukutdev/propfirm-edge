export function CompareHero() {
  return (
    <section className="relative pt-28 pb-10 overflow-hidden border-b border-[#222]">
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
          Real evaluation rules, real payout terms — no guesswork before you commit capital.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2a2a2a] text-xs text-[#888]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d97e] animate-pulse" /> Updated January 2025
          </div>
          <a href="#compare-table" className="text-xs px-3 py-1.5 rounded-full border border-[#2a2a2a] text-white/80 hover:border-[#7c3aed] hover:text-white transition">Browse all firms →</a>
          <a href="#custom-compare" className="text-xs px-3 py-1.5 rounded-full border border-[#2a2a2a] text-white/80 hover:border-[#7c3aed] hover:text-white transition">Build custom comparison →</a>
          <a href="#methodology" className="text-xs px-3 py-1.5 rounded-full border border-[#2a2a2a] text-white/80 hover:border-[#7c3aed] hover:text-white transition">How we rate →</a>
        </div>
      </div>
    </section>
  );
}
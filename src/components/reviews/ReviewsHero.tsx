export function ReviewsHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden border-b border-[#222]">
      <div className="hero-bloom opacity-60" />
      <div className="grid-lines" />
      <div className="relative max-w-7xl mx-auto px-6">
        <nav className="text-xs text-[#888] mb-6" aria-label="Breadcrumb">
          <a href="/" className="hover:text-white">Home</a>
          <span className="mx-2 text-[#444]">/</span>
          <span className="text-white/80">Reviews</span>
        </nav>
        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
          Prop Firm <span className="text-gradient">Reviews</span>
        </h1>
        <p className="mt-4 text-[#888] text-base md:text-lg max-w-2xl">
          We test and review every major prop firm so you don't have to.
          Real accounts. Honest ratings. No bias.
        </p>
      </div>
    </section>
  );
}
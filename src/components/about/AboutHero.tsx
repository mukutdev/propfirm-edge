export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#1a1a1a] bg-[#080808] px-4 pt-28 pb-24 sm:pt-36 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #4c1d95, transparent)" }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <nav className="text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
          <span className="mx-2 opacity-60">/</span>
          <span className="text-foreground">About</span>
        </nav>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Built by a Trader. For Traders.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          No paid placements. No recycled rankings. Just reviews written by someone who actually runs the evaluations, hits the drawdown, and pulls the payouts.
        </p>
      </div>
    </section>
  );
}
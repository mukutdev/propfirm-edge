export function NewsHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#1a1a1a] bg-[#080808] px-4 pt-28 pb-24 sm:pt-36 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #312e81, transparent)" }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <nav className="text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2 opacity-60">/</span>
            <span className="text-foreground">News</span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live Updates
          </div>
        </div>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Markets &amp; Trading News
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Stay ahead of the markets. Latest futures, forex and prop firm industry news updated daily.
        </p>
      </div>
    </section>
  );
}
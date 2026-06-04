export function NewsletterCTA() {
  return (
    <section className="px-4 py-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-purple-500/20 bg-[#141414] p-8 text-center sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 0%, #7C3AED, transparent 60%)" }}
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Never Miss a Market Move</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Daily trading news, prop firm updates and market analysis — straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-6 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 rounded-lg border border-[#2a2a2a] bg-[#0c0c0c] px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none"
            />
            <button className="rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Subscribe Free
            </button>
          </form>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            {["✓ Daily updates", "✓ No spam", "✓ Free forever"].map((t) => (
              <span key={t} className="rounded-full border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-1 text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
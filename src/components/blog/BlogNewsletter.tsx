export function BlogNewsletter() {
  return (
    <section className="px-4 py-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-purple-500/20 bg-[#141414] p-8 text-center sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 0%, #EC4899, transparent 60%)" }}
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Level Up Your Trading</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Get our best guides, prop firm tips and exclusive deals delivered weekly.
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
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">Join 1,200+ traders. No spam ever.</p>
        </div>
      </div>
    </section>
  );
}
export function FeaturedGuideBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#1C1A2E] to-[#141414] p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 4s linear infinite",
        }}
      />
      <style>{`@keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }`}</style>
      <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-3xl shadow-[0_0_30px_-5px_rgba(236,72,153,0.6)]">
          🎯
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">New to Prop Trading?</h3>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Start with our complete beginner's roadmap — everything from choosing a firm to getting your first payout.
          </p>
        </div>
        <a
          href="#"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Read the Beginner's Roadmap →
        </a>
      </div>
    </section>
  );
}
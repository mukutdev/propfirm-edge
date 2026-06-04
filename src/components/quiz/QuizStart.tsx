export function QuizStart({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,58,237,0.6), transparent 70%), radial-gradient(closest-side, rgba(236,72,153,0.4), transparent 70%)",
        }}
      />
      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-purple-400/60"
            style={{
              top: `${(i * 73) % 100}%`,
              left: `${(i * 41) % 100}%`,
              animation: `qfloat ${5 + (i % 5)}s ease-in-out ${i * 0.4}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>{`@keyframes qfloat { from { transform: translateY(0); opacity: 0.3; } to { transform: translateY(-30px); opacity: 0.9; } }`}</style>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Free Tool
        </span>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Find Your Perfect Prop Firm
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          Answer 7 quick questions and we'll match you with the best prop firm for your trading style, experience level and goals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm text-muted-foreground sm:gap-8">
          <div className="flex items-center gap-2"><span>⚡</span> Takes 60 seconds</div>
          <div className="flex items-center gap-2"><span>🎯</span> Personalised results</div>
          <div className="flex items-center gap-2"><span>💰</span> Exclusive discount included</div>
        </div>
        <button
          onClick={onStart}
          className="group mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-8 py-4 text-base font-bold text-white shadow-[0_0_60px_-10px_rgba(124,58,237,0.7)] transition hover:scale-[1.02] hover:shadow-[0_0_80px_-10px_rgba(236,72,153,0.8)]"
        >
          Start The Quiz
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </section>
  );
}
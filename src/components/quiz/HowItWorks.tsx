const steps = [
  { n: 1, title: "Answer 7 quick questions", sub: "Takes about 60 seconds." },
  { n: 2, title: "Get your personalised firm match", sub: "We analyse your answers and rank the best fits." },
  { n: 3, title: "Sign up with an exclusive discount", sub: "Use our negotiated code for instant savings." },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col items-center gap-3 rounded-2xl border border-[#222] bg-[#141414] p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] font-display text-xl font-bold text-white shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)]">
                {s.n}
              </div>
              <h3 className="font-display text-lg font-bold text-white">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
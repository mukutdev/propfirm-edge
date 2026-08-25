const pills = ["✓ Verified Traders Only", "✓ Moderated Before Publishing", "✓ No Firm Pays For Placement"];

export function SubmitReviewIntro() {
  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Share Your <span className="text-gradient">Experience</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Real reviews from real traders. Help others make informed decisions about which prop firm to trade with.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {pills.map((p) => (
            <span key={p} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    title: "Why We Moderate",
    body: "Every review is checked before it goes live to prevent spam and fake submissions.",
  },
  {
    title: "Why We're Different",
    body: "We don't let firms pay to remove or suppress negative reviews.",
  },
  {
    title: "Your Impact",
    body: "Real reviews help other traders avoid firms with bad payout practices.",
  },
];

export function WhyReviewsMatter() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-6 sm:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

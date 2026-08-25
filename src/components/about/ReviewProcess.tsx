const steps = [
  { icon: "💳", title: "We Open a Real Account", body: "We buy the evaluation, hit the profit target, and trade through the funded account ourselves — the exact gauntlet you'd run." },
  { icon: "🧪", title: "We Test the Rules", body: "Trailing vs. static drawdown, consistency caps, payout splits, scaling plan triggers — we verify every rule against the live account." },
  { icon: "✍️", title: "We Write the Honest Review", body: "No sugarcoating. If the drawdown model is brutal or payouts get stalled, we say it — even for affiliate partners." },
  { icon: "🔄", title: "We Keep It Updated", body: "Firms tweak challenge fees, swap drawdown types, and revise scaling plans. We re-run every review monthly so the numbers match what you'll actually sign." },
];

export function ReviewProcess() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold text-white sm:text-4xl">Our Review Process</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base text-muted-foreground">
          Every firm goes through the same four-step process before it ever appears on the site.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="group relative flex gap-4 rounded-2xl border border-[#222] border-l-2 border-l-purple-500/60 bg-[#141414] p-6 transition hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_10px_40px_-15px_rgba(124,58,237,0.5)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-xl shadow-[0_0_25px_-5px_rgba(124,58,237,0.6)]">
                {s.icon}
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-purple-300">Step {i + 1}</div>
                <h3 className="mt-1 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useReveal } from "@/hooks/use-reveal";

const items = [
  {
    k: "01",
    title: "10+ years in the futures market",
    body: "Every review is written by an active trader, not a content agency.",
  },
  {
    k: "02",
    title: "Funded with real capital",
    body: "We buy the evaluations, hit the targets and request the payouts ourselves.",
  },
  {
    k: "03",
    title: "No pay-to-rank, ever",
    body: "Affiliate deals never move a score. Firms can't buy a better ranking.",
  },
  {
    k: "04",
    title: "Re-checked when rules change",
    body: "Drawdown tweaks and payout changes are updated within days, not months.",
  },
];

export function WhyTrustUs() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-14 md:py-20" aria-label="Why trust us">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#888]">Why Trust Us</p>
            <h2 className="mt-5 font-display font-bold text-4xl md:text-5xl leading-[1.03]">
              Built by a <span className="text-gradient">trader.</span>
              <br />
              Not a marketer.
            </h2>
            <p className="mt-5 text-[#888] max-w-sm leading-relaxed">
              This site exists because every other &ldquo;top 10 prop firms&rdquo; list was written by
              someone who has never taken a payout.
            </p>
            <div className="mt-7 flex gap-8">
              <div>
                <p className="font-display font-bold text-3xl text-gradient">11</p>
                <p className="text-xs text-[#888] mt-1">Firms tested live</p>
              </div>
              <div>
                <p className="font-display font-bold text-3xl text-gradient">$0</p>
                <p className="text-xs text-[#888] mt-1">Paid for reviews</p>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-[#1e1e1e] border-y border-[#1e1e1e]">
            {items.map((it) => (
              <li
                key={it.k}
                className="group relative flex gap-5 md:gap-7 py-6 pl-4 transition-colors duration-300 hover:bg-[#111]"
              >
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-brand scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                <span className="font-mono text-sm text-[#555] group-hover:text-[#ec4899] transition-colors pt-1">
                  {it.k}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl">{it.title}</h3>
                  <p className="mt-1.5 text-sm md:text-base text-[#888] leading-relaxed">{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

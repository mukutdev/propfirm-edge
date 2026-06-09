import { BarChart3, Search, DollarSign, Star } from "lucide-react";

const criteria = [
  { icon: BarChart3, title: "Tested with real funded accounts", body: "Every firm gets a live evaluation and a funded account before we publish." },
  { icon: Search, title: "Rules verified monthly", body: "Drawdown, daily loss and payout rules are re-checked at the start of each month." },
  { icon: DollarSign, title: "Fees checked against current pricing", body: "Prices are sourced directly from the firm's checkout, not stale marketing pages." },
  { icon: Star, title: "Ratings based on 10+ criteria", body: "Payout reliability, rule fairness, support, platform and value all feed the score." },
];

export function Methodology() {
  return (
    <section id="methodology" className="py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="font-display font-bold text-3xl md:text-4xl gradient-underline">How We Compare Prop Firms</h2>
          <p className="text-[#888] mt-5 leading-relaxed max-w-md">
            Our ratings exist to save you weeks of evaluation fees. We hold ourselves to a stricter standard than the firms we cover.
          </p>
        </div>

        <div className="card-surface p-7 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-brand" />
          <div className="grid sm:grid-cols-2 gap-6">
            {criteria.map((c) => (
              <div key={c.title} className="flex gap-3">
                <div className="h-9 w-9 shrink-0 rounded-lg bg-[#1f1f1f] border border-[#2a2a2a] flex items-center justify-center text-[#c4a8ff]">
                  <c.icon size={16} />
                </div>
                <div>
                  <div className="font-display font-semibold text-sm">{c.title}</div>
                  <p className="text-xs text-[#888] mt-1 leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { BarChart3, Search, DollarSign, Star } from "lucide-react";

const criteria = [
  { icon: BarChart3, title: "We test with real funded accounts", body: "Every firm is taken through its own evaluation and paid out before we publish a score." },
  { icon: Search, title: "Rules re-verified whenever a firm updates their terms", body: "Drawdown model, daily loss and consistency rules are re-read the day the firm changes them." },
  { icon: DollarSign, title: "Fees cross-checked against the firm's live pricing page", body: "Monthly and reset costs come from the firm's own checkout, never stale marketing copy." },
  { icon: Star, title: "Ratings weighted across rules, payouts, platform, and support", body: "Payout reliability carries the most weight; rule fairness, platform quality and support follow." },
];

export function Methodology() {
  return (
    <section id="methodology" className="py-14 scroll-mt-24">
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
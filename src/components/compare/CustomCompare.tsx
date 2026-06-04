import { useMemo, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import { compareFirms } from "@/lib/compare-data";

const slots = [0, 1, 2, 3] as const;

const statRows = [
  { label: "Max Account", key: "maxFunding" as const },
  { label: "Profit Split", key: "split" as const, positive: true },
  { label: "Challenge Fee", key: "fee" as const },
  { label: "Drawdown Type", key: "drawdownType" as const },
  { label: "Daily Loss", key: "dailyLoss" as const },
  { label: "Trailing Stop", key: "trailingStop" as const },
  { label: "Min Trading Days", key: "minDays" as const },
  { label: "Payout Speed", key: "payoutSpeed" as const },
];

export function CustomCompare() {
  const [selected, setSelected] = useState<(string | "")[]>(["Apex Trader Funding", "MyFundedFutures", "", ""]);
  const [showResults, setShowResults] = useState(true);

  const chosen = selected
    .map((name) => compareFirms.find((f) => f.name === name))
    .filter(Boolean) as typeof compareFirms;

  const maxRating = useMemo(() => Math.max(...chosen.map((c) => c.rating), 0), [chosen]);

  const updateSlot = (i: number, name: string) => {
    setSelected((prev) => prev.map((v, idx) => (idx === i ? name : v)));
  };

  return (
    <section className="bg-[#0a0a0a] border-y border-[#222] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl">Build Your Own Comparison</h2>
          <p className="mt-3 text-[#888]">Select up to 4 firms to compare head to head.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {slots.map((i) => (
            <div key={i} className="relative">
              <label className="block text-[10px] uppercase tracking-wider text-[#888] mb-1.5">Firm {i + 1}</label>
              <select
                value={selected[i]}
                onChange={(e) => updateSlot(i, e.target.value)}
                className="w-full bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7c3aed]"
              >
                <option value="">Select Firm {i + 1}</option>
                {compareFirms.map((f) => (
                  <option key={f.name} value={f.name} className="bg-[#141414]">{f.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button onClick={() => setShowResults(true)} className="btn-gradient text-sm">Compare Selected</button>
          <button onClick={() => { setSelected(["", "", "", ""]); setShowResults(false); }} className="btn-ghost text-sm">
            Clear Selection
          </button>
        </div>

        {showResults && chosen.length >= 2 && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
            {chosen.map((firm) => {
              const isBest = firm.rating === maxRating;
              return (
                <div
                  key={firm.name}
                  className={`card-surface p-6 flex flex-col ${
                    isBest ? "border-[#7c3aed]/70 shadow-[0_0_0_1px_rgba(124,58,237,0.5),0_0_30px_-5px_rgba(124,58,237,0.5)]" : ""
                  }`}
                >
                  <div className="h-12 w-full rounded-md bg-[#1C1C1C] border border-[#222] flex items-center justify-center text-xs font-semibold text-white/80 mb-4">
                    {firm.name}
                  </div>
                  <div className="font-display font-bold text-lg">{firm.name}</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Star size={14} className="fill-[#facc15] text-[#facc15]" />
                    <span className="text-sm font-semibold">{firm.rating.toFixed(1)} / 5</span>
                  </div>

                  <dl className="mt-5 space-y-2.5 text-sm">
                    {statRows.map((r) => (
                      <div key={r.key} className="flex justify-between gap-2 py-1.5 border-b border-[#222]">
                        <dt className="text-[11px] uppercase tracking-wider text-[#888]">{r.label}</dt>
                        <dd className={`font-medium text-right ${r.positive ? "text-[#00d97e]" : "text-white/90"}`}>
                          {String((firm as Record<string, unknown>)[r.key] ?? "—")}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <a href="#" className="btn-gradient w-full mt-6 text-sm py-2.5">
                    Visit <ExternalLink size={12} />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
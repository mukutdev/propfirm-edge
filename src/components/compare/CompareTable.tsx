import { useMemo } from "react";
import { Star } from "lucide-react";
import { compareFirms } from "@/lib/compare-data";

export function CompareTable() {
  const rows = useMemo(
    () =>
      [...compareFirms].sort(
        (a, b) => Number(!!b.topPick) - Number(!!a.topPick) || b.rating - a.rating,
      ),
    [],
  );

  return (
    <section id="compare-table" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-24">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl">All Prop Firms</h2>
          <p className="text-sm text-[#888] mt-1">Sorted by rating. Top pick highlighted.</p>
        </div>
        <p className="text-xs text-[#888] md:hidden">Swipe left to see more →</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#222]">
        <table className="w-full text-sm border-collapse" style={{ minWidth: 880 }}>
          <thead>
            <tr className="bg-gradient-brand text-white">
              <th className="sticky left-0 z-20 bg-[#7C3AED] text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">
                Prop Firm
              </th>
              <th className="text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">Rating</th>
              <th className="text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">Max Account</th>
              <th className="text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">Challenge Fee</th>
              <th className="text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">Profit Split</th>
              <th className="text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">Payout Speed</th>
              <th className="text-right font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((firm, i) => {
              const baseBg = firm.topPick ? "bg-[#1C1A2E]" : i % 2 === 0 ? "bg-[#141414]" : "bg-[#1a1a1a]";
              return (
                <tr
                  key={firm.name}
                  className={`group transition-colors ${baseBg} hover:bg-[#1E1E1E] ${
                    firm.topPick ? "border-l-2 border-[#7c3aed]" : ""
                  }`}
                >
                  <td className={`sticky left-0 z-10 ${baseBg} group-hover:bg-[#1E1E1E] px-5 py-4 border-r border-[#222]`}>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-md bg-[#1C1C1C] border border-[#222] flex items-center justify-center text-[9px] font-semibold text-white/70 text-center px-1">
                        {firm.name.split(" ")[0]}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-sm">{firm.name}</div>
                        {firm.topPick && (
                          <span className="text-[9px] uppercase tracking-wider text-[#c4a8ff]">⭐ Top Pick</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="fill-[#facc15] text-[#facc15]" />
                      <span className="font-display font-bold text-sm">{firm.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-white/90 font-medium">{firm.maxFunding}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-white/90">{firm.fee}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-[#00d97e] font-semibold">{firm.split}</td>
                  <td className={`px-5 py-4 whitespace-nowrap ${firm.payoutSpeedDays <= 2 ? "text-[#00d97e] font-semibold" : "text-white/90"}`}>
                    {firm.payoutSpeed}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex gap-2">
                      <a
                        href={`/reviews/${firm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="btn-ghost text-[11px] py-1.5 px-3"
                      >
                        Review
                      </a>
                      <a href="#" className="btn-gradient text-[11px] py-1.5 px-3">Visit</a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-xs text-[#888]">All data verified by our team. Last checked January 2025.</p>
    </section>
  );
}
import { comparisonRows } from "@/lib/home-data";
import { useReveal } from "@/hooks/use-reveal";

const cols = ["Firm Name", "Max Account", "Profit Split", "Drawdown Type", "Futures Allowed", "Our Rating"];

export function ComparisonTable() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="compare" className="py-24 md:py-32" aria-label="Comparison table preview">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl gradient-underline">
            See How The Top Firms Stack Up
          </h2>
          <p className="mt-4 text-[#888] max-w-xl">
            A quick at-a-glance side-by-side. The full comparison includes every rule, payout schedule, and platform.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#222]">
          <table className="min-w-[760px] w-full text-sm">
            <thead>
              <tr className="bg-[#111]">
                {cols.map((c) => (
                  <th key={c} className="text-left font-display font-semibold text-white/90 px-5 py-4 text-xs uppercase tracking-wider">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((r, i) => (
                <tr
                  key={r.firm}
                  className={`${i % 2 === 0 ? "bg-[#141414]" : "bg-[#1a1a1a]"} ${
                    r.highlight ? "border-l-2 border-[#7c3aed]" : ""
                  }`}
                >
                  <td className="px-5 py-4 font-semibold">{r.firm}</td>
                  <td className="px-5 py-4 text-white/90">{r.maxAccount}</td>
                  <td className="px-5 py-4 text-white/90">{r.split}</td>
                  <td className="px-5 py-4 text-white/90">{r.drawdown}</td>
                  <td className="px-5 py-4 text-[#00d97e]">{r.futures}</td>
                  <td className="px-5 py-4 text-gradient font-semibold">{r.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#" className="btn-gradient">View Full Comparison</a>
        </div>
      </div>
    </section>
  );
}
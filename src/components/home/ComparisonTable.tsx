import { Link } from "@tanstack/react-router";
import { Trophy, Star } from "lucide-react";
import { comparisonRows, reviewFirms } from "@/lib/home-data";
import { MatchupBuilder } from "@/components/home/MatchupBuilder";
import { useReveal } from "@/hooks/use-reveal";

const cols = ["Firm Name", "Max Account", "Profit Split", "Drawdown Type", "Futures Allowed", "Our Rating"];

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function initials(name: string) {
  return name
    .replace(/\.com/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ComparisonTable() {
  const ref = useReveal<HTMLDivElement>();
  const top3 = comparisonRows.slice(0, 3);
  const rest = comparisonRows.slice(3);
  const firmCount = reviewFirms.length;

  return (
    <section id="compare" className="py-14 md:py-20" aria-label="Comparison table preview">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl gradient-underline">
            See How the Top Firms Stack Up
          </h2>
          <p className="mt-3 flex items-center gap-2 text-sm text-[#888]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d97e] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d97e]" />
            </span>
            Live rankings updated as firm terms change — no stale data.
          </p>
        </div>

        {/* Top 3 as comparison cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {top3.map((r, i) => (
            <div
              key={r.firm}
              className={`rounded-xl border bg-[#141414] p-5 transition-transform hover:-translate-y-1 ${
                i === 0 ? "border-[#7c3aed]/60 glow-pulse md:-mt-2 md:pb-7" : "border-[#222]"
              }`}
            >
              {i === 0 && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <Trophy size={11} /> #1 Ranked
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-brand font-display text-xs font-bold text-white">
                  {initials(r.firm)}
                </span>
                <div className="min-w-0">
                  <Link
                    to="/reviews/$slug"
                    params={{ slug: slugify(r.firm) }}
                    className="block truncate font-display font-bold text-white hover:text-[#c4a8ff]"
                  >
                    {r.firm}
                  </Link>
                  <span className="flex items-center gap-1 text-xs text-[#facc15]">
                    <Star size={11} className="fill-[#facc15]" /> {r.rating}
                  </span>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-[#222] pt-4 text-center">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[#777]">Max</dt>
                  <dd className="mt-1 font-mono text-sm text-white">{r.maxAccount}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[#777]">Split</dt>
                  <dd className="mt-1 font-mono text-sm text-[#5cf3ad]">{r.split}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[#777]">Drawdown</dt>
                  <dd className="mt-1 text-[11px] text-white/85">{r.drawdown}</dd>
                </div>
              </dl>

              <Link
                to="/reviews/$slug"
                params={{ slug: slugify(r.firm) }}
                className={`mt-4 block rounded-full py-2 text-center text-xs font-semibold transition-colors ${
                  i === 0
                    ? "bg-gradient-brand text-white"
                    : "border border-[#2a2a2a] text-white/85 hover:border-[#7c3aed]"
                }`}
              >
                Read Review
              </Link>
            </div>
          ))}
        </div>

        {/* Remaining firms in condensed table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-[#222]">
          <table className="min-w-[760px] w-full text-sm">
            <thead>
              <tr className="bg-[#111]">
                {cols.map((c) => (
                  <th key={c} className="text-left font-display font-semibold text-white/90 px-5 py-3.5 text-xs uppercase tracking-wider">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rest.map((r, i) => (
                <tr key={r.firm} className={i % 2 === 0 ? "bg-[#141414]" : "bg-[#1a1a1a]"}>
                  <td className="px-5 py-3.5 font-semibold">
                    <Link to="/reviews/$slug" params={{ slug: slugify(r.firm) }} className="hover:text-[#c4a8ff]">
                      {r.firm}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-white/90">{r.maxAccount}</td>
                  <td className="px-5 py-3.5 font-mono text-white/90">{r.split}</td>
                  <td className="px-5 py-3.5 text-white/90">{r.drawdown}</td>
                  <td className="px-5 py-3.5 text-[#00d97e]">{r.futures}</td>
                  <td className="px-5 py-3.5 text-gradient font-semibold">{r.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/compare" className="btn-gradient">View Full Comparison</Link>
          <span className="inline-flex items-center gap-2 text-xs text-[#888]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d97e] shadow-[0_0_6px_1px_rgba(0,217,126,0.6)]" />
            Comparing {firmCount} firms
          </span>
        </div>

        <MatchupBuilder />
      </div>
    </section>
  );
}

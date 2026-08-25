import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Star, ArrowUpDown, Loader2 } from "lucide-react";
import { listCompareFirms, type CompareFirmRow } from "@/lib/compare.functions";

const assetPills = ["All", "Futures", "Forex", "Crypto", "Stocks"] as const;

type ColKey = "maxFunding" | "profitSplit" | "fee" | "drawdownType" | "payoutSpeed" | "rating";

const columns: { key: ColKey; label: string; sortKey: string; align?: string }[] = [
  { key: "rating", label: "Our Rating", sortKey: "rating" },
  { key: "maxFunding", label: "Max Funding", sortKey: "maxFunding" },
  { key: "profitSplit", label: "Profit Split", sortKey: "profitSplit" },
  { key: "fee", label: "Monthly Fee", sortKey: "fee" },
  { key: "drawdownType", label: "Drawdown Type", sortKey: "drawdownType" },
  { key: "payoutSpeed", label: "Payout Speed", sortKey: "payoutSpeed" },
];

function cellValue(firm: CompareFirmRow, key: ColKey) {
  switch (key) {
    case "maxFunding":
      return firm.maxAccount;
    case "profitSplit":
      return firm.profitSplit;
    case "fee":
      return firm.monthlyFee;
    case "drawdownType":
      return firm.drawdownType;
    case "payoutSpeed":
      return firm.payoutSpeed;
    default:
      return firm.rating.toFixed(1);
  }
}

export function CompareTable() {
  const fetchFirms = useServerFn(listCompareFirms);
  const [asset, setAsset] = useState<string>("All");
  const [sortKey, setSortKey] = useState("rating");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [visible, setVisible] = useState<Record<ColKey, boolean>>({
    rating: true,
    maxFunding: true,
    profitSplit: true,
    fee: true,
    drawdownType: true,
    payoutSpeed: true,
  });

  const { data, isPending, isError } = useQuery({
    queryKey: ["compare-firms", asset, sortKey, dir],
    queryFn: () => fetchFirms({ data: { asset, sortKey, dir } }),
  });

  const rows = data ?? [];
  const shown = columns.filter((c) => visible[c.key]);

  function toggleSort(key: string) {
    if (sortKey === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setDir("desc");
    }
  }

  return (
    <section id="compare-table" className="max-w-7xl mx-auto px-6 py-14 scroll-mt-24">
      <div className="mb-5 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl">Every Firm, Same Yardstick</h2>
          <p className="text-sm text-[#888] mt-1">
            Evaluation cost, drawdown model and payout cadence — pulled live from our firm database.
          </p>
        </div>
        <p className="text-xs text-[#888] md:hidden">Swipe left to see more →</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {assetPills.map((a) => (
          <button
            key={a}
            onClick={() => setAsset(a)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
              asset === a
                ? "border-[#7c3aed] bg-[#7c3aed]/15 text-white"
                : "border-[#2a2a2a] text-[#999] hover:border-[#7c3aed]/60 hover:text-white"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-[10px] uppercase tracking-wider text-[#666] mr-1">Columns</span>
        {columns.map((c) => (
          <button
            key={c.key}
            onClick={() => setVisible((v) => ({ ...v, [c.key]: !v[c.key] }))}
            className={`px-3 py-1 rounded-md text-[11px] border transition ${
              visible[c.key]
                ? "border-[#2a2a2a] bg-[#1a1a1a] text-white/85"
                : "border-[#1e1e1e] text-[#555] line-through"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#222]">
        <table className="w-full text-sm border-collapse" style={{ minWidth: 760 }}>
          <thead>
            <tr className="bg-gradient-brand text-white">
              <th className="sticky left-0 z-20 bg-[#7C3AED] text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">
                Prop Firm
              </th>
              {shown.map((c) => (
                <th key={c.key} className="text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">
                  <button onClick={() => toggleSort(c.sortKey)} className="inline-flex items-center gap-1.5 hover:text-white/80">
                    {c.label}
                    <ArrowUpDown size={11} className={sortKey === c.sortKey ? "opacity-100" : "opacity-40"} />
                  </button>
                </th>
              ))}
              <th className="text-right font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {isPending && (
              <tr>
                <td colSpan={shown.length + 2} className="px-5 py-16 text-center text-sm text-[#888]">
                  <Loader2 className="inline h-4 w-4 animate-spin mr-2" /> Loading firm data…
                </td>
              </tr>
            )}
            {isError && !isPending && (
              <tr>
                <td colSpan={shown.length + 2} className="px-5 py-16 text-center text-sm text-[#888]">
                  We couldn't load the comparison data. Please refresh and try again.
                </td>
              </tr>
            )}
            {!isPending && !isError && rows.length === 0 && (
              <tr>
                <td colSpan={shown.length + 2} className="px-5 py-16 text-center text-sm text-[#888]">
                  No firms match this market filter yet.
                </td>
              </tr>
            )}
            {rows.map((firm, i) => {
              const baseBg = i % 2 === 0 ? "bg-[#141414]" : "bg-[#1a1a1a]";
              return (
                <tr key={firm.id} className={`group transition-colors ${baseBg} hover:bg-[#1E1E1E]`}>
                  <td className={`sticky left-0 z-10 ${baseBg} group-hover:bg-[#1E1E1E] px-5 py-4 border-r border-[#222]`}>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-md bg-[#1C1C1C] border border-[#222] flex items-center justify-center overflow-hidden text-[9px] font-semibold text-white/70 text-center px-1">
                        {firm.logo ? <img src={firm.logo} alt="" className="h-5 w-5 object-contain" /> : firm.name.split(" ")[0]}
                      </div>
                      <div>
                        <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="font-display font-semibold text-sm hover:text-[#c4a8ff]">
                          {firm.name}
                        </Link>
                        <div className="text-[10px] text-[#777]">{firm.evaluationType} evaluation</div>
                      </div>
                    </div>
                  </td>
                  {shown.map((c) => (
                    <td key={c.key} className="px-5 py-4 whitespace-nowrap">
                      {c.key === "rating" ? (
                        <span className="flex items-center gap-1.5">
                          <Star size={14} className="fill-[#facc15] text-[#facc15]" />
                          <span className="font-display font-bold text-sm">{firm.rating.toFixed(1)}</span>
                        </span>
                      ) : (
                        <span className={c.key === "profitSplit" ? "text-[#00d97e] font-semibold" : "text-white/90"}>
                          {cellValue(firm, c.key) || "—"}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex gap-2">
                      <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="btn-ghost text-[11px] py-1.5 px-3">
                        Review
                      </Link>
                      <a
                        href={firm.affiliateUrl || `/reviews/${firm.slug}`}
                        target={firm.affiliateUrl ? "_blank" : undefined}
                        rel="nofollow sponsored noopener"
                        className="btn-gradient text-[11px] py-1.5 px-3"
                      >
                        Visit
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-[#888]">
        Rules and pricing re-verified whenever a firm updates its terms. Numbers reflect the current live offer.
      </p>
    </section>
  );
}

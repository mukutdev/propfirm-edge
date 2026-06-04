import { useMemo, useState } from "react";
import { Star, Check, ChevronDown } from "lucide-react";
import { compareFirms, type CompareFirm, type DrawdownType } from "@/lib/compare-data";

type Market = "All" | "Futures" | "Forex" | "Crypto" | "Stocks";
const markets: Market[] = ["All", "Futures", "Forex", "Crypto", "Stocks"];

type Col =
  | "maxFunding" | "challengeFee" | "split" | "drawdown" | "dailyLoss"
  | "trailingStop" | "futures" | "minDays" | "payoutSpeed" | "rating";

const allCols: { id: Col; label: string }[] = [
  { id: "maxFunding", label: "Max Account" },
  { id: "challengeFee", label: "Challenge Fee" },
  { id: "split", label: "Profit Split" },
  { id: "drawdown", label: "Drawdown Type" },
  { id: "dailyLoss", label: "Daily Loss Limit" },
  { id: "trailingStop", label: "Trailing Stop" },
  { id: "futures", label: "Futures" },
  { id: "minDays", label: "Min Trading Days" },
  { id: "payoutSpeed", label: "Payout Speed" },
  { id: "rating", label: "Our Rating" },
];

const defaultVisible: Col[] = ["maxFunding", "challengeFee", "split", "drawdown", "payoutSpeed", "rating"];

function drawdownPill(t: DrawdownType) {
  if (t === "Trailing") return "bg-[#F59E0B]/15 text-[#fbbf24] border-[#F59E0B]/40";
  if (t === "Static") return "bg-[#3B82F6]/15 text-[#93c5fd] border-[#3B82F6]/40";
  return "bg-[#7C3AED]/15 text-[#c4a8ff] border-[#7C3AED]/40";
}

function FirmCell({ firm }: { firm: CompareFirm }) {
  return (
    <div className="flex items-center gap-3 relative">
      {firm.topPick && (
        <span className="absolute -left-3 -translate-x-full top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-gradient-brand text-white font-semibold hidden xl:inline-block">
          ⭐ Top Pick
        </span>
      )}
      <div className="h-10 w-10 shrink-0 rounded-md bg-[#1C1C1C] border border-[#222] flex items-center justify-center text-[9px] font-semibold text-white/70 text-center px-1">
        {firm.name.split(" ")[0]}
      </div>
      <div className="font-display font-semibold text-sm">{firm.name}</div>
    </div>
  );
}

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Star size={14} className="fill-[#facc15] text-[#facc15]" />
      <span className="font-display font-bold text-sm">{rating.toFixed(1)}</span>
    </div>
  );
}

function renderCell(col: Col, firm: CompareFirm) {
  switch (col) {
    case "maxFunding": return <span className="text-white/90 font-medium">{firm.maxFunding}</span>;
    case "challengeFee": return <span className="text-white/90">{firm.fee}</span>;
    case "split": return <span className="text-[#00d97e] font-semibold">{firm.split}</span>;
    case "drawdown":
      return (
        <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${drawdownPill(firm.drawdownType)}`}>
          {firm.drawdownType}
        </span>
      );
    case "dailyLoss": return <span className="text-white/90">{firm.dailyLoss}</span>;
    case "trailingStop": return <span className="text-white/90">{firm.trailingStop}</span>;
    case "futures": return <span className={firm.categories.includes("Futures") ? "text-[#00d97e] font-semibold" : "text-[#888]"}>{firm.categories.includes("Futures") ? "Yes" : "No"}</span>;
    case "minDays": return <span className="text-white/90">{firm.minDays}</span>;
    case "payoutSpeed":
      return <span className={firm.payoutSpeedDays <= 2 ? "text-[#00d97e] font-semibold" : "text-white/90"}>{firm.payoutSpeed}</span>;
    case "rating": return <Rating rating={firm.rating} />;
  }
}

export function CompareTable() {
  const [market, setMarket] = useState<Market>("All");
  const [visible, setVisible] = useState<Col[]>(defaultVisible);
  const [colMenuOpen, setColMenuOpen] = useState(false);

  const toggleCol = (c: Col) =>
    setVisible((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const rows = useMemo(() => {
    return compareFirms
      .filter((f) => market === "All" || f.categories.includes(market as Exclude<Market, "All">))
      .sort((a, b) => Number(!!b.topPick) - Number(!!a.topPick) || b.rating - a.rating);
  }, [market]);

  const orderedCols = allCols.filter((c) => visible.includes(c.id));

  return (
    <>
      {/* Filter / column control bar */}
      <div className="sticky top-16 z-30 bg-[#141414]/95 backdrop-blur-md border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-xs uppercase tracking-wider text-[#888] shrink-0">Filter by Market:</span>
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 snap-x">
              {markets.map((m) => (
                <button
                  key={m}
                  onClick={() => setMarket(m)}
                  className={`shrink-0 snap-start px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                    market === m
                      ? "bg-gradient-brand text-white border border-transparent"
                      : "border border-[#2a2a2a] text-[#aaa] hover:text-white hover:border-[#7c3aed]"
                  }`}
                >{m}</button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setColMenuOpen((v) => !v)}
              className="md:hidden flex items-center gap-2 px-3 py-2 rounded-full border border-[#2a2a2a] text-xs text-white"
            >
              Columns <ChevronDown size={14} className={colMenuOpen ? "rotate-180 transition" : "transition"} />
            </button>

            <div className={`hidden md:flex items-center gap-3 flex-wrap ${colMenuOpen ? "" : ""}`}>
              <span className="text-xs uppercase tracking-wider text-[#888]">Show:</span>
              {allCols.map((c) => {
                const on = visible.includes(c.id);
                return (
                  <label key={c.id} className="flex items-center gap-1.5 text-xs cursor-pointer">
                    <span className={`h-4 w-4 rounded border flex items-center justify-center transition ${
                      on ? "bg-gradient-brand border-transparent" : "border-[#333]"
                    }`}>
                      {on && <Check size={11} className="text-white" />}
                    </span>
                    <input type="checkbox" checked={on} onChange={() => toggleCol(c.id)} className="sr-only" />
                    <span className={on ? "text-white" : "text-[#888]"}>{c.label}</span>
                  </label>
                );
              })}
            </div>

            {colMenuOpen && (
              <div className="md:hidden absolute right-0 mt-2 w-56 bg-[#141414] border border-[#222] rounded-lg p-3 z-40 space-y-2 shadow-xl">
                {allCols.map((c) => {
                  const on = visible.includes(c.id);
                  return (
                    <label key={c.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <span className={`h-4 w-4 rounded border flex items-center justify-center ${
                        on ? "bg-gradient-brand border-transparent" : "border-[#333]"
                      }`}>
                        {on && <Check size={11} className="text-white" />}
                      </span>
                      <input type="checkbox" checked={on} onChange={() => toggleCol(c.id)} className="sr-only" />
                      <span className={on ? "text-white" : "text-[#aaa]"}>{c.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="overflow-x-auto rounded-xl border border-[#222]">
          <table className="w-full text-sm border-collapse" style={{ minWidth: 200 + orderedCols.length * 130 + 140 }}>
            <thead>
              <tr className="bg-gradient-brand text-white">
                <th className="sticky left-0 z-20 bg-gradient-brand text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">
                  Prop Firm
                </th>
                {orderedCols.map((c) => (
                  <th key={c.id} className="text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">
                    {c.label}
                  </th>
                ))}
                <th className="sticky right-0 z-20 bg-gradient-brand text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider whitespace-nowrap">
                  Action
                </th>
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
                      <FirmCell firm={firm} />
                    </td>
                    {orderedCols.map((c) => (
                      <td key={c.id} className="px-5 py-4 whitespace-nowrap">{renderCell(c.id, firm)}</td>
                    ))}
                    <td className={`sticky right-0 z-10 ${baseBg} group-hover:bg-[#1E1E1E] px-4 py-3 border-l border-[#222]`}>
                      <div className="flex flex-col gap-1.5 min-w-[110px]">
                        <a href={`/reviews/${firm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="btn-ghost text-[11px] py-1.5 px-3">Review</a>
                        <a href="#" className="btn-gradient text-[11px] py-1.5 px-3">Visit</a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 space-y-1 text-xs text-[#888]">
          <p>All data verified by our team. Last checked January 2025.</p>
          <p>Fees shown are for standard accounts. Check firm website for current pricing.</p>
        </div>
      </section>
    </>
  );
}
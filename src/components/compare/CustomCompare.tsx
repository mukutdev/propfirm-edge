import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Star, ExternalLink, Loader2 } from "lucide-react";
import { listCompareFirms, getFirmsByIds, type CompareFirmRow } from "@/lib/compare.functions";

const slots = [0, 1, 2, 3, 4] as const;

const statRows: { label: string; get: (f: CompareFirmRow) => string; positive?: boolean }[] = [
  { label: "Our Rating", get: (f) => `${f.rating.toFixed(1)} / 5` },
  { label: "Max Funding", get: (f) => f.maxAccount },
  { label: "Profit Split", get: (f) => f.profitSplit, positive: true },
  { label: "Monthly Fee", get: (f) => f.monthlyFee },
  { label: "Evaluation", get: (f) => f.evaluationType },
  { label: "Drawdown", get: (f) => f.drawdownType },
  { label: "Payout Speed", get: (f) => f.payoutSpeed },
  { label: "Platforms", get: (f) => f.platforms.slice(0, 3).join(", ") },
];

export function CustomCompare() {
  const fetchFirms = useServerFn(listCompareFirms);
  const fetchByIds = useServerFn(getFirmsByIds);

  const [selected, setSelected] = useState<string[]>(["", "", "", "", ""]);
  const [built, setBuilt] = useState<string[] | null>(null);

  const { data: firms = [], isPending } = useQuery({
    queryKey: ["compare-firm-options"],
    queryFn: () => fetchFirms({ data: { sortKey: "name", dir: "asc" } }),
  });

  const results = useQuery({
    queryKey: ["compare-matchup", built],
    queryFn: () => fetchByIds({ data: { ids: built! } }),
    enabled: !!built && built.length >= 2,
  });

  const chosenIds = selected.filter(Boolean);
  const preview = chosenIds
    .map((id) => firms.find((f) => f.id === id))
    .filter(Boolean) as CompareFirmRow[];

  const rows = results.data ?? [];
  const maxRating = useMemo(() => Math.max(...rows.map((r) => r.rating), 0), [rows]);

  function updateSlot(i: number, id: string) {
    setSelected((prev) => prev.map((v, idx) => (idx === i ? id : v)));
  }

  function build() {
    setBuilt(chosenIds);
    if (typeof window !== "undefined") {
      requestAnimationFrame(() =>
        document.getElementById("custom-compare-results")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }

  return (
    <section id="custom-compare" className="bg-[#0a0a0a] border-y border-[#222] py-14 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl">Build Your Own Matchup</h2>
          <p className="mt-3 text-[#888]">Pick up to 5 firms and see their evaluation and payout terms stacked side by side.</p>
        </div>

        <div className="gradient-border rounded-2xl">
          <div className="rounded-2xl bg-[#141414] p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {slots.map((i) => {
                const current = firms.find((f) => f.id === selected[i]);
                return (
                  <div key={i}>
                    <label className="block text-[10px] uppercase tracking-wider text-[#888] mb-1.5">Firm {i + 1}</label>
                    <div
                      className={`flex items-center gap-2 rounded-lg border bg-[#0f0f0f] px-2.5 transition ${
                        current ? "border-[#7c3aed]/70" : "border-[#2a2a2a]"
                      }`}
                    >
                      {current?.logo ? (
                        <img src={current.logo} alt="" className="h-5 w-5 shrink-0 object-contain" />
                      ) : (
                        <span className="h-5 w-5 shrink-0 rounded bg-[#1c1c1c]" />
                      )}
                      <select
                        value={selected[i]}
                        onChange={(e) => updateSlot(i, e.target.value)}
                        className="w-full min-h-[44px] bg-transparent text-sm text-white focus:outline-none"
                      >
                        <option value="">{isPending ? "Loading…" : "Select firm"}</option>
                        {firms
                          .filter((f) => f.id === selected[i] || !selected.includes(f.id))
                          .map((f) => (
                            <option key={f.id} value={f.id} className="bg-[#141414]">
                              {f.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {preview.length === 0 ? (
                  <span className="text-xs text-[#777]">No firms selected yet</span>
                ) : (
                  preview.map((f) => (
                    <span
                      key={f.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2a2a] bg-[#0f0f0f] px-3 py-1.5 text-xs text-white/85 animate-fade-in"
                    >
                      {f.logo && <img src={f.logo} alt="" className="h-3.5 w-3.5 object-contain" />}
                      {f.name}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs text-[#888]">{chosenIds.length}/5 selected</span>
              <button
                onClick={build}
                disabled={chosenIds.length < 2}
                className="btn-gradient text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Build My Matchup
              </button>
              <button
                onClick={() => {
                  setSelected(["", "", "", "", ""]);
                  setBuilt(null);
                }}
                className="btn-ghost text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>

        {built && results.isPending && (
          <p className="mt-10 text-center text-sm text-[#888]">
            <Loader2 className="inline h-4 w-4 animate-spin mr-2" /> Pulling the latest firm terms…
          </p>
        )}

        {built && !results.isPending && rows.length >= 2 && (
          <div
            id="custom-compare-results"
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 animate-fade-in scroll-mt-24"
          >
            {rows.map((firm) => {
              const isBest = firm.rating === maxRating;
              return (
                <div
                  key={firm.id}
                  className={`card-surface p-5 flex flex-col ${
                    isBest ? "border-[#7c3aed]/70 shadow-[0_0_0_1px_rgba(124,58,237,0.5),0_0_30px_-5px_rgba(124,58,237,0.5)] glow-pulse" : ""
                  }`}
                >
                  <div className="h-11 w-full rounded-md bg-[#1C1C1C] border border-[#222] flex items-center justify-center gap-2 mb-4">
                    {firm.logo && <img src={firm.logo} alt="" className="h-5 w-5 object-contain" />}
                    <span className="text-xs font-semibold text-white/80">{firm.name}</span>
                  </div>
                  <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="font-display font-bold text-base hover:text-[#c4a8ff]">
                    {firm.name}
                  </Link>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Star size={14} className="fill-[#facc15] text-[#facc15]" />
                    <span className="text-sm font-semibold">{firm.rating.toFixed(1)} / 5</span>
                    {isBest && <span className="text-[9px] uppercase tracking-wider text-[#c4a8ff]">Top rated</span>}
                  </div>

                  <dl className="mt-4 space-y-2 text-sm">
                    {statRows.map((r) => (
                      <div key={r.label} className="flex justify-between gap-2 py-1.5 border-b border-[#222]">
                        <dt className="text-[10px] uppercase tracking-wider text-[#888]">{r.label}</dt>
                        <dd className={`font-medium text-right text-xs ${r.positive ? "text-[#00d97e]" : "text-white/90"}`}>
                          {r.get(firm) || "—"}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href={firm.affiliateUrl || `/reviews/${firm.slug}`}
                    target={firm.affiliateUrl ? "_blank" : undefined}
                    rel="nofollow sponsored noopener"
                    className="btn-gradient w-full mt-5 text-sm py-2.5"
                  >
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

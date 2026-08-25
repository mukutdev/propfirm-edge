import { useMemo, useState } from "react";
import { Star, LayoutGrid, List, Copy, X, Check } from "lucide-react";
import { reviewFirms, type ReviewFirm } from "@/lib/home-data";

type Category = "All" | "Futures" | "Forex" | "Crypto" | "Stocks";
type SortKey = "rating" | "fee" | "funding" | "newest";
type ViewMode = "grid" | "list";

const categories: Category[] = ["All", "Futures", "Forex", "Crypto", "Stocks"];

const sortLabels: Record<SortKey, string> = {
  rating: "Top Rated",
  fee: "Lowest Fee",
  funding: "Highest Funding",
  newest: "Newest",
};

function badgeClass(color: ReviewFirm["badgeColor"]) {
  if (color === "purple") return "bg-gradient-brand text-white";
  if (color === "pink") return "bg-gradient-brand text-white";
  return "bg-gradient-brand text-white";
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} className={i <= Math.round(rating) ? "fill-[#facc15] text-[#facc15]" : "text-[#333]"} />
      ))}
      <span className="text-xs text-white/90 ml-2 font-medium">{rating.toFixed(1)}/5</span>
    </div>
  );
}

function MarketPills({ markets }: { markets: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {markets.map((m) => (
        <span key={m} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-[#222] text-[#aaa]">
          {m}
        </span>
      ))}
    </div>
  );
}

function StatBlock({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="text-center flex-1">
      <div className={`font-display font-bold text-base ${positive ? "text-[#00d97e]" : "text-white"}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[#888] mt-1">{label}</div>
    </div>
  );
}

function GridCard({
  firm,
  checked,
  onToggle,
}: {
  firm: ReviewFirm;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="group card-surface flex flex-col overflow-hidden relative animate-fade-in">
      <button
        onClick={onToggle}
        aria-label={checked ? "Remove from compare" : "Add to compare"}
        className={`absolute top-3 left-3 z-10 h-6 w-6 rounded-md border flex items-center justify-center transition ${
          checked
            ? "bg-gradient-brand border-transparent opacity-100"
            : "bg-[#0a0a0a]/80 border-[#333] opacity-0 group-hover:opacity-100"
        }`}
      >
        {checked && <Check size={14} className="text-white" />}
      </button>

      {firm.badge && (
        <span className={`absolute top-3 right-3 z-10 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${badgeClass(firm.badgeColor)}`}>
          {firm.badge}
        </span>
      )}

      <div className="bg-[#1C1C1C] h-24 flex items-center justify-center border-b border-[#222]">
        <div className="text-white/70 font-display font-semibold text-sm">{firm.name}</div>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="font-display font-bold text-xl">{firm.name}</h3>
          <div className="mt-2"><Stars rating={firm.rating} /></div>
        </div>
        <p className="text-sm text-[#888] leading-relaxed line-clamp-2">{firm.description}</p>

        <div className="flex items-stretch py-3 border-y border-[#222] divide-x divide-[#222]">
          <StatBlock label="Max Funding" value={firm.maxFunding} />
          <StatBlock label="Profit Split" value={firm.split} positive />
          <StatBlock label="Monthly Fee" value={firm.fee} />
        </div>

        <MarketPills markets={firm.markets} />

        <div className="flex gap-3 mt-auto pt-2">
          <a href="#" className="btn-ghost flex-1 text-sm py-2.5">Read Review</a>
          <a href="#" className="btn-gradient flex-1 text-sm py-2.5">Get Discount</a>
        </div>
      </div>
    </article>
  );
}

function ListCard({
  firm,
  checked,
  onToggle,
}: {
  firm: ReviewFirm;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="group card-surface p-5 flex flex-col md:flex-row gap-5 items-stretch md:items-center relative animate-fade-in">
      <button
        onClick={onToggle}
        aria-label={checked ? "Remove from compare" : "Add to compare"}
        className={`absolute top-3 left-3 h-6 w-6 rounded-md border flex items-center justify-center transition ${
          checked
            ? "bg-gradient-brand border-transparent opacity-100"
            : "bg-[#0a0a0a]/80 border-[#333] opacity-0 group-hover:opacity-100"
        }`}
      >
        {checked && <Check size={14} className="text-white" />}
      </button>

      <div className="h-16 w-16 shrink-0 rounded-md bg-[#1C1C1C] flex items-center justify-center text-[10px] text-white/70 font-semibold text-center px-1 ml-8 md:ml-6">
        {firm.name.split(" ")[0]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-display font-bold text-lg">{firm.name}</h3>
          {firm.badge && (
            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeClass(firm.badgeColor)}`}>
              {firm.badge}
            </span>
          )}
        </div>
        <div className="mt-1.5"><Stars rating={firm.rating} /></div>
        <p className="text-sm text-[#888] mt-2 line-clamp-1">{firm.description}</p>
        <div className="mt-3"><MarketPills markets={firm.markets} /></div>
      </div>

      <div className="flex md:flex-col gap-3 md:gap-2 md:w-44 shrink-0 md:border-l md:border-[#222] md:pl-5">
        <div className="flex-1 md:flex md:justify-between md:text-sm">
          <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#888] block md:inline">Funding</span>
          <span className="font-display font-semibold text-white block md:inline">{firm.maxFunding}</span>
        </div>
        <div className="flex-1 md:flex md:justify-between md:text-sm">
          <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#888] block md:inline">Split</span>
          <span className="font-display font-semibold text-[#00d97e] block md:inline">{firm.split}</span>
        </div>
        <div className="flex-1 md:flex md:justify-between md:text-sm">
          <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#888] block md:inline">Fee</span>
          <span className="font-display font-semibold text-white block md:inline">{firm.fee}</span>
        </div>
      </div>

      <div className="flex md:flex-col gap-2 shrink-0">
        <a href="#" className="btn-ghost text-xs py-2 px-4">Read Review</a>
        <a href="#" className="btn-gradient text-xs py-2 px-4">Get Discount</a>
      </div>
    </article>
  );
}

function FilterBar({
  active, setActive, sort, setSort, view, setView,
}: {
  active: Category; setActive: (c: Category) => void;
  sort: SortKey; setSort: (s: SortKey) => void;
  view: ViewMode; setView: (v: ViewMode) => void;
}) {
  return (
    <div className="sticky top-16 z-30 bg-[#141414]/95 backdrop-blur-md border-y border-[#222]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 snap-x">
          {categories.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-brand text-white border border-transparent"
                    : "border border-[#2a2a2a] text-[#aaa] hover:text-white hover:border-[#7c3aed]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-wider text-[#888]">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-full text-sm px-4 py-2 text-white focus:outline-none focus:border-[#7c3aed]"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((k) => (
              <option key={k} value={k} className="bg-[#141414]">{sortLabels[k]}</option>
            ))}
          </select>
          <div className="hidden md:flex border border-[#2a2a2a] rounded-full overflow-hidden">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`p-2.5 transition ${view === "grid" ? "bg-[#7c3aed]/20 text-white" : "text-[#888] hover:text-white"}`}
            ><LayoutGrid size={16} /></button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className={`p-2.5 transition ${view === "list" ? "bg-[#7c3aed]/20 text-white" : "text-[#888] hover:text-white"}`}
            ><List size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareBar({ firms, onClear, onRemove }: { firms: ReviewFirm[]; onClear: () => void; onRemove: (n: string) => void }) {
  if (firms.length < 2) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-fade-in">
      <div className="bg-[#141414]/95 backdrop-blur-md border-t border-[#222] shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 flex-1">
            {firms.map((f) => (
              <div key={f.name} className="flex items-center gap-2 bg-[#1f1f1f] border border-[#2a2a2a] rounded-full pl-3 pr-1.5 py-1">
                <span className="text-xs text-white/90">{f.name}</span>
                <button onClick={() => onRemove(f.name)} aria-label="Remove" className="h-5 w-5 rounded-full bg-[#0a0a0a] flex items-center justify-center text-[#888] hover:text-white">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <div className="md:hidden flex-1 text-sm text-white/90">
            {firms.length} firms selected
          </div>
          <a href="#" className="btn-gradient text-sm">
            <span className="hidden md:inline">Compare Now</span>
            <span className="md:hidden">Compare {firms.length} →</span>
          </a>
          <button onClick={onClear} aria-label="Clear all" className="h-9 w-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-[#7c3aed]">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-6 w-[300px] shrink-0 sticky top-36 self-start">
      <div className="card-surface p-6">
        <div className="text-xs uppercase tracking-wider text-[#888] mb-2">🔥 This Week's Best Deal</div>
        <h3 className="font-display font-bold text-lg">Apex Trader Funding</h3>
        <p className="text-sm text-[#888] mt-1.5">Up to 80% off any evaluation account this week only.</p>
        <div className="mt-4 flex items-center gap-2">
          <code className="flex-1 bg-[#0a0a0a] border border-dashed border-[#7c3aed] rounded-md px-3 py-2 text-center font-mono text-sm text-white">SAVE20</code>
          <button aria-label="Copy code" className="h-9 w-9 rounded-md border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-[#7c3aed]">
            <Copy size={14} />
          </button>
        </div>
        <a href="#" className="btn-gradient mt-4 w-full text-sm py-2.5">Claim Discount</a>
      </div>

      <div className="card-surface p-6">
        <h3 className="font-display font-bold text-base">New to Prop Firms?</h3>
        <p className="text-sm text-[#888] mt-2 leading-relaxed">
          Learn how funded trading works, what evaluations look for, and how payouts actually hit your bank.
        </p>
        <a href="#" className="inline-block mt-3 text-sm font-semibold text-[#c4a8ff] hover:text-white transition">
          Read Beginner's Guide →
        </a>
      </div>

      <div className="card-surface p-6 text-center">
        <p className="text-sm text-white/90 leading-relaxed">
          Join <span className="font-bold">500+ funded traders</span> in our Discord
        </p>
        <a href="#" className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full bg-[#5865F2] text-white font-semibold text-sm hover:brightness-110 transition">
          Join Discord
        </a>
      </div>
    </aside>
  );
}

export function ReviewsDirectory() {
  const [category, setCategory] = useState<Category>("All");
  const [sort, setSort] = useState<SortKey>("rating");
  const [view, setView] = useState<ViewMode>("grid");
  const [compare, setCompare] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const list = reviewFirms.filter((f) => category === "All" || f.categories.includes(category as Exclude<Category, "All">));
    const sorted = [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "fee") return a.feeNumeric - b.feeNumeric;
      if (sort === "funding") return b.fundingNumeric - a.fundingNumeric;
      return b.addedOrder - a.addedOrder;
    });
    return sorted;
  }, [category, sort]);

  const toggleCompare = (name: string) => {
    setCompare((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : prev.length >= 4 ? prev : [...prev, name]
    );
  };

  const compareFirms = reviewFirms.filter((f) => compare.includes(f.name));

  return (
    <>
      <FilterBar active={category} setActive={setCategory} sort={sort} setSort={setSort} view={view} setView={setView} />

      <section className="max-w-7xl mx-auto px-6 py-8 flex gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#888]">Showing <span className="text-white font-semibold">{filtered.length}</span> Prop Firms</p>
            <div className="md:hidden flex border border-[#2a2a2a] rounded-full overflow-hidden">
              <button onClick={() => setView("grid")} aria-label="Grid" className={`p-2 ${view === "grid" ? "bg-[#7c3aed]/20 text-white" : "text-[#888]"}`}><LayoutGrid size={14} /></button>
              <button onClick={() => setView("list")} aria-label="List" className={`p-2 ${view === "list" ? "bg-[#7c3aed]/20 text-white" : "text-[#888]"}`}><List size={14} /></button>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filtered.map((f) => (
                <GridCard key={f.name} firm={f} checked={compare.includes(f.name)} onToggle={() => toggleCompare(f.name)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((f) => (
                <ListCard key={f.name} firm={f} checked={compare.includes(f.name)} onToggle={() => toggleCompare(f.name)} />
              ))}
            </div>
          )}
        </div>

        <Sidebar />
      </section>

      <CompareBar firms={compareFirms} onClear={() => setCompare([])} onRemove={(n) => toggleCompare(n)} />
    </>
  );
}
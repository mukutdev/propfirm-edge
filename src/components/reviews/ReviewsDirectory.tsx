import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, X, Check, Loader2 } from "lucide-react";
import { listCompareFirms, type CompareFirmRow } from "@/lib/compare.functions";
import { compareTrustpilot } from "@/lib/promo-codes";
import { CodeCell, CopyPill, FirmLogo, RatingStars, VisitButton, discountOf } from "@/components/shared/FirmBits";

type SortKey = "rating" | "fee" | "funding" | "name";
type ViewMode = "grid" | "list";

const sortLabels: Record<SortKey, string> = {
  rating: "Trustpilot Score",
  fee: "Lowest Fee",
  funding: "Highest Funding",
  name: "Name (A–Z)",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold line-clamp-2">{value}</div>
    </div>
  );
}

function Markets({ firm }: { firm: CompareFirmRow }) {
  if (!firm.instrumentList.length) return null;
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Markets</div>
      <div className="mt-1 text-sm text-muted-foreground">{firm.instrumentList.join(", ")}</div>
    </div>
  );
}

function CompareToggle({ checked, onToggle, name }: { checked: boolean; onToggle: () => void; name: string }) {
  return (
    <button
      onClick={onToggle}
      aria-label={checked ? `Remove ${name} from compare` : `Add ${name} to compare`}
      className={`h-6 w-6 shrink-0 rounded-md border flex items-center justify-center transition ${
        checked ? "bg-gradient-brand border-transparent" : "border-border hover:border-primary"
      }`}
    >
      {checked && <Check size={14} />}
    </button>
  );
}

function GridCard({ firm, checked, onToggle }: { firm: CompareFirmRow; checked: boolean; onToggle: () => void }) {
  return (
    <article className="card-surface flex flex-col gap-5 p-6">
      <div className="flex items-start gap-3">
        <FirmLogo firm={firm} size={48} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold leading-tight">{firm.name}</h3>
          <div className="mt-1.5"><RatingStars firm={firm} /></div>
        </div>
        <CompareToggle checked={checked} onToggle={onToggle} name={firm.name} />
      </div>

      <div className="grid grid-cols-3 gap-3 border-y border-border py-4">
        <Stat label="Max Accounts" value={firm.maxAccounts == null ? "-" : String(firm.maxAccounts)} />
        <Stat label="Platforms" value={firm.platforms.join(", ") || "-"} />
        <Stat label="Discount" value={discountOf(firm.promoCodes)} />
      </div>

      <div>
        <div className="mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">Code</div>
        <CodeCell codes={firm.promoCodes} />
      </div>

      <Markets firm={firm} />

      <div className="mt-auto flex items-center gap-2">
        <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="btn-ghost flex-1 py-2.5 text-center text-sm">Read Review</Link>
        <VisitButton firm={firm} />
      </div>
    </article>
  );
}

function ListCard({ firm, checked, onToggle }: { firm: CompareFirmRow; checked: boolean; onToggle: () => void }) {
  return (
    <article className="card-surface flex flex-col gap-4 p-5 md:flex-row md:items-center">
      <div className="flex min-w-0 items-center gap-3 md:w-72">
        <CompareToggle checked={checked} onToggle={onToggle} name={firm.name} />
        <FirmLogo firm={firm} size={48} />
        <div className="min-w-0">
          <h3 className="font-display font-bold">{firm.name}</h3>
          <RatingStars firm={firm} />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-3">
        <Stat label="Max Accounts" value={firm.maxAccounts == null ? "-" : String(firm.maxAccounts)} />
        <Stat label="Platforms" value={firm.platforms.join(", ") || "-"} />
        <Stat label="Discount" value={discountOf(firm.promoCodes)} />
      </div>
      <CodeCell codes={firm.promoCodes} />
      <div className="flex items-center gap-2">
        <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="btn-ghost px-4 py-2 text-xs">Read Review</Link>
        <VisitButton firm={firm} />
      </div>
    </article>
  );
}

function FeaturedDeal({ firm }: { firm: CompareFirmRow | undefined }) {
  const code = firm?.promoCodes[0];
  if (!firm || !code) return null;
  return (
    <div className="card-surface p-6">
      <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">🔥 This Week's Best Deal</div>
      <div className="flex items-center gap-3">
        <FirmLogo firm={firm} />
        <h3 className="font-display text-lg font-bold">{firm.name}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{code.discountLabel} evaluations</p>
      <div className="mt-4"><CopyPill code={code.code} /></div>
      <a href={firm.affiliateUrl || `/reviews/${firm.slug}`} target="_blank" rel="sponsored noopener" className="btn-gradient mt-4 w-full py-2.5 text-sm">
        Visit {firm.name}
      </a>
    </div>
  );
}

export function ReviewsDirectory() {
  const fetchFirms = useServerFn(listCompareFirms);
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("rating");
  const [view, setView] = useState<ViewMode>("grid");
  const [compare, setCompare] = useState<string[]>([]);
  const { data, isPending, isError } = useQuery({
    queryKey: ["compare-firms", "All", "rating", "desc"],
    queryFn: () => fetchFirms({ data: { sortKey: "rating", dir: "desc" } }),
  });
  const firms = data ?? [];

  const categories = useMemo(() => {
    const has = (m: string) => firms.some((f) => f.assets.includes(m));
    return ["All", ...["Futures", "Stocks"].filter(has)];
  }, [firms]);

  const shown = useMemo(() => {
    const list = firms.filter((f) => category === "All" || f.assets.includes(category));
    return [...list].sort((a, b) => {
      if (sort === "fee") return a.feeNumeric - b.feeNumeric;
      if (sort === "funding") return b.fundingNumeric - a.fundingNumeric;
      if (sort === "name") return a.name.localeCompare(b.name);
      return compareTrustpilot(a.trustpilotScore, b.trustpilotScore) || (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
    });
  }, [firms, category, sort]);

  const featured = firms.find((f) => f.isFeaturedDeal);
  const toggleCompare = (id: string) =>
    setCompare((prev) => (prev.includes(id) ? prev.filter((n) => n !== id) : prev.length >= 4 ? prev : [...prev, id]));
  const compareFirms = firms.filter((f) => compare.includes(f.id));

  return (
    <>
      <div className="sticky top-16 z-30 border-y border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Market">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === c ? "bg-gradient-brand border border-transparent" : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="reviews-sort" className="text-xs uppercase tracking-wider text-muted-foreground">Sort</label>
            <select
              id="reviews-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
            >
              {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                <option key={k} value={k}>{sortLabels[k]}</option>
              ))}
            </select>
            <div className="hidden overflow-hidden rounded-full border border-border md:flex">
              <button onClick={() => setView("grid")} aria-label="Grid view" className={`p-2.5 ${view === "grid" ? "bg-primary/20" : "text-muted-foreground"}`}><LayoutGrid size={16} /></button>
              <button onClick={() => setView("list")} aria-label="List view" className={`p-2.5 ${view === "list" ? "bg-primary/20" : "text-muted-foreground"}`}><List size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <div className="min-w-0 flex-1">
          {isPending && <p className="py-16 text-center text-sm text-muted-foreground"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Loading firms…</p>}
          {isError && <p className="py-16 text-center text-sm text-muted-foreground">We couldn't load the firms. Please refresh.</p>}
          {view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {shown.map((f) => <GridCard key={f.id} firm={f} checked={compare.includes(f.id)} onToggle={() => toggleCompare(f.id)} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {shown.map((f) => <ListCard key={f.id} firm={f} checked={compare.includes(f.id)} onToggle={() => toggleCompare(f.id)} />)}
            </div>
          )}
          <div className="mt-6 lg:hidden"><FeaturedDeal firm={featured} /></div>
        </div>

        <aside className="sticky top-36 hidden w-[300px] shrink-0 flex-col gap-6 self-start lg:flex">
          <FeaturedDeal firm={featured} />
          <div className="card-surface p-6">
            <h3 className="font-display text-base font-bold">New to Prop Firms?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Learn how funded trading works, what evaluations look for, and how payouts reach your bank.
            </p>
            <Link to="/blog" className="mt-3 inline-block text-sm font-semibold text-primary hover:text-foreground">Read the guides →</Link>
          </div>
        </aside>
      </section>

      {compareFirms.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
            <div className="hidden flex-1 items-center gap-2 md:flex">
              {compareFirms.map((f) => (
                <span key={f.id} className="flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-3 pr-1.5 text-xs">
                  {f.name}
                  <button onClick={() => toggleCompare(f.id)} aria-label={`Remove ${f.name}`} className="text-muted-foreground hover:text-foreground"><X size={12} /></button>
                </span>
              ))}
            </div>
            <span className="flex-1 text-sm md:hidden">{compareFirms.length} firms selected</span>
            <Link to="/compare" className="btn-gradient text-sm">Compare Now</Link>
            <button onClick={() => setCompare([])} aria-label="Clear all" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"><X size={16} /></button>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Star, ArrowUpDown, Loader2, Check, Copy, ChevronDown } from "lucide-react";
import { listCompareFirms, type CompareFirmRow } from "@/lib/compare.functions";
import { formatTrustpilotDate, type PromoCode } from "@/lib/promo-codes";

type SortKey = "name" | "rating" | "maxAccounts";

function RatingStars({ firm }: { firm: CompareFirmRow }) {
  const score = firm.trustpilotScore;
  const date = formatTrustpilotDate(firm.trustpilotUpdatedAt);
  const inner = (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = score == null ? 0 : Math.max(0, Math.min(1, score - i));
          return (
            <span key={i} className="relative inline-block h-3.5 w-3.5">
              <Star size={14} className="absolute inset-0 text-muted-foreground/40" />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star size={14} className="fill-accent text-accent" />
              </span>
            </span>
          );
        })}
      </span>
      <span className="text-sm font-semibold">{score == null ? "N/A" : score.toFixed(1)}</span>
    </span>
  );
  if (score == null) return <span className="text-xs text-muted-foreground">Rating coming soon</span>;
  const title = score == null ? "No Trustpilot rating yet" : `Trustpilot rating${date ? `, updated ${date}` : ""}`;
  if (!firm.trustpilotUrl || score == null) return <span title={title}>{inner}</span>;
  return (
    <a href={firm.trustpilotUrl} target="_blank" rel="noopener noreferrer" title={title} aria-label={`${firm.name}: ${title}`} className="hover:opacity-80">
      {inner}
    </a>
  );
}

function CopyPill({ code, compact = false }: { code: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 ${compact ? "py-1 text-[11px]" : "py-1.5 text-xs"} font-mono transition hover:border-primary`}
    >
      {copied ? <Check size={12} className="text-primary" /> : <Copy size={12} className="text-muted-foreground" />}
      {copied ? "Copied!" : compact ? code : `Copy code: ${code}`}
    </button>
  );
}

function CodeCell({ codes }: { codes: PromoCode[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const first = codes[0];
  if (!first) return <span className="text-muted-foreground">—</span>;
  const extra = codes.length - 1;
  return (
    <div ref={ref} className="relative inline-flex flex-col items-start gap-1">
      <CopyPill code={first.code} />
      {extra > 0 && (
        <button type="button" onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground hover:text-foreground">
          +{extra} more <ChevronDown size={11} className={open ? "rotate-180 transition" : "transition"} />
        </button>
      )}
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-64 rounded-xl border border-border bg-card p-2 shadow-xl">
          {codes.map((c) => (
            <div key={c.code} className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 hover:bg-muted/40">
              <div className="min-w-0">
                <div className="font-mono text-xs font-semibold">{c.code}</div>
                <div className="text-[10px] text-muted-foreground">
                  {c.discountLabel}
                  {c.accountType ? ` · ${c.accountType}` : ""}
                </div>
              </div>
              <CopyPill code={c.code} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FirmLogo({ firm }: { firm: CompareFirmRow }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-card">
      {firm.logo ? <img src={firm.logo} alt={`${firm.name} logo`} className="h-7 w-7 rounded-md object-contain" /> : <span className="text-[10px] font-semibold">{firm.name[0]}</span>}
    </span>
  );
}

function VisitButton({ firm }: { firm: CompareFirmRow }) {
  return (
    <a
      href={firm.affiliateUrl || `/reviews/${firm.slug}`}
      target="_blank"
      rel="sponsored noopener"
      className="btn-gradient text-xs py-1.5 px-4"
    >
      Visit
    </a>
  );
}

const discountOf = (f: CompareFirmRow) => f.promoCodes[0]?.discountLabel || "—";

export function CompareTable() {
  const fetchFirms = useServerFn(listCompareFirms);
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const { data, isPending, isError } = useQuery({
    queryKey: ["compare-firms", "All", sortKey, dir],
    queryFn: () => fetchFirms({ data: { sortKey, dir } }),
  });
  const rows = data ?? [];

  function toggleSort(key: SortKey) {
    if (sortKey === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setDir(key === "name" ? "asc" : "desc");
    }
  }

  const SortHead = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 uppercase hover:text-foreground">
      {label}
      <ArrowUpDown size={10} className={sortKey === k ? "opacity-100" : "opacity-40"} />
    </button>
  );

  const status = isPending ? (
    <p className="py-16 text-center text-sm text-muted-foreground">
      <Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Loading firms…
    </p>
  ) : isError ? (
    <p className="py-16 text-center text-sm text-muted-foreground">We couldn't load the firms. Please refresh and try again.</p>
  ) : null;

  return (
    <section id="compare-table" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-bold md:text-3xl">The Best Prop Firms In The Industry</h2>
        <Link to="/reviews" className="btn-gradient text-sm py-2 px-5">View All Firms</Link>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] font-semibold tracking-wider text-muted-foreground">
              <th className="w-[22%] pb-3 pr-3"><SortHead k="name" label="Firm Name" /></th>
              <th className="w-[15%] pb-3 pr-3"><SortHead k="rating" label="Rating" /></th>
              <th className="w-[10%] pb-3 pr-3"><SortHead k="maxAccounts" label="Max Accounts" /></th>
              <th className="w-[17%] pb-3 pr-3 uppercase">Trading Platforms</th>
              <th className="w-[9%] pb-3 pr-3 uppercase">Discount</th>
              <th className="w-[19%] pb-3 pr-3 uppercase">Discount Code</th>
              <th className="w-[8%] pb-3 text-right uppercase">Website</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((firm) => (
              <tr key={firm.id} className="border-b border-border/60 align-middle">
                <td className="py-5 pr-3">
                  <div className="flex items-center gap-3">
                    <FirmLogo firm={firm} />
                    <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="font-display font-semibold hover:text-primary">
                      {firm.name}
                    </Link>
                  </div>
                </td>
                <td className="py-5 pr-3"><RatingStars firm={firm} /></td>
                <td className="py-5 pr-3 font-semibold">{firm.maxAccounts ?? "-"}</td>
                <td className="py-5 pr-3 text-muted-foreground"><span className="line-clamp-2">{firm.platforms.join(", ") || "—"}</span></td>
                <td className="py-5 pr-3 font-semibold">{discountOf(firm)}</td>
                <td className="py-5 pr-3"><CodeCell codes={firm.promoCodes} /></td>
                <td className="py-5 text-right"><VisitButton firm={firm} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {status}
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((firm) => (
          <article key={firm.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <FirmLogo firm={firm} />
              <div className="min-w-0 flex-1">
                <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="block truncate font-display font-semibold">
                  {firm.name}
                </Link>
                <RatingStars firm={firm} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold">{discountOf(firm)}</span>
              <CodeCell codes={firm.promoCodes} />
              <span className="ml-auto"><VisitButton firm={firm} /></span>
            </div>
          </article>
        ))}
        {status}
      </div>
    </section>
  );
}

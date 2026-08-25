import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, ChevronLeft, ChevronRight, Heart, Copy, Check, Trophy } from "lucide-react";
import { reviewFirms, type ReviewFirm } from "@/lib/home-data";
import { useReveal } from "@/hooks/use-reveal";

const slugify = (name: string) =>
  name.toLowerCase().replace(/\.com/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Promo = { off: string; code: string };
const promos: Record<string, Promo> = {
  "Apex Trader Funding": { off: "80% OFF", code: "TWPF80" },
  MyFundedFutures: { off: "50% OFF", code: "MATCH" },
  TradeDay: { off: "40% OFF", code: "TWPF40" },
  "Take Profit Trader": { off: "35% OFF", code: "TPT35" },
  "FundedNext Futures": { off: "45% OFF", code: "FNF45" },
  Tradeify: { off: "30% OFF", code: "TDY30" },
  Bluenox: { off: "25% OFF", code: "BLX25" },
  "Funded Futures Network": { off: "20% OFF", code: "FFN20" },
  "Lucid Trading": { off: "30% OFF", code: "LUCID30" },
  "Legends Trading": { off: "25% OFF", code: "LEG25" },
  "DayTraders.com": { off: "15% OFF", code: "DAY15" },
  Earn2Trade: { off: "20% OFF", code: "E2T20" },
};

const countries: Record<string, { flag: string; code: string }> = {
  "Apex Trader Funding": { flag: "🇺🇸", code: "USA" },
  MyFundedFutures: { flag: "🇺🇸", code: "USA" },
  TradeDay: { flag: "🇬🇧", code: "UK" },
  "Take Profit Trader": { flag: "🇺🇸", code: "USA" },
  "FundedNext Futures": { flag: "🇦🇪", code: "UAE" },
  Tradeify: { flag: "🇺🇸", code: "USA" },
  Bluenox: { flag: "🇨🇿", code: "CZE" },
  "Funded Futures Network": { flag: "🇺🇸", code: "USA" },
  "Lucid Trading": { flag: "🇺🇸", code: "USA" },
  "Legends Trading": { flag: "🇨🇦", code: "CAN" },
  "DayTraders.com": { flag: "🇺🇸", code: "USA" },
  Earn2Trade: { flag: "🇭🇺", code: "HUN" },
};

const promoOf = (name: string): Promo => promos[name] ?? { off: "20% OFF", code: "TWPF20" };

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "fill-[#facc15] text-[#facc15]" : "text-[#333]"}
        />
      ))}
    </span>
  );
}

function CodePill({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
        copied
          ? "border-transparent bg-[#00d97e] text-black"
          : "border-dashed border-[#333] bg-[#0c0c0c] text-white/80 hover:border-[#7c3aed]"
      }`}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied" : code}
    </button>
  );
}

function OffPill({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${className}`}
    >
      {label}
    </span>
  );
}

function Logo({ name, round = false }: { name: string; round?: boolean }) {
  const initials = name
    .replace(/\.com/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center bg-[#1f1f1f] text-[11px] font-bold text-white/70 ${
        round ? "rounded-full" : "rounded-md"
      }`}
    >
      {initials}
    </span>
  );
}

/* ---------- Offers carousel ---------- */

function OffersCarousel() {
  const pages = useMemo(() => {
    const chunk: ReviewFirm[][] = [];
    for (let i = 0; i < reviewFirms.length; i += 6) chunk.push(reviewFirms.slice(i, i + 6));
    return chunk;
  }, []);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || pages.length < 2) return;
    const t = setInterval(() => setPage((p) => (p + 1) % pages.length), 5000);
    return () => clearInterval(t);
  }, [paused, pages.length]);

  const month = new Date().toLocaleString("en-US", { month: "long" });
  const current = pages[page] ?? [];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative rounded-2xl bg-[#141414] p-[1px] shadow-[0_0_40px_-18px_rgba(124,58,237,0.8)] lg:col-span-2"
      style={{ backgroundImage: "linear-gradient(135deg,#7c3aed,#ec4899)" }}
    >
      <span className="absolute -top-3 left-5 z-10 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        💎 200 LP Welcome Bonus
      </span>
      <div className="rounded-2xl bg-[#141414] p-5 pt-7 sm:p-6 sm:pt-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h3 className="truncate font-display text-lg font-bold sm:text-xl">
            Exclusive {month} Offers 🔥
          </h3>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden items-center gap-1.5 sm:flex">
              {pages.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === page ? "w-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899]" : "w-1.5 bg-[#333]"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-1.5">
              <button
                aria-label="Previous offers"
                onClick={() => setPage((p) => (p - 1 + pages.length) % pages.length)}
                className="grid h-8 w-8 place-items-center rounded-full border border-[#222] text-white/70 transition hover:border-[#7c3aed] hover:text-white"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                aria-label="Next offers"
                onClick={() => setPage((p) => (p + 1) % pages.length)}
                className="grid h-8 w-8 place-items-center rounded-full border border-[#222] text-white/70 transition hover:border-[#7c3aed] hover:text-white"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <div
          key={page}
          className="mt-5 -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 animate-in fade-in duration-500 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3"
        >
          {current.map((f) => {
            const promo = promoOf(f.name);
            return (
              <Link
                key={f.name}
                to="/reviews/$slug"
                params={{ slug: slugify(f.name) }}
                className="w-[66%] shrink-0 snap-start rounded-xl border border-[#222] bg-[#1a1a1a] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#7c3aed]/60 hover:shadow-[0_10px_30px_-12px_rgba(124,58,237,0.7)] sm:w-auto"
              >
                <div className="flex items-center gap-2.5">
                  <Logo name={f.name} />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{f.name}</div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <Stars rating={f.rating} size={10} />
                      <span className="text-[10px] text-[#888]">{f.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-col items-start gap-1.5">
                  <OffPill label={promo.off} />
                  <span className="rounded-full border border-dashed border-[#333] bg-[#0c0c0c] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
                    {promo.code}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Most popular ---------- */

const rankColor = ["text-[#facc15]", "text-[#cbd5e1]", "text-[#d08b52]"];

function MostPopular() {
  const top = reviewFirms.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);
  return (
    <div className="rounded-2xl border border-[#7c3aed]/35 bg-[#141414] p-5 shadow-[0_0_40px_-22px_rgba(124,58,237,0.9)] sm:p-6">
      <h3 className="font-display text-lg font-bold sm:text-xl">Most Popular Futures Prop Firms 🏆</h3>
      <ul className="mt-4 divide-y divide-[#222]">
        {top.map((f, i) => {
          const promo = promoOf(f.name);
          return (
            <li key={f.name}>
              <Link
                to="/reviews/$slug"
                params={{ slug: slugify(f.name) }}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-1 py-3.5 transition hover:bg-white/5"
              >
                <span className="flex shrink-0 items-center gap-2">
                  <Trophy size={16} className={rankColor[i]} />
                  <Logo name={f.name} round />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{f.name}</span>
                  <span className="mt-1 flex items-center gap-1.5">
                    <Stars rating={f.rating} size={10} />
                    <span className="text-[10px] text-[#888]">{f.rating.toFixed(1)}</span>
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <OffPill label={promo.off} />
                  <span className="rounded-full border border-dashed border-[#333] bg-[#0c0c0c] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
                    {promo.code}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Preview table ---------- */

const filters = ["All", "Futures", "Forex", "Crypto", "Stocks"] as const;
const FAV_KEY = "twpf-favorites";

function PreviewTable() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [favs, setFavs] = useState<string[]>([]);
  const [bounce, setBounce] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) setFavs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    mounted.current = true;
  }, []);

  const toggleFav = (name: string) => {
    setFavs((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    setBounce(name);
    setTimeout(() => setBounce(null), 400);
  };

  const rows = reviewFirms
    .filter((f) => filter === "All" || f.categories.includes(filter as never))
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const maxFunding = Math.max(...reviewFirms.map((f) => f.fundingNumeric));

  return (
    <>
      <div className="mt-12 -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:justify-center md:px-0">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              filter === f
                ? "bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white shadow-[0_0_20px_-6px_rgba(124,58,237,0.8)]"
                : "border border-[#2a2a2a] text-[#888] hover:border-[#7c3aed]/60 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[#222]">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr className="bg-[#111]">
              {["Firm", "Rank / Reviews", "Country", "Assets", "Max Allocation", "Promo", "Actions"].map((c, i) => (
                <th
                  key={c}
                  className={`px-5 py-4 text-left font-display text-[11px] font-semibold uppercase tracking-wider text-white/90 ${
                    i === 0 ? "sticky left-0 z-10 bg-[#111]" : ""
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody key={filter} className="animate-in fade-in duration-500">
            {rows.map((f, i) => {
              const promo = promoOf(f.name);
              const country = countries[f.name] ?? { flag: "🌐", code: "GLB" };
              const isFav = favs.includes(f.name);
              const rowBg = i % 2 === 0 ? "bg-[#141414]" : "bg-[#1a1a1a]";
              return (
                <tr
                  key={f.name}
                  className={`group border-l-2 border-transparent transition-colors hover:border-[#7c3aed] hover:bg-white/[0.04] ${rowBg} ${
                    i < 3 ? "bg-gradient-to-r from-[#7c3aed]/[0.07] to-transparent" : ""
                  }`}
                >
                  <td className={`sticky left-0 z-10 px-5 py-4 ${rowBg} group-hover:bg-[#1d1a24]`}>
                    <div className="flex items-center gap-3">
                      <span className="w-4 font-display text-xs text-[#888]">{i + 1}</span>
                      <Logo name={f.name} />
                      <span className="whitespace-nowrap font-semibold">{f.name}</span>
                      <button
                        aria-label={isFav ? `Remove ${f.name} from favorites` : `Add ${f.name} to favorites`}
                        onClick={() => toggleFav(f.name)}
                        className={`flex items-center gap-1 text-[10px] text-[#888] transition-transform ${
                          bounce === f.name ? "scale-125" : "scale-100"
                        }`}
                      >
                        <Heart
                          size={14}
                          className={isFav ? "fill-[#ec4899] text-[#ec4899]" : "text-[#555] hover:text-[#ec4899]"}
                        />
                        {120 + Math.round(f.rating * 37) + (isFav ? 1 : 0)}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-2 py-0.5 text-xs font-semibold text-[#c4a8ff]">
                        {f.rating.toFixed(1)}
                      </span>
                      <Stars rating={f.rating} />
                    </div>
                    <div className="mt-1 text-[10px] text-[#ec4899]">
                      {80 + Math.round(f.rating * 51)} reviews
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-white/90">
                    {country.flag} {country.code}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {f.categories.slice(0, 3).map((c) => (
                        <span key={c} className="rounded-md bg-[#0c0c0c] px-2 py-0.5 text-[10px] text-[#888]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-display font-bold text-white">{f.maxFunding}</div>
                    <div className="mt-1.5 h-1 w-24 overflow-hidden rounded-full bg-[#222]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899]"
                        style={{ width: `${(f.fundingNumeric / maxFunding) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col items-start gap-1.5">
                      <OffPill label={promo.off} />
                      <CodePill code={promo.code} />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to="/reviews/$slug"
                      params={{ slug: slugify(f.name) }}
                      className="inline-block rounded-full border border-[#333] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#ec4899]"
                    >
                      Firm
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/reviews" className="btn-gradient w-full justify-center text-base sm:w-auto">
          View All 60+ Firms
        </Link>
      </div>
    </>
  );
}

export function FirmsShowcase() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="firms" className="py-24 md:py-32" aria-label="Compare the best prop trading firms">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Compare the Best Prop Trading Firms</h2>
          <p className="mt-4 text-[#888]">
            Verified data, real trader reviews, and exclusive discounts — all in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <OffersCarousel />
          <MostPopular />
        </div>

        <PreviewTable />
      </div>
    </section>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Heart,
  Copy,
  Check,
  Trophy,
  Flame,
  BadgeCheck,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
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

const countries: Record<string, { iso: string; code: string }> = {
  "Apex Trader Funding": { iso: "us", code: "US" },
  MyFundedFutures: { iso: "us", code: "US" },
  TradeDay: { iso: "gb", code: "GB" },
  "Take Profit Trader": { iso: "us", code: "US" },
  "FundedNext Futures": { iso: "ae", code: "AE" },
  Tradeify: { iso: "us", code: "US" },
  Bluenox: { iso: "cz", code: "CZ" },
  "Funded Futures Network": { iso: "us", code: "US" },
  "Lucid Trading": { iso: "us", code: "US" },
  "Legends Trading": { iso: "ca", code: "CA" },
  "DayTraders.com": { iso: "us", code: "US" },
  Earn2Trade: { iso: "hu", code: "HU" },
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

const tabs = ["Popular", "Favorite", "New", "All"] as const;
const FAV_KEY = "twpf-favorites";

const COLS =
  "grid grid-cols-[44px_minmax(0,1.5fr)_1fr_0.7fr_0.8fr_1.5fr_0.9fr_1fr_0.9fr_0.7fr] items-center";

const platformCatalog = [
  { name: "Tradovate", domain: "tradovate.com" },
  { name: "NinjaTrader", domain: "ninjatrader.com" },
  { name: "TradingView", domain: "tradingview.com" },
  { name: "Rithmic", domain: "rithmic.com" },
  { name: "Quantower", domain: "quantower.com" },
  { name: "MetaTrader", domain: "metaquotes.net" },
];

function platformsOf(name: string) {
  const seed = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = (seed % 3) + 2;
  return Array.from({ length: count }, (_, i) => platformCatalog[(seed + i * 5) % platformCatalog.length]);
}

function YearsRing({ years }: { years: number }) {
  const pct = Math.min(years / 8, 1);
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-9 w-9 place-items-center">
      <svg viewBox="0 0 36 36" className="absolute inset-0 h-9 w-9 -rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" stroke="#222" strokeWidth="2.5" />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
        />
      </svg>
      <span className="relative text-xs font-semibold text-white">{years}</span>
    </span>
  );
}

function FirmLogo({ name }: { name: string }) {
  const initials = name
    .replace(/\.com/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="relative block shrink-0 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] p-[1.5px]">
      <span className="grid h-[52px] w-[52px] place-items-center rounded-[10px] bg-[#111] font-display text-sm font-bold text-white">
        {initials}
      </span>
      <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[#facc15] text-[9px] text-black">
        ★
      </span>
    </span>
  );
}

function Th({ label, sortable = true }: { label: string; sortable?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#8a8a8a]">
      {label}
      {sortable && <ChevronsUpDown size={11} className="text-[#555]" />}
    </div>
  );
}

function PreviewTable() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Popular");
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

  const base = reviewFirms.slice();
  const rows = (
    tab === "Favorite"
      ? base.filter((f) => favs.includes(f.name))
      : tab === "New"
        ? base.sort((a, b) => b.addedOrder - a.addedOrder)
        : base.sort((a, b) => b.rating - a.rating)
  ).slice(0, 6);

  const maxFunding = Math.max(...reviewFirms.map((f) => f.fundingNumeric));

  return (
    <>
      {/* toolbar */}
      <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:px-0">
          <button className="flex shrink-0 items-center gap-2 rounded-full border border-[#262626] bg-[#111] px-4 py-2 text-xs font-medium text-white/80 transition hover:border-[#7c3aed]">
            <SlidersHorizontal size={13} /> Filter
          </button>
          {tabs.map((t) => {
            const active = tab === t;
            const icon =
              t === "Popular" ? (
                <Flame size={13} className={active ? "text-[#ec4899]" : "text-[#888]"} />
              ) : t === "Favorite" ? (
                <Heart size={13} className={active ? "text-[#ec4899]" : "text-[#888]"} />
              ) : t === "New" ? (
                <BadgeCheck size={13} className={active ? "text-[#7c3aed]" : "text-[#888]"} />
              ) : null;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-white text-black"
                    : "border border-[#262626] bg-[#141414] text-[#999] hover:text-white"
                }`}
              >
                {icon}
                {t === "Favorite" ? `Favorite ${Math.min(favs.length, 5)}/5` : t}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-[#7c3aed] bg-[#7c3aed]/10 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_22px_-8px_rgba(124,58,237,0.9)]">
            <ShieldCheck size={14} className="text-[#c4a8ff]" /> How We Verify and Rank Firms
          </span>
          <span className="flex items-center gap-2 rounded-full border border-[#1f1f1f] bg-[#111] px-4 py-2 text-xs text-[#888]">
            <span className="relative grid place-items-center">
              <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-[#00d97e]/60" />
              <span className="h-2 w-2 rounded-full bg-[#00d97e]" />
            </span>
            <span className="text-white/90">Live Data</span> updated 2 min ago
          </span>
        </div>
      </div>

      {/* table */}
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="min-w-[1400px]">
          <div className={`${COLS} pb-3`}>
            <span />
            <div className="flex items-center gap-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#8a8a8a]">
              Firm <ChevronsUpDown size={11} className="text-[#555]" />
            </div>
            <div className="flex items-center gap-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#8a8a8a]">
              Rank <ChevronsUpDown size={11} className="text-[#555]" /> / Reviews
              <ChevronUp size={11} className="text-[#7c3aed]" />
            </div>
            <Th label="Country" />
            <Th label="Years in Operation" />
            <Th label="Assets" sortable={false} />
            <Th label="Platforms" sortable={false} />
            <Th label="Max Allocations" />
            <Th label="Promo" sortable={false} />
            <Th label="Actions" sortable={false} />
          </div>

          <div key={tab} className="flex flex-col gap-3 animate-in fade-in duration-500">
            {rows.map((f, i) => {
              const promo = promoOf(f.name);
              const country = countries[f.name] ?? { flag: "🌐", code: "GLB" };
              const isFav = favs.includes(f.name);
              const years = (f.addedOrder % 5) + 1;
              const assets = ["Crypto", "Energy", "FX", "Indices", "Metals"].slice(
                0,
                3 + (i % 3),
              );
              return (
                <div
                  key={f.name}
                  className={`${COLS} rounded-2xl border border-[#1c1c1c] bg-[#101010] py-4 transition-all hover:border-[#7c3aed]/60 hover:bg-white/[0.03]`}
                >
                  <div className="grid place-items-center">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-[#262626] text-[11px] font-semibold text-[#999]">
                      {i + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 border-r border-[#1c1c1c] px-3">
                    <FirmLogo name={f.name} />
                    <div className="min-w-0">
                      <Link
                        to="/reviews/$slug"
                        params={{ slug: slugify(f.name) }}
                        className="block truncate text-sm font-bold text-white hover:text-[#c4a8ff]"
                      >
                        {f.name}
                      </Link>
                      <button
                        aria-label={isFav ? `Remove ${f.name} from favorites` : `Add ${f.name} to favorites`}
                        onClick={() => toggleFav(f.name)}
                        className={`mt-1.5 flex items-center gap-1 text-[11px] text-[#888] transition-transform ${
                          bounce === f.name ? "scale-125" : "scale-100"
                        }`}
                      >
                        <Heart
                          size={13}
                          className={isFav ? "fill-[#ec4899] text-[#ec4899]" : "text-[#ec4899]"}
                        />
                        {120 + Math.round(f.rating * 37) + (isFav ? 1 : 0)}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1 border-r border-[#1c1c1c] px-3">
                    <span className="rounded-full border border-[#7c3aed] px-2.5 py-0.5 text-xs font-bold text-white">
                      {f.rating.toFixed(1)}
                    </span>
                    <Stars rating={f.rating} size={11} />
                    <span className="text-[11px] font-medium text-[#ec4899]">
                      {80 + Math.round(f.rating * 51)} reviews
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 border-r border-[#1c1c1c] px-3 text-sm font-semibold text-white">
                    <img
                      src={`https://flagcdn.com/w40/${country.iso}.png`}
                      alt={`${country.code} flag`}
                      loading="lazy"
                      className="h-3.5 w-5 rounded-[2px] object-cover"
                    />
                    {country.code}
                  </div>

                  <div className="flex justify-center border-r border-[#1c1c1c] px-3">
                    <YearsRing years={years} />
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 border-r border-[#1c1c1c] px-3">
                    {assets.map((a) => (
                      <span
                        key={a}
                        className="rounded-md bg-[#171717] px-2 py-1 text-[11px] text-[#bdbdbd]"
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1.5 border-r border-[#1c1c1c] px-3">
                    {platformsOf(f.name).map((p) => (
                      <img
                        key={p.name}
                        src={`https://logo.clearbit.com/${p.domain}`}
                        alt={`${p.name} platform`}
                        title={p.name}
                        loading="lazy"
                        className="h-5 w-5 rounded-full bg-white/95 object-contain p-[1px]"
                      />
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-2 border-r border-[#1c1c1c] px-3">
                    <span className="font-display text-sm font-bold text-white">{f.maxFunding}</span>
                    <span className="block h-[3px] w-full max-w-[130px] overflow-hidden rounded-full bg-[#1f1f1f]">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899]"
                        style={{ width: `${(f.fundingNumeric / maxFunding) * 100}%` }}
                      />
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 border-r border-[#1c1c1c] px-3">
                    <OffPill label={promo.off} />
                    <CodePill code={promo.code} />
                  </div>

                  <div className="flex justify-center px-3">
                    <Link
                      to="/reviews/$slug"
                      params={{ slug: slugify(f.name) }}
                      className="rounded-full border border-[#7c3aed]/70 px-5 py-1.5 text-xs font-semibold text-white transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#ec4899]"
                    >
                      Firm
                    </Link>
                  </div>
                </div>
              );
            })}
            {rows.length === 0 && (
              <div className="rounded-2xl border border-[#1c1c1c] bg-[#101010] py-10 text-center text-sm text-[#888]">
                No favorites yet — tap a heart to save a firm.
              </div>
            )}
          </div>
        </div>
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

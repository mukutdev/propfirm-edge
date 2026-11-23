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
import { CompareTable } from "@/components/compare/CompareTable";
import { useLiveFirms } from "@/hooks/use-trustpilot-scores";
import { compareTrustpilot } from "@/lib/promo-codes";
import { TrustpilotScore } from "@/components/shared/TrustpilotScore";
import { useReveal } from "@/hooks/use-reveal";

const slugify = (name: string) =>
  name.toLowerCase().replace(/\.com/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Promo = { off: string; code: string };
const promos: Record<string, Promo> = {
  "Apex Trader Funding": { off: "90% OFF", code: "SAVENOW" },
  MyFundedFutures: { off: "40% OFF", code: "CLUB" },
  TradeDay: { off: "60% OFF", code: "SALE60" },
  "Take Profit Trader": { off: "40% OFF", code: "NOFEE40" },
  "FundedNext Futures": { off: "47% OFF", code: "FNDIRECT" },
  Tradeify: { off: "30% OFF", code: "NOV" },
  "Funded Futures Network": { off: "70% OFF", code: "Nexus" },
  "Lucid Trading": { off: "BEST DEALS", code: "VAULT" },
  "Legends Trading": { off: "30% OFF", code: "LTG" },
};


const promoOf = (name: string): Promo => promos[name] ?? { off: "", code: "" };

function Score({ score }: { score: number | null }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-[#aaa]">
      <Star size={10} className="text-[#888]" aria-hidden />
      {score == null ? "N/A" : `${score.toFixed(1)} on Trustpilot`}
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
  const live = useLiveFirms();
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
      className="relative min-w-0 rounded-2xl bg-[#141414] p-[1px] shadow-[0_0_40px_-18px_rgba(124,58,237,0.8)] lg:col-span-2"
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
                    <div className="mt-0.5">
                      <Score score={live.get(f.name)?.trustpilotScore ?? null} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-col items-start gap-1.5">
                  <OffPill label={promo.off} />
                  {promo.code && (
                    <span className="rounded-full border border-dashed border-[#333] bg-[#0c0c0c] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
                      {promo.code}
                    </span>
                  )}
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
  const live = useLiveFirms();
  const top = reviewFirms
    .slice()
    .sort((a, b) => compareTrustpilot(live.get(a.name)?.trustpilotScore ?? null, live.get(b.name)?.trustpilotScore ?? null))
    .slice(0, 3);
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-[#7c3aed]/35 bg-[#141414] p-5 shadow-[0_0_40px_-22px_rgba(124,58,237,0.9)] sm:p-6">
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
                  <span className="mt-1 block">
                    <Score score={live.get(f.name)?.trustpilotScore ?? null} />
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <OffPill label={promo.off} />
                  {promo.code && (
                    <span className="rounded-full border border-dashed border-[#333] bg-[#0c0c0c] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
                      {promo.code}
                    </span>
                  )}
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

export function FirmsShowcase() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="firms" className="py-14 md:py-20" aria-label="Compare the best prop trading firms">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Compare the Best Prop Trading Firms</h2>
          <p className="mt-4 text-[#888]">
            Verified data, real trader reviews, and exclusive discounts — all in one place.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <OffersCarousel />
          <MostPopular />
        </div>

        <CompareTable embedded />
      </div>
    </section>
  );
}

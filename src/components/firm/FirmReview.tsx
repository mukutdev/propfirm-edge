import { useEffect, useMemo, useRef, useState } from "react";
import {
  Star, Check, X, Copy, Clock, Rocket, Zap, Target, ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { FirmDetail } from "@/lib/firm-detail-data";
import { VerifiedReviews } from "@/components/firm/VerifiedReviews";
import type { FirmReviewEntry } from "@/lib/firms.functions";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "rules", label: "Evaluation Rules" },
  { id: "pricing", label: "Pricing" },
  { id: "payout", label: "Payout" },
  { id: "platforms", label: "Platforms" },
  { id: "proscons", label: "Pros & Cons" },
  { id: "bestfor", label: "Best For" },
  { id: "reviews", label: "Trader Reviews" },
  { id: "verdict", label: "Final Verdict" },
  { id: "alternatives", label: "Alternatives" },
];

function GradientStars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.round(rating);
        return (
          <Star
            key={i}
            size={size}
            className={filled ? "text-[#facc15] fill-[#facc15]" : "text-[#333]"}
          />
        );
      })}
    </div>
  );
}

function ProgressBar({ score, animate }: { score: number; animate: boolean }) {
  const pct = (score / 5) * 100;
  return (
    <div className="h-2 bg-[#222] rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-brand rounded-full transition-[width] duration-1000 ease-out"
        style={{ width: animate ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

function FirmLogoBlock({ name, size = "lg" }: { name: string; size?: "lg" | "sm" | "md" }) {
  const dims = size === "lg" ? "h-20 w-40 text-sm" : size === "md" ? "h-14 w-28 text-xs" : "h-12 w-12 text-[10px]";
  return (
    <div className={`${dims} rounded-xl bg-[#1C1C1C] border border-[#222] flex items-center justify-center font-display font-semibold text-white/80 text-center px-2`}>
      {name}
    </div>
  );
}

function PageHeader({ firm }: { firm: FirmDetail }) {
  return (
    <section className="relative pt-28 pb-12 overflow-hidden border-b border-[#222]">
      <div className="hero-bloom opacity-40" />
      <div className="grid-lines" />
      <div className="relative max-w-7xl mx-auto px-6">
        <nav className="text-xs text-[#888] mb-8" aria-label="Breadcrumb">
          <a href="/" className="hover:text-white">Home</a>
          <span className="mx-2 text-[#444]">/</span>
          <a href="/reviews" className="hover:text-white">Reviews</a>
          <span className="mx-2 text-[#444]">/</span>
          <span className="text-white/80">{firm.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <FirmLogoBlock name={firm.name} />
          <div className="flex-1">
            <h1 className="font-display font-bold text-4xl md:text-5xl">{firm.name}</h1>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <GradientStars rating={firm.rating} size={20} />
              <span className="font-display font-bold text-xl">
                <span className="text-gradient">{firm.rating.toFixed(1)}</span>
                <span className="text-[#666] text-base"> / 5</span>
              </span>
            </div>
            <p className="text-sm text-[#888] mt-3 max-w-xl">{firm.tagline}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a href={firm.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="btn-gradient">
                Visit {firm.name} <ExternalLink size={14} />
              </a>
              <a
                href="#"
                className="btn-ghost border-2"
                style={{
                  borderImage: "linear-gradient(135deg, #7c3aed, #ec4899) 1",
                  borderColor: "#7c3aed",
                }}
              >
                Get Exclusive Discount
              </a>
              {firm.trustpilotUrl && (
                <a
                  href={firm.trustpilotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost border border-[#333] text-sm"
                >
                  View on Trustpilot <ExternalLink size={13} />
                </a>
              )}
            </div>
            <p className="text-xs text-[#666] mt-4">Last updated: {firm.lastUpdated}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerdictCard({ firm }: { firm: FirmDetail }) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">
      <div className="card-surface p-7 md:p-9 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-brand" />
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c4a8ff] font-semibold">⚡ Our Verdict</div>
          <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-brand text-white font-semibold">
            {firm.recommended}
          </span>
        </div>
        <p className="mt-4 text-lg text-white/90 leading-relaxed">{firm.verdict}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-7">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">What we love</div>
            <ul className="space-y-2">
              {firm.quickPros.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-white/90">
                  <Check size={16} className="text-[#00d97e] shrink-0 mt-0.5" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Watch out for</div>
            <ul className="space-y-2">
              {firm.quickCons.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-white/90">
                  <X size={16} className="text-[#ff3b5c] shrink-0 mt-0.5" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsGrid({ firm }: { firm: FirmDetail }) {
  const items = [
    { label: "Max Account Size", value: firm.stats.maxAccount, highlight: true },
    { label: "Profit Split", value: firm.stats.profitSplit, highlight: true },
    { label: "Evaluation Cost", value: firm.stats.challengeFee },
    { label: "Drawdown Type", value: firm.stats.drawdownType },
    { label: "Payout Frequency", value: firm.stats.payoutFrequency },
    { label: "Instruments", value: firm.stats.instruments },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((s) => (
        <div key={s.label} className="card-surface p-5">
          <div className={`font-display font-bold text-2xl md:text-3xl ${s.highlight ? "text-gradient" : "text-white"}`}>{s.value}</div>
          <div className="text-[11px] uppercase tracking-wider text-[#888] mt-2">{s.label}</div>
        </div>
      ))}
    </section>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display font-bold text-3xl md:text-4xl gradient-underline scroll-mt-32">
      {children}
    </h2>
  );
}

function Overview({ firm }: { firm: FirmDetail }) {
  return (
    <section className="space-y-5">
      <SectionHeading id="overview">What is {firm.name}?</SectionHeading>
      {firm.overview.map((p, i) => (
        <p key={i} className="text-[#bbb] leading-relaxed">{p}</p>
      ))}
    </section>
  );
}

function RulesTable({ firm }: { firm: FirmDetail }) {
  return (
    <section className="space-y-6">
      <SectionHeading id="rules">Evaluation Rules & Risk Limits</SectionHeading>
      <div className="overflow-x-auto rounded-xl border border-[#222]">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="bg-[#111]">
              <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-gradient font-semibold">Rule</th>
              <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-gradient font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {firm.rules.map((r, i) => (
              <tr key={r.rule} className={i % 2 === 0 ? "bg-[#141414]" : "bg-[#1a1a1a]"}>
                <td className="px-5 py-4 font-semibold">{r.rule}</td>
                <td className="px-5 py-4 text-white/90">{r.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Pricing({ firm }: { firm: FirmDetail }) {
  return (
    <section className="space-y-6">
      <SectionHeading id="pricing">Account Sizes & Pricing</SectionHeading>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {firm.pricing.map((p) => (
          <div
            key={p.size}
            className={`card-surface p-6 relative ${p.popular ? "border-[#7c3aed]/60 shadow-[0_0_0_1px_rgba(124,58,237,0.4)]" : ""}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-brand text-white font-semibold">
                Most Popular
              </span>
            )}
            <div className="text-xs uppercase tracking-wider text-[#888]">Account Size</div>
            <div className="font-display font-bold text-3xl mt-1">{p.size}</div>
            <div className="text-sm text-[#888] mt-4">Evaluation cost</div>
            <div className="font-display font-semibold text-xl">{p.fee}</div>
            <a href={firm.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="btn-gradient w-full mt-6 text-sm">Start This Evaluation</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Payout({ firm }: { firm: FirmDetail }) {
  return (
    <section className="space-y-6">
      <SectionHeading id="payout">Payout Structure</SectionHeading>

      <div className="card-surface p-7">
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-white/90">You keep <span className="font-bold text-[#00d97e]">{firm.payout.splitTrader}%</span></span>
          <span className="text-white/90">Firm keeps <span className="font-bold text-white">{firm.payout.splitFirm}%</span></span>
        </div>
        <div className="h-4 rounded-full overflow-hidden bg-[#222] flex">
          <div className="h-full bg-gradient-brand" style={{ width: `${firm.payout.splitTrader}%` }} />
          <div className="h-full bg-[#2a2a2a]" style={{ width: `${firm.payout.splitFirm}%` }} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-7">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#888] mb-2">Payout Timeline</div>
            <p className="text-sm text-white/90 leading-relaxed">{firm.payout.timeline}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#888] mb-2">Withdrawal Methods</div>
            <div className="flex flex-wrap gap-2">
              {firm.payout.methods.map((m) => (
                <span key={m} className="text-xs px-3 py-1.5 rounded-full bg-[#1f1f1f] border border-[#2a2a2a] text-white/90">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Platforms({ firm }: { firm: FirmDetail }) {
  return (
    <section className="space-y-6">
      <SectionHeading id="platforms">Platforms & Instruments</SectionHeading>
      <div className="card-surface p-7 space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Trading Platforms</div>
          <div className="flex flex-wrap gap-2">
            {firm.platforms.map((p) => (
              <span key={p} className="text-sm px-4 py-2 rounded-lg bg-[#1f1f1f] border border-[#2a2a2a] text-white/90 font-medium">{p}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Supported Instruments</div>
          <div className="flex flex-wrap gap-2">
            {firm.instruments.map((i) => (
              <span key={i} className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-md bg-[#222] text-[#aaa]">{i}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProsCons({ firm }: { firm: FirmDetail }) {
  return (
    <section className="space-y-6">
      <SectionHeading id="proscons">Pros & Cons</SectionHeading>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-surface p-6">
          <div className="text-sm uppercase tracking-wider text-[#00d97e] font-bold mb-4">Pros</div>
          <ul className="space-y-3">
            {firm.pros.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-white/90 leading-relaxed">
                <Check size={16} className="text-[#00d97e] shrink-0 mt-0.5" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-surface p-6">
          <div className="text-sm uppercase tracking-wider text-[#ff3b5c] font-bold mb-4">Cons</div>
          <ul className="space-y-3">
            {firm.cons.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-white/90 leading-relaxed">
                <X size={16} className="text-[#ff3b5c] shrink-0 mt-0.5" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const iconMap = { rocket: Rocket, zap: Zap, target: Target };

function BestFor({ firm }: { firm: FirmDetail }) {
  return (
    <section className="space-y-6">
      <SectionHeading id="bestfor">Who Is It Best For?</SectionHeading>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {firm.bestFor.map((b) => {
          const Icon = iconMap[b.icon];
          return (
            <div key={b.label} className="card-surface p-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-brand flex items-center justify-center text-white mb-4">
                <Icon size={18} />
              </div>
              <div className="font-display font-bold text-base">{b.label}</div>
              <p className="text-sm text-[#888] mt-2 leading-relaxed">{b.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}




function VerdictRatings({ firm }: { firm: FirmDetail }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="space-y-6">
      <SectionHeading id="verdict">Verdict & Final Rating</SectionHeading>
      <div className="card-surface p-7 md:p-9">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="space-y-4 flex-1">
            {firm.ratings.map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/90 font-medium">{r.label}</span>
                  <span className="text-gradient font-display font-bold">{r.score.toFixed(1)} / 5</span>
                </div>
                <ProgressBar score={r.score} animate={visible} />
              </div>
            ))}
          </div>
          <div className="text-center md:border-l md:border-[#222] md:pl-8">
            <div className="text-xs uppercase tracking-wider text-[#888]">Overall Score</div>
            <div className="font-display font-bold text-6xl text-gradient mt-2">{firm.rating.toFixed(1)}</div>
            <div className="text-sm text-[#888]">out of 5</div>
          </div>
        </div>

        <p className="mt-8 text-[#bbb] leading-relaxed border-t border-[#222] pt-6">{firm.finalRecommendation}</p>

        <div className="mt-6 flex flex-col items-center">
          <a href={firm.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="btn-gradient text-base px-8 py-3.5">
            Visit {firm.name} <ExternalLink size={14} />
          </a>
          <p className="text-xs text-[#666] mt-3 text-center max-w-md">
            This link is an affiliate link. We may earn a commission at no cost to you.
          </p>
        </div>
      </div>
    </section>
  );
}

function Alternatives({ firm }: { firm: FirmDetail }) {
  return (
    <section className="space-y-6">
      <SectionHeading id="alternatives">Compare Alternatives</SectionHeading>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {firm.alternatives.map((a) => (
          <div key={a.slug} className="card-surface p-5">
            <FirmLogoBlock name={a.name} size="md" />
            <div className="font-display font-bold text-lg mt-4">{a.name}</div>
            <GradientStars rating={a.rating} size={14} />
            <div className="grid grid-cols-2 gap-3 mt-4 py-3 border-y border-[#222]">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#888]">Funding</div>
                <div className="font-display font-semibold">{a.maxFunding}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#888]">Split</div>
                <div className="font-display font-semibold text-[#00d97e]">{a.split}</div>
              </div>
            </div>
            <Link to="/reviews/$slug" params={{ slug: a.slug }} className="btn-ghost w-full mt-4 text-sm py-2.5 block text-center">View Review</Link>
          </div>
        ))}
      </div>
      <div className="text-center pt-2">
        <a href="/reviews" className="text-sm font-semibold text-[#c4a8ff] hover:text-white">View Full Comparison →</a>
      </div>
    </section>
  );
}

function Sidebar({ firm }: { firm: FirmDetail }) {
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    observers.push(io);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const copy = () => {
    navigator.clipboard?.writeText(firm.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const compactStats = [
    { label: "Max Account", value: firm.stats.maxAccount },
    { label: "Profit Split", value: firm.stats.profitSplit },
    { label: "Eval Cost", value: firm.stats.challengeFee },
    { label: "Payout", value: firm.stats.payoutFrequency },
  ];

  return (
    <aside className="hidden lg:flex flex-col gap-6 w-[320px] shrink-0 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
      <div className="card-surface p-6">
        <div className="flex items-center gap-4">
          <FirmLogoBlock name={firm.name} size="md" />
          <div>
            <div className="font-display font-bold text-base">{firm.name}</div>
            <GradientStars rating={firm.rating} size={14} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5 py-4 border-y border-[#222]">
          {compactStats.map((s) => (
            <div key={s.label}>
              <div className="text-[10px] uppercase tracking-wider text-[#888]">{s.label}</div>
              <div className="font-display font-semibold text-sm">{s.value}</div>
            </div>
          ))}
        </div>
        <a href={firm.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="btn-gradient w-full mt-5 text-sm py-2.5">Visit {firm.name}</a>
        <a href="#reviews" className="btn-ghost w-full mt-2 text-sm py-2.5">Read Trader Reviews</a>

        <div className="mt-5 pt-5 border-t border-[#222]">
          {firm.couponCode && (<>
          <div className="text-[10px] uppercase tracking-wider text-[#888] mb-2">Exclusive Code</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-[#0a0a0a] border border-dashed border-[#7c3aed] rounded-md px-3 py-2 text-center font-mono text-sm">{firm.couponCode}</code>
            <button onClick={copy} aria-label="Copy code" className="h-9 w-9 rounded-md border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-[#7c3aed]">
              {copied ? <Check size={14} className="text-[#00d97e]" /> : <Copy size={14} />}
            </button>
          </div>
          </>)}
          <div className="flex items-center gap-1.5 text-xs text-[#888] mt-3">
            <Clock size={12} /> Data checked <span className="text-white/90 font-semibold">{firm.lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="card-surface p-6">
        <div className="text-xs uppercase tracking-wider text-[#888] font-semibold mb-4">Rating Breakdown</div>
        <div className="space-y-3">
          {firm.ratings.map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/90">{r.label}</span>
                <span className="text-gradient font-semibold">{r.score.toFixed(1)}</span>
              </div>
              <ProgressBar score={r.score} animate />
            </div>
          ))}
        </div>
      </div>

      <div className="card-surface p-6">
        <div className="text-xs uppercase tracking-wider text-[#888] font-semibold mb-4">On This Page</div>
        <ul className="space-y-1.5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`block text-sm py-1.5 px-3 rounded-md transition ${
                  activeId === s.id ? "text-white bg-[#7c3aed]/15 border-l-2 border-[#7c3aed]" : "text-[#888] hover:text-white"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function MobileStickyCTA({ firm }: { firm: FirmDetail }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#141414]/95 backdrop-blur-md border-t border-[#222] animate-fade-in">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-sm truncate">{firm.name}</div>
          <div className="flex items-center gap-1">
            <GradientStars rating={firm.rating} size={11} />
            <span className="text-[11px] text-[#888] ml-1">{firm.rating.toFixed(1)}</span>
          </div>
        </div>
        <a href={firm.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="btn-gradient text-sm py-2.5">Visit Firm</a>
      </div>
    </div>
  );
}

export function FirmReview({
  firm,
  reviews,
  averageRating,
  reviewCount,
}: {
  firm: FirmDetail;
  reviews: FirmReviewEntry[];
  averageRating: number;
  reviewCount: number;
}) {
  const memoFirm = useMemo(() => firm, [firm]);
  return (
    <>
      <PageHeader firm={memoFirm} />
      <VerdictCard firm={memoFirm} />
      <StatsGrid firm={memoFirm} />

      <div className="max-w-7xl mx-auto px-6 mt-16 flex gap-10">
        <div className="flex-1 min-w-0 space-y-16">
          <Overview firm={memoFirm} />
          <RulesTable firm={memoFirm} />
          <Pricing firm={memoFirm} />
          <Payout firm={memoFirm} />
          <Platforms firm={memoFirm} />
          <ProsCons firm={memoFirm} />
          <BestFor firm={memoFirm} />
          <VerifiedReviews
            firmId={memoFirm.id}
            firmName={memoFirm.name}
            reviews={reviews}
            averageRating={averageRating}
            reviewCount={reviewCount}
          />
          <VerdictRatings firm={memoFirm} />
          <Alternatives firm={memoFirm} />
        </div>
        <Sidebar firm={memoFirm} />
      </div>

      <MobileStickyCTA firm={memoFirm} />
    </>
  );
}
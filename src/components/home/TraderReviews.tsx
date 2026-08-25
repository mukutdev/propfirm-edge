import { useRef } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

type Review = {
  name: string;
  initials: string;
  rating: number;
  firm: string;
  text: string;
  date: string;
};

const reviews: Review[] = [
  {
    name: "Marcus T.",
    initials: "MT",
    rating: 5,
    firm: "Apex Trader Funding",
    text: "Passed the eval in nine days and my first payout landed in under 48 hours. The trailing drawdown takes getting used to but the rules are clear and support actually replies.",
    date: "Aug 2026",
  },
  {
    name: "Priya S.",
    initials: "PS",
    rating: 4,
    firm: "MyFundedFutures",
    text: "No daily loss limit on the Starter plan changed how I trade. Fees are fair, dashboard is clean. Only gripe is the platform fee not being bundled in.",
    date: "Jul 2026",
  },
  {
    name: "Devin R.",
    initials: "DR",
    rating: 5,
    firm: "TradeDay",
    text: "The static drawdown is the most forgiving I've traded. Two payouts, both processed same week. Would recommend for anyone new to funded futures.",
    date: "Jul 2026",
  },
  {
    name: "Lena K.",
    initials: "LK",
    rating: 4,
    firm: "Tradeify",
    text: "Cheapest entry I could find that still felt legit. Straightforward consistency rule, and the funded account transition was instant after I hit target.",
    date: "Jun 2026",
  },
  {
    name: "Omar H.",
    initials: "OH",
    rating: 5,
    firm: "Take Profit Trader",
    text: "Payouts from day one is not marketing spin — I withdrew in my first week funded. Rules are strict on scaling but that kept me disciplined.",
    date: "Jun 2026",
  },
];

const pills = ["✓ Real Traders Only", "✓ Verified Purchase", "✓ No Paid Reviews"];

export function TraderReviews() {
  const ref = useReveal<HTMLDivElement>();
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20" aria-label="Verified trader reviews">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="font-display font-bold text-3xl md:text-4xl gradient-underline">
            What Real Traders Are Saying
          </h2>
          <p className="mt-3 text-[#888] max-w-xl text-sm">
            Reviews from traders who took the evaluation, got funded, and requested a payout.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {pills.map((p) => (
            <span
              key={p}
              className="text-[11px] px-3 py-1.5 rounded-full border border-[#2a2a2a] bg-[#141414] text-white/80"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="group/rail relative rail-fade -mx-6">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll reviews left"
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[#2a2a2a] bg-[#141414]/90 p-2 text-white/80 opacity-0 transition-opacity hover:border-[#7c3aed] group-hover/rail:opacity-100 md:block"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll reviews right"
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[#2a2a2a] bg-[#141414]/90 p-2 text-white/80 opacity-0 transition-opacity hover:border-[#7c3aed] group-hover/rail:opacity-100 md:block"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={railRef}
            className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 pb-2"
          >
            {reviews.map((r, i) => (
              <article
                key={r.name}
                className="card-surface p-6 min-w-[300px] max-w-[320px] snap-start flex flex-col animate-fade-in"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-white">
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-display font-bold text-base">{r.name}</div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          className={s <= r.rating ? "fill-[#facc15] text-[#facc15]" : "text-[#333]"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 inline-flex self-start items-center gap-2 rounded-md border border-[#222] bg-[#1c1c1c] px-2.5 py-1.5">
                  <span className="h-4 w-8 rounded bg-gradient-brand opacity-70" />
                  <span className="text-[11px] text-white/75">{r.firm}</span>
                </div>

                <p className="mt-4 text-sm text-[#888] line-clamp-4">{r.text}</p>
                <Link to="/reviews" className="mt-1.5 text-xs font-semibold text-gradient self-start">
                  Read more
                </Link>

                <div className="mt-5 pt-4 border-t border-[#222] flex items-center justify-between">
                  <span className="text-[11px] text-[#888]">{r.date}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-[#00d97e]/40 bg-[#00d97e]/10 text-[#5cf3ad]">
                    <BadgeCheck size={11} /> Verified
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/90 font-display font-semibold text-lg">
            Traded a funded account? Post the details other traders need.
          </p>
          <Link to="/contact" className="btn-gradient mt-5">Write a Review</Link>
          <p className="mt-3 text-xs text-[#888]">Rules, fills, payout times — the parts marketing pages leave out.</p>
        </div>
      </div>
    </section>
  );
}

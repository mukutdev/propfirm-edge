import { Link } from "@tanstack/react-router";
import { TradingViewWidget } from "./TradingViewWidget";
import { CountUp } from "./CountUp";

const heroOverviewTabs = [
  {
    title: "Futures",
    symbols: [
      { s: "CME_MINI:NQ1!", d: "Nasdaq" },
      { s: "CME_MINI:ES1!", d: "S&P 500" },
      { s: "COMEX:GC1!", d: "Gold" },
      { s: "NYMEX:CL1!", d: "Crude Oil" },
    ],
    originalTitle: "Futures",
  },
];

export function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden pt-28 pb-14 md:pb-16"
      aria-label="Hero"
    >
      <div className="hero-bloom" />
      <div className="grid-lines-animated" />

      <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
        <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-white/45">
          Futures · Forex · Funded Accounts
        </p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
          Find Your Edge.
          <br />
          <span className="text-gradient">Get Funded. Keep What You Earn.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-[#8d8d8d] max-w-2xl mx-auto leading-relaxed">
          Independent prop firm reviews, real trader ratings, and verified discount codes — built by a
          futures trader, not a marketing team.
        </p>

        {/* Live ticker tape — sells the real-data feel immediately */}
        <div className="mt-8 min-h-[52px] rounded-xl border border-[#7c3aed]/35 bg-[#141414] p-1 overflow-hidden">
          <div className="hidden sm:block">
            <TradingViewWidget
              type="ticker-tape"
              config={{
                symbols: heroSymbols,
                showSymbolLogo: true,
                colorTheme: "dark",
                isTransparent: true,
                displayMode: "adaptive",
                locale: "en",
              }}
            />
          </div>
          <div className="sm:hidden">
            <TradingViewWidget
              type="ticker-tape"
              config={{
                symbols: heroSymbols.slice(0, 3),
                showSymbolLogo: true,
                colorTheme: "dark",
                isTransparent: true,
                displayMode: "compact",
                locale: "en",
              }}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/compare" className="btn-gradient">Compare Prop Firms</Link>
          <Link to="/reviews" className="btn-ghost">Read Real Reviews</Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#8d8d8d]">
          <span>
            <span className="text-white font-semibold"><CountUp to={12} suffix="+" /></span> Firms Tracked
          </span>
          <span className="hidden sm:inline text-[#333]">|</span>
          <span>
            <span className="text-white font-semibold"><CountUp to={11500} suffix="+" /></span> Real Reviews
          </span>
          <span className="hidden sm:inline text-[#333]">|</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d97e] shadow-[0_0_6px_1px_rgba(0,217,126,0.6)]" />
            Updated Daily
          </span>
        </div>
      </div>
    </section>
  );
}

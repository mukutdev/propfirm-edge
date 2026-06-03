import { TickerBar } from "./TickerBar";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden" aria-label="Hero">
      <div className="hero-bloom" />
      <div className="grid-lines" />

      <div className="relative max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
          Find Your Edge · Get Funded · Trade For Real
        </p>
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight">
          The Smartest Way To <br className="hidden sm:block" />
          Get <span className="text-gradient">Prop Funded</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-[#888] max-w-2xl mx-auto leading-relaxed">
          Unbiased reviews, real comparisons and exclusive discounts on the top prop firms for futures traders.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#compare" className="btn-gradient">Compare Prop Firms</a>
          <a href="#firms" className="btn-ghost">See All Reviews</a>
        </div>
      </div>

      <div className="relative mt-16">
        <TickerBar />
      </div>
    </section>
  );
}
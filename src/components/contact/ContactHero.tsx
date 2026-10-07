import { Link } from "@tanstack/react-router";

export function ContactHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <nav className="text-xs text-[#888] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-white">Contact</span>
        </nav>
        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
          Have a Question?{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg,#7C3AED,#EC4899)" }}
          >
            Let's Talk About Trading.
          </span>
        </h1>
        <p className="mt-5 text-[#bbb] text-base md:text-lg max-w-xl mx-auto">
          Question about a prop firm, futures trading, or Trading With Prop Firms? We want to hear from you.
        </p>
      </div>
    </section>
  );
}
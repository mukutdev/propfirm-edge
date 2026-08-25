import { Link } from "@tanstack/react-router";

export function ContactHero() {
  return (
    <section className="relative pt-28 pb-10 overflow-hidden">
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
          Get In{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg,#7C3AED,#EC4899)" }}
          >
            Touch
          </span>
        </h1>
        <p className="mt-5 text-[#bbb] text-base md:text-lg max-w-xl mx-auto">
          Questions about a firm, partnership enquiries, or a rule change we missed — I read every message myself.
        </p>
      </div>
    </section>
  );
}
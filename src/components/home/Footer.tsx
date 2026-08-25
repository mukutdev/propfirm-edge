import { Youtube, MessageCircle, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SessionMiniWidget } from "@/components/shared/SessionStatus";

const cols: { title: string; items: { label: string; to: string }[] }[] = [
  {
    title: "Quick Links",
    items: [
      { label: "Reviews", to: "/reviews" },
      { label: "Compare", to: "/compare" },
      { label: "Coupons", to: "/coupons" },
      { label: "News", to: "/news" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Submit a Review", to: "/contact" },
      { label: "Advertise", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Affiliate Disclaimer", to: "/about" },
      { label: "Privacy Policy", to: "/about" },
      { label: "Terms", to: "/about" },
      { label: "Risk Disclosure", to: "/about" },
    ],
  },
];

const socials = [
  { Icon: Youtube, label: "YouTube" },
  { Icon: MessageCircle, label: "Discord" },
  { Icon: Twitter, label: "X" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#222] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-10 w-10 rounded-lg bg-[#141414] border border-[#7c3aed]/35 flex items-center justify-center">
              <img src={logoMark} alt="Trading With Prop Firms logo" loading="lazy" width={1024} height={1024} className="h-6 w-6 object-contain" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-[15px]">
                Trading<span className="text-gradient">WithPropFirms</span>
              </span>
              <span className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-[#777]">Futures · Funded</span>
            </span>
          </div>

          <p className="text-sm text-[#888] leading-relaxed">
            Prop firm reviews for traders who actually take evaluations, hit payouts, and care about
            drawdown rules.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="group h-9 w-9 rounded-full border border-[#222] flex items-center justify-center text-white/70 transition-all hover:border-transparent hover:bg-gradient-brand hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <SessionMiniWidget />
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white mb-4">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.items.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="text-sm text-[#888] hover:text-white transition-colors">{i.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#222] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-xs leading-relaxed text-[#8d8d8d]">
            <span className="font-semibold text-white/80">Risk disclosure:</span> Trading futures and
            forex involves substantial risk of loss and is not suitable for all investors. Past
            performance is not indicative of future results.
          </p>
        </div>
      </div>

      <div className="border-t border-[#1b1b1b]">
        <div className="max-w-7xl mx-auto px-6 py-5 text-[11px] text-[#666] text-center md:text-left">
          © 2026 TradingWithPropFirms.com — This site contains affiliate links. We may earn a commission at no cost to you.
        </div>
      </div>
    </footer>
  );
}

import { Youtube, MessageCircle, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";

const cols: { title: string; items: { label: string; to: string }[] }[] = [
  {
    title: "Quick Links",
    items: [
      { label: "Reviews", to: "/reviews" },
      { label: "Compare", to: "/compare" },
      { label: "Coupons", to: "/coupons" },
      { label: "News", to: "/news" },
      { label: "Blog", to: "/blog" },
      { label: "Quiz", to: "/quiz" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Affiliate Disclaimer", to: "/about" },
      { label: "Privacy Policy", to: "/about" },
      { label: "Terms", to: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#222] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-md bg-gradient-brand" />
            <span className="font-display font-bold">TWPF</span>
          </div>
          <p className="text-sm text-[#888] leading-relaxed">
            Find Your Edge. Get Funded. Trade For Real.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Youtube, MessageCircle, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-[#222] flex items-center justify-center text-white/70 hover:text-white hover:border-[#7c3aed] transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
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

      <div className="border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-[#666] text-center md:text-left">
          © 2025 TradingWithPropFirms.com — This site contains affiliate links. We may earn a commission at no cost to you.
        </div>
      </div>
    </footer>
  );
}
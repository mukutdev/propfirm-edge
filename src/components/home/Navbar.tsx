import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links: { label: string; to: string; external?: boolean }[] = [
  { label: "Reviews", to: "/reviews" },
  { label: "Compare", to: "/compare" },
  { label: "News", to: "/news" },
  { label: "Coupons", to: "/coupons" },
  { label: "Blog", to: "/blog" },
  { label: "Quiz", to: "/quiz" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#141414]/90 backdrop-blur-md border-b border-[#222]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Trading With Prop Firms home">
          <div className="h-9 w-9 rounded-md bg-gradient-brand" />
          <span className="font-display font-bold text-base hidden sm:inline">TWPF</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-6 text-sm text-white/80">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                className="hover:text-white transition-colors"
                activeProps={{ className: "text-white font-semibold" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link to="/quiz" className="btn-gradient text-sm">Find A Prop Firm</Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#080808]/98 backdrop-blur-md z-40 animate-fade-in">
          <div className="flex flex-col gap-2 p-8">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-2xl font-display font-semibold py-3 border-b border-[#222]"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/quiz" onClick={() => setOpen(false)} className="btn-gradient mt-6 text-center">
              Find A Prop Firm
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
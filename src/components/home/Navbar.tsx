import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SessionStrip } from "@/components/shared/SessionStatus";
import logoMark from "@/assets/logo-mark.png";


const links: { label: string; to: string }[] = [
  { label: "Reviews", to: "/reviews" },
  { label: "Compare", to: "/compare" },
  { label: "News", to: "/news" },
  { label: "Position Calculator", to: "/tools/position-calculator" },
  { label: "Coupons", to: "/coupons" },
  { label: "Blog", to: "/blog" },
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
    <header className="fixed top-0 left-0 right-0 z-50">
      <SessionStrip />

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#222]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Trading With Prop Firms home">
            <span className="logo-mark h-9 w-9 rounded-lg bg-[#141414] border border-[#7c3aed]/35 flex items-center justify-center overflow-hidden">
              <img src={logoMark} alt="Trading With Prop Firms logo" width={1024} height={1024} className="h-6 w-6 object-contain" />
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-[15px] tracking-tight">
                Trading<span className="text-gradient">WithPropFirms</span>
              </span>
              <span className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-[#777]">Fund your Future</span>
            </span>
          </Link>


          <ul className="hidden lg:flex items-center gap-5 text-[13px] text-white/75">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="nav-underline py-1 hover:text-white transition-colors"
                  activeProps={{ className: "text-white font-semibold" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link to="/reviews" className="btn-gradient btn-shimmer text-[13px] px-5 py-2.5">
              Find A Prop Firm
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-[84px] bg-[#080808]/98 backdrop-blur-md z-40 animate-fade-in">
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
            <Link to="/reviews" onClick={() => setOpen(false)} className="btn-gradient mt-6 text-center">
              Find A Prop Firm
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

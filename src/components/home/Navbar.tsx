import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["Reviews", "Compare", "News", "Coupons", "Blog", "Discord"];

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
        <a href="#" className="flex items-center gap-2" aria-label="Trading With Prop Firms home">
          <div className="h-9 w-9 rounded-md bg-gradient-brand" />
          <span className="font-display font-bold text-base hidden sm:inline">TWPF</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-sm text-white/80">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-white transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href="#firms" className="btn-gradient text-sm">Find A Prop Firm</a>
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
              <a
                key={l}
                href="#"
                onClick={() => setOpen(false)}
                className="text-2xl font-display font-semibold py-3 border-b border-[#222]"
              >
                {l}
              </a>
            ))}
            <a href="#firms" onClick={() => setOpen(false)} className="btn-gradient mt-6 text-center">
              Find A Prop Firm
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
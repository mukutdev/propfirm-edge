import { useState } from "react";
import { Youtube, MessageCircle, Twitter } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

const features = [
  { icon: "📅", label: "Economic Calendar" },
  { icon: "🧮", label: "Position Size Calculator" },
  { icon: "🌍", label: "Live Market Session Times" },
];

const socials = [
  { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@hanumantrades" },
  { Icon: MessageCircle, label: "Discord", href: "https://discord.com" },
  { Icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
];

export function ComingSoon() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white flex items-center justify-center">
      <div className="hero-bloom" />
      <div className="grid-lines-animated" />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-10 flex flex-col items-center text-center">
        {/* Logo */}
        <span className="logo-mark h-12 w-12 rounded-xl bg-[#141414] border border-[#7c3aed]/40 flex items-center justify-center overflow-hidden">
          <img
            src={logoMark}
            alt="TradingWithPropFirms logo"
            width={1024}
            height={1024}
            className="h-8 w-8 object-contain"
          />
        </span>

        {/* Headline */}
        <h1 className="mt-8 font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
          <span className="text-gradient">Something Big Is Coming</span>
        </h1>

        {/* Sub-text */}
        <p className="mt-5 text-base md:text-lg text-[#8d8d8d] max-w-xl leading-relaxed">
          TradingWithPropFirms is launching soon — honest prop firm reviews and
          the tools serious futures traders actually need.
        </p>

        {/* Feature pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {features.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#141414] px-4 py-2 text-sm text-white/80"
            >
              <span aria-hidden>{f.icon}</span>
              {f.label}
            </span>
          ))}
        </div>

        {/* Email signup */}
        <form
          onSubmit={submit}
          className="mt-9 flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@trader.com"
            className="flex-1 rounded-full border border-[#2a2a2a] bg-[#0c0c0c] px-5 py-3 text-sm text-white placeholder:text-[#666] focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)] transition"
          />
          <button type="submit" className="btn-gradient">
            {sent ? "✓ Notified" : "Notify Me"}
          </button>
        </form>

        <p className="mt-4 text-xs text-[#666]">
          No spam. We'll let you know the moment we launch.
        </p>

        {/* Social icons */}
        <div className="mt-10 flex items-center gap-4">
          {socials.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a2a] text-white/70 transition hover:border-[#7c3aed] hover:text-white hover:bg-[rgba(124,58,237,0.08)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

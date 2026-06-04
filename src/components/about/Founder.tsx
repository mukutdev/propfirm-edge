import { Youtube, Twitter, MessageCircle } from "lucide-react";

export function Founder() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[320px_1fr]">
        <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.6), transparent 70%)" }}
          />
          <div
            className="relative h-full w-full rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] p-[3px]"
            style={{ animation: "afloat 6s ease-in-out infinite alternate" }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#141414]">
              <span className="font-display text-7xl font-bold text-white">H</span>
            </div>
          </div>
          <style>{`@keyframes afloat { from { transform: translateY(-6px); } to { transform: translateY(6px); } }`}</style>
        </div>

        <div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Hey, I'm Hanuman
          </h2>
          <p className="mt-1 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">
            Futures Trader &amp; Founder of Trading With Prop Firms
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I've been trading futures for over 10 years. I built this site because I got tired of fake reviews
            written by people who've never placed a real trade. Every review here comes from a real account,
            real money and real trades.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["📈 10+ Years Trading", "💼 Multiple Funded Accounts", "🎥 Hanuman Trades — YouTube"].map((c) => (
              <span key={c} className="rounded-full border border-[#2a2a2a] bg-[#141414] px-3 py-1.5 text-xs text-white">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { Icon: Youtube, label: "YouTube" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: MessageCircle, label: "Discord" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#141414] px-4 py-2 text-sm text-white transition hover:border-purple-500/50 hover:text-purple-300"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { Play, Youtube } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const isLive = true;

export function YoutubeLive() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="pb-16" aria-label="Live on YouTube">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6">
        <div className="card-surface p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-[#ff3b5c]/15 border border-[#ff3b5c]/40 text-[#ff8a9d]">
              🔴 Hanuman Trades
            </span>
            <h2 className="mt-5 font-display font-bold text-3xl md:text-4xl">Trade The Markets With Us Live</h2>
            <p className="mt-4 text-[#888]">
              Join live trading sessions, real account walkthroughs and prop firm breakdowns on YouTube.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-7 px-7 py-3.5 rounded-full font-semibold text-white bg-[#ff0033] hover:bg-[#d4002a] transition-colors"
            >
              <Youtube size={18} /> Watch on YouTube
            </a>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative aspect-video rounded-xl border border-[#222] bg-[#0f0f0f] overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(124,58,237,0.22),transparent_75%)]" />
              {isLive && (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/50 text-[#ff8a9d]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff0033] opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff0033]" />
                  </span>
                  Live
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#ff0033] flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(255,0,51,0.7)] transition-transform duration-200 group-hover:scale-110">
                  <Play size={24} className="text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

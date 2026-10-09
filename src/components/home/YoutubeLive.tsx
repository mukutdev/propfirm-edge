import { Play, Youtube, Users, Radio } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const isLive = true;

const clips = [
  { title: "Apex payout walkthrough", len: "14:02" },
  { title: "NQ open range playbook", len: "22:47" },
  { title: "Passing a 50k eval live", len: "31:18" },
];

export function YoutubeLive() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="pb-16" aria-label="Live on YouTube">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#0d0d0d]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_60%_at_15%_0%,rgba(255,0,51,0.16),transparent_70%),radial-gradient(60%_60%_at_85%_100%,rgba(124,58,237,0.18),transparent_75%)]" />

          <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* Player */}
            <div className="relative aspect-video lg:aspect-auto lg:min-h-[380px] group border-b lg:border-b-0 lg:border-r border-[#1e1e1e] overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#141414,#0a0a0a)]" />
              <div className="grid-lines-animated opacity-60" />
              {isLive && (
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/50 text-[#ff8a9d]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff0033] opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff0033]" />
                  </span>
                  Live now
                </span>
              )}
              <a
                href="https://www.youtube.com/@hanumantrades"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch the live stream"
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <span className="h-[74px] w-[74px] rounded-full bg-[#ff0033] flex items-center justify-center shadow-[0_16px_50px_-10px_rgba(255,0,51,0.75)] transition-transform duration-300 group-hover:scale-110">
                  <Play size={28} className="text-white fill-white ml-1" />
                </span>
              </a>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 bg-[linear-gradient(to_top,#080808,transparent)]">
                <p className="font-display font-semibold text-lg">NQ session — live order flow &amp; prop firm Q&amp;A</p>
                <p className="mt-1 text-xs text-[#888] flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5"><Users size={12} /> 1,284 watching</span>
                  <span className="inline-flex items-center gap-1.5"><Radio size={12} /> Weekdays 9:15 ET</span>
                </p>
              </div>
            </div>

            {/* Side panel */}
            <div className="relative p-7 md:p-9 flex flex-col">
              <span className="inline-flex self-start items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-[#ff3b5c]/12 border border-[#ff3b5c]/35 text-[#ff8a9d]">
                <Youtube size={13} /> Hanuman Trades
              </span>
              <h2 className="mt-5 font-display font-bold text-3xl md:text-4xl leading-tight">
                Trade the markets <span className="text-gradient">with us, live.</span>
              </h2>
              <p className="mt-3 text-[#888] leading-relaxed">
                Real accounts, real drawdown, real payout requests — no simulated hype reels.
              </p>

              <ul className="mt-6 space-y-2.5">
                {clips.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-center gap-3 rounded-lg border border-[#1e1e1e] bg-[#121212] px-3.5 py-3 transition-colors hover:border-[#ff0033]/40"
                  >
                    <span className="h-7 w-7 shrink-0 rounded-md bg-[#ff0033]/15 text-[#ff8a9d] flex items-center justify-center">
                      <Play size={12} className="fill-current" />
                    </span>
                    <span className="text-sm text-white/85 flex-1 truncate">{c.title}</span>
                    <span className="font-mono text-[11px] text-[#666]">{c.len}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://www.youtube.com/@hanumantrades"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-[#ff0033] hover:bg-[#d4002a] transition-colors"
              >
                <Youtube size={18} /> Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

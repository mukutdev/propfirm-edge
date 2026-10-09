import { Play } from "lucide-react";

export function YoutubeBridge() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 rounded-2xl border border-[#222] bg-[#141414] p-6 sm:p-10 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400">
            ▶ YouTube
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Follow the Journey on YouTube
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            I document the real side of prop trading on YouTube — running evaluations, managing funded
            accounts, and what actually happens when you hit your trailing drawdown. No funded-in-a-week
            fantasy, just the trades.
          </p>
          <a
            href="https://www.youtube.com/@hanumantrades" target="_blank" rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#cc0000]"
          >
            <Play size={16} fill="white" /> Subscribe on YouTube
          </a>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-[#222] bg-gradient-to-br from-[#0d0d14] via-[#141420] to-[#1a0e1f]">
          <div className="aspect-video w-full">
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF0000] shadow-[0_0_40px_-5px_rgba(255,0,0,0.6)]">
                <Play size={28} fill="white" className="ml-1" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#222] bg-[#0c0c0c] px-4 py-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
              <span className="font-semibold text-white">Hanuman Trades</span>
            </div>
            <span className="text-xs text-muted-foreground">24.6K subscribers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
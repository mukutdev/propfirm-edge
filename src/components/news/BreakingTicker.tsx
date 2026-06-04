import { breakingHeadlines } from "@/lib/news-data";

export function BreakingTicker() {
  const items = [...breakingHeadlines, ...breakingHeadlines];
  return (
    <div className="relative flex w-full items-stretch overflow-hidden border-t border-purple-500/40 bg-[#141414]">
      <div className="flex shrink-0 items-center gap-2 border-r border-[#222] bg-[#141414] px-4 py-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          Breaking
        </span>
      </div>
      <div className="group flex-1 overflow-hidden py-3">
        <div className="flex animate-[ticker_60s_linear_infinite] gap-10 whitespace-nowrap pr-10 group-hover:[animation-play-state:paused]">
          {items.map((headline, i) => (
            <span key={i} className="flex items-center gap-10 text-sm">
              <span className={i % 4 === 0 ? "text-white" : "text-muted-foreground"}>{headline}</span>
              <span className="text-purple-500">◆</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
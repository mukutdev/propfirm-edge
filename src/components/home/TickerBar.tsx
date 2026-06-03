import { tickerItems } from "@/lib/home-data";

export function TickerBar() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker w-full border-y border-[#222] bg-[#0c0c0c] overflow-hidden">
      <div className="ticker-track py-3">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 px-8 text-sm text-white/90 whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
import { BarChart3 } from "lucide-react";
import { TradingViewWidget } from "./TradingViewWidget";

// ETF proxies rendered via TradingView's official Ticker Tape widget.
// Free-tier TradingView blocks real CME/COMEX/NYMEX futures, so correlated
// ETF proxies (QQQ/SPY/GLD/USO) are used instead.
const tickerSymbols = [
  { proName: "NASDAQ:QQQ", title: "Nasdaq Proxy" },
  { proName: "AMEX:SPY", title: "S&P 500 Proxy" },
  { proName: "AMEX:GLD", title: "Gold Proxy" },
  { proName: "AMEX:USO", title: "Crude Oil Proxy" },
];

export function LivePrices() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-[#c4a8ff]">
            <BarChart3 size={15} />
          </span>
          <span className="font-display font-bold text-sm text-white">📊 Live Prices</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#5cf3ad]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00d97e] opacity-70 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d97e]" />
          </span>
          Real-time
        </span>
      </div>

      {/* TradingView Ticker Tape — real-time futures strip */}
      <div className="rounded-xl border border-[#7c3aed]/40 bg-[#141414] p-1 overflow-hidden">
        <TradingViewWidget
          type="ticker-tape"
          config={{
            symbols: tickerSymbols,
            showSymbolLogo: true,
            colorTheme: "dark",
            isTransparent: true,
            displayMode: "adaptive",
            locale: "en",
          }}
        />
      </div>

      <p className="mt-3 text-[10px] text-white/35">
        Futures shown via correlated ETF proxies (free data tier).
      </p>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

// Twelve Data quote API — client-side fetch. The VITE_ key is intentionally
// public (Vite exposes VITE_* vars to the bundle), matching the spec.
const API_KEY = import.meta.env.VITE_TWELVE_DATA_KEY;
const BASE_URL = "https://api.twelvedata.com/quote";

export type PriceSymbol = {
  symbol: string;
  label: string; // friendly display name
};

const DEFAULT_SYMBOLS: PriceSymbol[] = [
  { symbol: "NQ", label: "Nasdaq 100 Futures" },
  { symbol: "ES", label: "S&P 500 Futures" },
  { symbol: "GC", label: "Gold Futures" },
  { symbol: "CL", label: "Crude Oil Futures" },
  { symbol: "EUR/USD", label: "Euro / US Dollar" },
];

type Quote = {
  symbol: string;
  name: string;
  close: string;
  change: string;
  percent_change: string;
};

type RowState = {
  loading: boolean;
  error: boolean;
  data?: Quote;
  lastGood?: Quote; // last successfully fetched price (kept on refresh errors)
};

function PanelHeader({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <span className="text-[#c4a8ff]">{icon}</span>
        <span className="font-display font-bold text-sm text-white">{label}</span>
      </div>
      {right}
    </div>
  );
}

export function LivePrices({
  symbols = DEFAULT_SYMBOLS,
}: {
  symbols?: PriceSymbol[];
}) {
  const [rows, setRows] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(symbols.map((s) => [s.symbol, { loading: true, error: false }])),
  );
  const [hasRefreshError, setHasRefreshError] = useState(false);
  const mountedRef = useRef(true);
  // Tracks whether we've completed at least one successful fetch (i.e. not initial load).
  const initializedRef = useRef(false);

  const fetchAll = async (isInitial: boolean) => {
    const results = await Promise.allSettled(
      symbols.map(async (s) => {
        const url = `${BASE_URL}?symbol=${encodeURIComponent(s.symbol)}&apikey=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Quote & { status?: string; message?: string };
        // Twelve Data returns { status: "error", message: "..." } on failure
        if (json.status === "error" || !json.close) {
          throw new Error(json.message ?? "No data");
        }
        return json as Quote;
      }),
    );

    if (!mountedRef.current) return;

    setRows((prev) => {
      const next: Record<string, RowState> = {};
      let anyError = false;
      results.forEach((r, i) => {
        const sym = symbols[i].symbol;
        const cur = prev[sym] ?? { loading: false, error: false };
        if (r.status === "fulfilled") {
          next[sym] = { loading: false, error: false, data: r.value, lastGood: r.value };
        } else {
          anyError = true;
          // On refresh failure, keep the last known good price; on initial failure there is none.
          next[sym] = {
            loading: false,
            error: true,
            data: cur.lastGood,
            lastGood: cur.lastGood,
          };
        }
      });
      return next;
    });

    const anyError = results.some((r) => r.status === "rejected");
    if (!isInitial) setHasRefreshError(anyError);
    initializedRef.current = true;
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchAll(true);
    const id = setInterval(() => fetchAll(false), 60_000);
    return () => {
      mountedRef.current = false;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <PanelHeader
        icon={<BarChart3 size={15} />}
        label="Live Prices"
        right={
          <span className="text-[10px] uppercase tracking-wider text-[#888]">Delayed 15min</span>
        }
      />

      <table className="w-full text-sm">
        <tbody>
          {symbols.map((s) => {
            const row = rows[s.symbol];
            const display = row?.lastGood ?? row?.data;
            const isInitialLoading = row?.loading && !display;
            const pct = display ? parseFloat(display.percent_change) : NaN;
            const up = !isNaN(pct) && pct >= 0;
            const price = display
              ? Number(display.close).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: display.symbol === "EUR/USD" ? 4 : 2,
                })
              : "—";
            const label = display?.name ?? s.label;

            return (
              <tr key={s.symbol} className="border-b border-[#1e1e1e] last:border-0">
                {/* Symbol + name */}
                <td className="py-2.5 pr-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white/90">{s.symbol}</span>
                    {isInitialLoading ? (
                      <span className="mt-1.5 h-3 w-28 animate-pulse rounded bg-white/10" />
                    ) : (
                      <span className="text-[10px] text-[#888] truncate max-w-[150px]">{label}</span>
                    )}
                  </div>
                </td>
                {/* Price */}
                <td className="py-2.5 text-right font-mono tabular-nums text-white/90">
                  {isInitialLoading ? (
                    <span className="inline-block h-4 w-20 animate-pulse rounded bg-white/10 align-middle" />
                  ) : (
                    price
                  )}
                </td>
                {/* % change */}
                <td
                  className={`py-2.5 text-right font-mono tabular-nums ${
                    isInitialLoading ? "text-[#888]" : up ? "text-[#00d97e]" : "text-[#ff3b5c]"
                  }`}
                >
                  {isInitialLoading ? (
                    <span className="inline-block h-4 w-16 animate-pulse rounded bg-white/10 align-middle" />
                  ) : (
                    <span className="inline-flex items-center gap-1 justify-end">
                      {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {up ? "+" : ""}
                      {pct.toFixed(2)}%
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* "Unable to refresh" note — only after we've had at least one good fetch */}
      {hasRefreshError && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#ff3b5c]/30 bg-[#ff3b5c]/5 px-3 py-2 text-[11px] text-[#ff3b5c]/90">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b5c]" />
          Showing last known prices — unable to refresh the latest quote.
        </div>
      )}

      <p className="mt-3 text-[10px] text-[#555]">
        Quotes via Twelve Data · indicative, delayed up to 15 minutes.
      </p>
    </div>
  );
}

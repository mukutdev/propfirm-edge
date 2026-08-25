import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, Newspaper } from "lucide-react";
import { LivePrices } from "./LivePrices";

type Session = { name: string; tz: string; open: number; close: number };

const sessions: Session[] = [
  { name: "Sydney", tz: "Australia/Sydney", open: 7, close: 16 },
  { name: "Tokyo", tz: "Asia/Tokyo", open: 9, close: 18 },
  { name: "London", tz: "Europe/London", open: 8, close: 17 },
  { name: "New York", tz: "America/New_York", open: 8, close: 17 },
  { name: "Globex", tz: "America/New_York", open: 18, close: 17 },
];

function zonedParts(date: Date, tz: string) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return {
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
    weekday: get("weekday"),
  };
}

function fmtDuration(mins: number) {
  const m = Math.max(0, Math.round(mins));
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
}

function sessionState(date: Date, s: Session) {
  const { hour, minute, weekday } = zonedParts(date, s.tz);
  const now = hour * 60 + minute;
  const weekend = weekday === "Sat" || weekday === "Sun";
  const openM = s.open * 60;
  const closeM = s.close * 60;
  const overnight = s.name === "Globex";

  let isOpen: boolean;
  if (overnight) {
    isOpen = !(now >= closeM && now < openM) && weekday !== "Sat";
  } else {
    isOpen = !weekend && now >= openM && now < closeM;
  }

  const target = isOpen ? closeM : openM;
  let diff = target - now;
  if (diff <= 0) diff += 24 * 60;

  return { isOpen, label: `${isOpen ? "Closes in" : "Opens in"} ${fmtDuration(diff)}` };
}


const headlines = [
  { tag: "Futures", title: "NQ pushes to fresh highs as tech leads pre-market bid", time: "12m ago" },
  { tag: "Prop Firms", title: "Apex extends 90% profit split promo through month end", time: "48m ago" },
  { tag: "Forex", title: "Euro steadies ahead of ECB commentary later today", time: "1h ago" },
  { tag: "Futures", title: "Crude slips on larger-than-expected inventory build", time: "2h ago" },
  { tag: "Prop Firms", title: "MyFundedFutures trims payout window to two days", time: "3h ago" },
];

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

export function LiveMarketWatch() {
  const [now, setNow] = useState<Date | null>(null);
  const [showLocal, setShowLocal] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const localTz = useMemo(
    () => (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"),
    [],
  );

  const rows = now
    ? sessions.map((s) => ({ name: s.name, ...sessionState(now, s) }))
    : sessions.map((s) => ({ name: s.name, isOpen: false, label: "—" }));

  const overlapActive = now
    ? sessionState(now, sessions[2]).isOpen && sessionState(now, sessions[3]).isOpen
    : false;

  const localTime = now
    ? new Intl.DateTimeFormat("en-GB", { timeZone: localTz, hour: "2-digit", minute: "2-digit" }).format(now)
    : "—";

  return (
    <section className="py-14 md:py-20" aria-label="Live market watch">
      <div className="max-w-7xl mx-auto px-6">
        <div className="card-surface overflow-hidden shadow-[0_0_0_1px_rgba(124,58,237,0.28),0_20px_60px_-30px_rgba(124,58,237,0.55)]">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#222]">
            {/* Panel A */}
            <div className="p-6">
              <PanelHeader
                icon={<Globe size={15} />}
                label="Market Sessions"
                right={
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#5cf3ad]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#00d97e] opacity-70 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d97e]" />
                    </span>
                    Live
                  </span>
                }
              />
              <ul className="space-y-1">
                {rows.map((r) => (
                  <li key={r.name} className="flex items-center justify-between py-2 border-b border-[#1e1e1e] last:border-0">
                    <span className="flex items-center gap-2.5 text-sm text-white/90">
                      {r.isOpen ? (
                        <span className="h-2 w-2 rounded-full bg-[#00d97e] shadow-[0_0_8px_2px_rgba(0,217,126,0.55)] animate-pulse" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-[#ff3b5c]" />
                      )}
                      {r.name}
                    </span>
                    <span className={`text-xs font-mono ${r.isOpen ? "text-[#5cf3ad]" : "text-[#888]"}`}>{r.label}</span>
                  </li>
                ))}
                {showLocal && (
                  <li className="flex items-center justify-between py-2 border-t border-[#222] mt-1">
                    <span className="flex items-center gap-2.5 text-sm text-white/90">
                      <span className="h-2 w-2 rounded-full bg-[#7c3aed]" />
                      {localTz.split("/").pop()?.replace("_", " ")}
                    </span>
                    <span className="text-xs font-mono text-[#c4a8ff]">{localTime} local</span>
                  </li>
                )}
              </ul>

              {overlapActive && (
                <div className="mt-4 rounded-lg border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-3 py-2 text-xs font-semibold">
                  <span className="text-gradient">⚡ High Volatility Window Active</span>
                </div>
              )}

              <button
                onClick={() => setShowLocal((v) => !v)}
                className="mt-4 text-[11px] text-[#888] hover:text-white transition-colors"
              >
                🌐 {showLocal ? "Hide" : "Show"} my local time
              </button>
            </div>

            {/* Panel B */}
            <LivePrices />

            {/* Panel C */}
            <div className="p-6">
              <PanelHeader
                icon={<Newspaper size={15} />}
                label="Latest"
                right={<span className="text-[10px] uppercase tracking-wider text-[#888]">Updated 12m ago</span>}
              />
              <ul>
                {headlines.map((h) => (
                  <li key={h.title} className="py-2.5 border-b border-[#1e1e1e]">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#c4a8ff]">
                        {h.tag}
                      </span>
                      <span className="text-[10px] text-[#888]">{h.time}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-white/85 truncate">{h.title}</p>
                  </li>
                ))}
              </ul>
              <Link to="/news" className="inline-block mt-4 text-sm font-semibold text-gradient">
                View All News →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

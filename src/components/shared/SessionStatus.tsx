import { useEffect, useState } from "react";
import { sessions, sessionState } from "@/lib/sessions";

/** Ticks a Date every 30s, null until mounted (SSR-safe). */
export function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function useSessionStates() {
  const now = useNow();
  return sessions.map((s) => ({
    name: s.name,
    short: s.short,
    ...(now ? sessionState(now, s) : { isOpen: false, label: "—" }),
  }));
}

function Dot({ open }: { open: boolean }) {
  return open ? (
    <span className="h-1.5 w-1.5 rounded-full bg-[#00d97e] shadow-[0_0_6px_1px_rgba(0,217,126,0.6)]" />
  ) : (
    <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b5c]/70" />
  );
}

/** Thin header strip: full list on desktop, "2 Open" summary on mobile. */
export function SessionStrip() {
  const rows = useSessionStates();
  const openCount = rows.filter((r) => r.isOpen).length;

  return (
    <div className="border-b border-[#1b1b1b] bg-[#0b0b0b]/80">
      <div className="mx-auto flex h-7 max-w-7xl items-center gap-4 px-6 text-[10px] uppercase tracking-[0.14em] text-[#6f6f6f]">
        <span className="hidden items-center gap-4 sm:flex">
          {rows.map((r) => (
            <span key={r.name} className="flex items-center gap-1.5">
              <Dot open={r.isOpen} />
              <span className={r.isOpen ? "text-white/60" : ""}>
                {r.name} {r.isOpen ? "Open" : "Closed"}
              </span>
            </span>
          ))}
        </span>
        <span className="flex items-center gap-1.5 sm:hidden">
          <Dot open={openCount > 0} />
          {openCount} Open
        </span>
        <span className="ml-auto hidden items-center gap-1.5 text-[#5cf3ad] md:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d97e] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00d97e]" />
          </span>
          Live
        </span>
      </div>
    </div>
  );
}

/** Compact footer widget. */
export function SessionMiniWidget() {
  const rows = useSessionStates();
  return (
    <div className="mt-6 rounded-lg border border-[#222] bg-[#111] p-3">
      <div className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#666]">Session Clock</div>
      <ul className="space-y-1.5">
        {rows.slice(0, 4).map((r) => (
          <li key={r.name} className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-2 text-white/75">
              <Dot open={r.isOpen} />
              {r.name}
            </span>
            <span className={`font-mono ${r.isOpen ? "text-[#5cf3ad]" : "text-[#777]"}`}>
              {r.isOpen ? "Open" : "Closed"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

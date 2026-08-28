import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import {
  chartSessions,
  daySegments,
  fmtHM,
  isOpenAt,
  localTimeZone,
  referenceZones,
  startOfZoneDay,
  zoneParts,
} from "@/lib/market-hours";

const HOUR_MARKS = [0, 4, 8, 12, 16, 20, 24];

export function SessionTimelineChart() {
  const [refTz, setRefTz] = useState("UTC");
  const [now, setNow] = useState<Date | null>(null);
  const [zoom, setZoom] = useState(1);
  const [scrub, setScrub] = useState<number | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const zones = useMemo(() => {
    const local = localTimeZone();
    const has = referenceZones.some((z) => z.tz === local);
    return [
      referenceZones[0],
      { label: `My Local Time (${local.split("/").pop()?.replace("_", " ")})`, tz: local },
      ...referenceZones.slice(1).filter((z) => !has || true),
    ];
  }, []);

  const dayStart = useMemo(() => (now ? startOfZoneDay(now, refTz) : null), [now, refTz]);

  const rows = useMemo(
    () =>
      dayStart
        ? chartSessions.map((s) => ({ session: s, segments: daySegments(dayStart, refTz, s) }))
        : chartSessions.map((s) => ({ session: s, segments: [] })),
    [dayStart, refTz],
  );

  const liveMin = now ? zoneParts(now, refTz).minutes : 0;
  const activeMin = scrub ?? liveMin;
  const activeDate = dayStart ? new Date(dayStart.getTime() + activeMin * 60_000) : null;

  const statuses = chartSessions.map((s) => ({
    ...s,
    isOpen: activeDate ? isOpenAt(activeDate, s) : false,
  }));
  const openNames = statuses.filter((s) => s.isOpen && s.key !== "globex").map((s) => s.name);
  const windowLabel = openNames.length ? openNames.join(" + ") : "No Markets";

  const pct = (m: number) => `${(m / 1440) * 100}%`;

  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Controls */}
        <div className="card-surface mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="ref-tz" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#888]">
              Show times in:
            </label>
            <select
              id="ref-tz"
              value={refTz}
              onChange={(e) => setRefTz(e.target.value)}
              className="w-full rounded-lg border border-[#222] bg-[#0e0e0e] px-3 py-2.5 text-sm text-white outline-none transition-all focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.28)]"
            >
              {zones.map((z) => (
                <option key={z.tz + z.label} value={z.tz}>
                  {z.label}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#666]">Zoom</span>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))}
              className="rounded-md border border-[#222] bg-[#141414] p-2 text-white/70 transition-colors hover:border-[#7c3aed] hover:text-white"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center font-mono text-xs text-[#c4a8ff]">{zoom}x</span>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))}
              className="rounded-md border border-[#222] bg-[#141414] p-2 text-white/70 transition-colors hover:border-[#7c3aed] hover:text-white"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Desktop chart */}
        <div className="card-surface hidden overflow-hidden p-5 md:block">
          <div className="flex">
            <div className="w-32 shrink-0 space-y-3 pt-8">
              {rows.map(({ session }) => (
                <div key={session.key} className="flex h-9 items-center gap-2 text-sm text-white/85">
                  <span>{session.flag}</span>
                  <span className="truncate">{session.name}</span>
                </div>
              ))}
            </div>
            <div className="relative flex-1 overflow-x-auto scroll-smooth pb-2">
              <div style={{ width: `${zoom * 100}%` }} className="transition-[width] duration-300 ease-out">
                {/* Axis */}
                <div className="relative mb-3 h-5 border-b border-[#222]">
                  {HOUR_MARKS.map((h) => (
                    <span
                      key={h}
                      className="absolute -translate-x-1/2 font-mono text-[10px] text-[#666]"
                      style={{ left: pct(h * 60) }}
                    >
                      {String(h).padStart(2, "0")}
                    </span>
                  ))}
                </div>

                {/* Rows */}
                <div className="relative space-y-3">
                  {rows.map(({ session, segments }) => (
                    <div key={session.key} className="relative h-9">
                      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#222]" />
                      {segments.map((seg, i) => (
                        <div
                          key={i}
                          className={`absolute top-0 flex h-9 items-center justify-between rounded-md bg-gradient-to-r px-2 transition-all duration-500 ease-out ${session.fill}`}
                          style={{ left: pct(seg.startMin), width: pct(seg.endMin - seg.startMin) }}
                          title={`${seg.label} · ${fmtHM(seg.startMin)}–${fmtHM(seg.endMin)}`}
                        >
                          <span className="rounded-full bg-black/45 px-1.5 py-0.5 font-mono text-[9px] text-white/85">
                            OPENS {fmtHM(seg.startMin)}
                          </span>
                          <span className="truncate px-1 text-[10px] font-semibold text-white/90">{seg.label}</span>
                          <span className="rounded-full bg-black/45 px-1.5 py-0.5 font-mono text-[9px] text-white/85">
                            CLOSES {fmtHM(seg.endMin)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Current / scrubbed time indicator */}
                  <div
                    className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-[#7c3aed] to-[#ec4899] shadow-[0_0_10px_2px_rgba(236,72,153,0.6)] transition-[left] duration-500 ease-linear"
                    style={{ left: pct(activeMin) }}
                  >
                    <span className="absolute -top-6 -translate-x-1/2 rounded-full border border-[#7c3aed]/50 bg-[#141414] px-2 py-0.5 font-mono text-[9px] text-[#c4a8ff]">
                      {fmtHM(activeMin)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile stacked cards */}
        <div className="space-y-3 md:hidden">
          {rows.map(({ session, segments }) => (
            <div key={session.key} className="card-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-white/90">
                  <span>{session.flag}</span>
                  {session.name}
                </span>
                <span className="font-mono text-[10px] text-[#888]">
                  {segments.length ? segments.map((s) => `${fmtHM(s.startMin)}–${fmtHM(s.endMin)}`).join(", ") : "Closed"}
                </span>
              </div>
              <div className="relative h-6">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#222]" />
                {segments.map((seg, i) => (
                  <div
                    key={i}
                    className={`absolute top-0 h-6 rounded bg-gradient-to-r transition-all duration-500 ${session.fill}`}
                    style={{ left: pct(seg.startMin), width: pct(seg.endMin - seg.startMin) }}
                  />
                ))}
                <div
                  className="absolute inset-y-0 w-px bg-gradient-to-b from-[#7c3aed] to-[#ec4899] shadow-[0_0_8px_2px_rgba(236,72,153,0.55)]"
                  style={{ left: pct(activeMin) }}
                />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[9px] text-[#555]">
                <span>00</span>
                <span>12</span>
                <span>24</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scrub slider */}
        <div className="card-surface mt-6 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#888]">Scrub Timeline</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-gradient font-bold">{fmtHM(activeMin)}</span>
              {scrub !== null && (
                <button
                  type="button"
                  onClick={() => setScrub(null)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#7c3aed]/50 bg-[#7c3aed]/10 px-3 py-1 text-[11px] font-semibold text-[#c4a8ff] transition-colors hover:bg-[#7c3aed]/20"
                >
                  <RotateCcw size={11} /> Reset to Live
                </button>
              )}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={1435}
            step={5}
            value={activeMin}
            onChange={(e) => setScrub(Number(e.target.value))}
            aria-label="Scrub timeline"
            className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_10px_2px_rgba(236,72,153,0.6)]"
            style={{
              background: `linear-gradient(to right, #7c3aed 0%, #ec4899 ${(activeMin / 1435) * 100}%, #222 ${(activeMin / 1435) * 100}%, #222 100%)`,
            }}
          />
          <p className="mt-2 text-[11px] text-[#666]">
            {scrub !== null ? "Previewing a custom time" : "Following live market time"} · reference timezone{" "}
            {refTz.replace("_", " ")}
          </p>
        </div>

        {/* Status summary */}
        <div className="card-surface mt-6 p-5">
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <span
                key={s.key}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-500 ${
                  s.isOpen
                    ? "border-[#00d97e]/40 bg-[#00d97e]/10 text-[#5cf3ad]"
                    : "border-[#ff3b5c]/30 bg-[#ff3b5c]/10 text-[#ff8ea0]"
                }`}
              >
                {s.isOpen ? (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d97e] opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d97e]" />
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-[#ff3b5c]" />
                )}
                {s.name}: {s.isOpen ? "OPEN" : "CLOSED"}
              </span>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { k: "Active Markets", v: `${statuses.filter((s) => s.isOpen).length}/5` },
              { k: "Session Window", v: windowLabel },
              { k: "Selected Time", v: `${fmtHM(activeMin)} ${refTz.split("/").pop()?.replace("_", " ")}` },
            ].map((b) => (
              <div key={b.k} className="rounded-xl border border-[#222] bg-[#0e0e0e] p-4">
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#666]">{b.k}</div>
                <div className="mt-1.5 font-display text-lg font-bold text-white">{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

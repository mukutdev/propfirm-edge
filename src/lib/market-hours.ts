export type MarketSession = {
  key: string;
  name: string;
  flag: string;
  tz: string;
  /** local open/close in minutes from midnight (session tz) */
  open: number;
  close: number;
  /** gradient classes for the filled bar */
  fill: string;
};

/** Chart sessions — separate from the existing sessions clock definitions. */
export const chartSessions: MarketSession[] = [
  { key: "globex", name: "Globex", flag: "🌐", tz: "America/New_York", open: 18 * 60, close: 17 * 60, fill: "from-[#7c3aed]/55 to-[#7c3aed]/25" },
  { key: "sydney", name: "Sydney", flag: "🇦🇺", tz: "Australia/Sydney", open: 9 * 60, close: 16 * 60, fill: "from-[#ec4899] to-[#f472b6]" },
  { key: "tokyo", name: "Tokyo", flag: "🇯🇵", tz: "Asia/Tokyo", open: 9 * 60, close: 18 * 60, fill: "from-[#7c3aed] to-[#a855f7]" },
  { key: "london", name: "London", flag: "🇬🇧", tz: "Europe/London", open: 8 * 60, close: 16 * 60 + 30, fill: "from-[#6366f1] to-[#8b5cf6]" },
  { key: "newyork", name: "New York", flag: "🇺🇸", tz: "America/New_York", open: 9 * 60 + 30, close: 16 * 60, fill: "from-[#ec4899] to-[#7c3aed]" },
];

export const referenceZones = [
  { label: "UTC", tz: "UTC" },
  { label: "Sydney", tz: "Australia/Sydney" },
  { label: "Tokyo", tz: "Asia/Tokyo" },
  { label: "London", tz: "Europe/London" },
  { label: "New York", tz: "America/New_York" },
];

export function localTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function zoneParts(date: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return {
    minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
    weekday: WEEKDAYS.indexOf(get("weekday")),
  };
}

export function fmtHM(mins: number) {
  const m = ((Math.round(mins) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** True when the given instant falls inside the session's trading window. */
export function isOpenAt(date: Date, s: MarketSession): boolean {
  const { minutes, weekday } = zoneParts(date, s.tz);
  if (s.key === "globex") {
    // Daily maintenance break 17:00–18:00 ET
    if (minutes >= 17 * 60 && minutes < 18 * 60) return false;
    if (weekday === 6) return false; // Saturday closed
    if (weekday === 0 && minutes < 18 * 60) return false; // Sunday before 18:00 ET
    if (weekday === 5 && minutes >= 17 * 60) return false; // Friday after close
    return true;
  }
  if (weekday === 0 || weekday === 6) return false;
  return minutes >= s.open && minutes < s.close;
}

/** Start-of-day instant for the reference timezone containing `date`. */
export function startOfZoneDay(date: Date, tz: string) {
  const { minutes } = zoneParts(date, tz);
  const d = new Date(date.getTime() - minutes * 60_000);
  d.setUTCSeconds(0, 0);
  return d;
}

export type Segment = { startMin: number; endMin: number; label: string };

const STEP = 5;

/** Filled segments (in reference-tz minutes 0–1440) for one session on the reference day. */
export function daySegments(dayStart: Date, refTz: string, s: MarketSession): Segment[] {
  const tokyo = chartSessions.find((x) => x.key === "tokyo")!;
  const segs: Segment[] = [];
  let cur: { start: number; preAsia: boolean } | null = null;

  for (let m = 0; m <= 1440; m += STEP) {
    const at = new Date(dayStart.getTime() + m * 60_000);
    const open = m < 1440 && isOpenAt(at, s);
    if (open) {
      if (!cur) cur = { start: m, preAsia: s.key === "globex" && !isOpenAt(at, tokyo) };
    } else if (cur) {
      segs.push({
        startMin: cur.start,
        endMin: m,
        label: s.key === "globex" ? (cur.preAsia ? "Globex · Pre-Asia" : "Globex") : s.name,
      });
      cur = null;
    }
  }
  void refTz;
  return segs;
}

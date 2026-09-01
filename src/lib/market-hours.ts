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

export type Segment = {
  /** clipped position on the displayed 0–1440 axis */
  startMin: number;
  endMin: number;
  /** true session boundaries expressed in reference-tz minutes (may be < 0 or > 1440) */
  openMin: number;
  closeMin: number;
  wrapsFromPrevDay: boolean;
  wrapsToNextDay: boolean;
  label: string;
};

const STEP = 5;

/** Walk backwards from `m` to the real minute the session opened (may be negative). */
function trueOpenMin(dayStart: Date, s: MarketSession, m: number) {
  let t = m;
  for (let i = 0; i < 1440 / STEP; i++) {
    const prev = t - STEP;
    if (!isOpenAt(new Date(dayStart.getTime() + prev * 60_000), s)) break;
    t = prev;
  }
  return t;
}

/** Walk forwards from `m` (first closed sample) to the real close minute (may exceed 1440). */
function trueCloseMin(dayStart: Date, s: MarketSession, m: number) {
  let t = m;
  for (let i = 0; i < 1440 / STEP; i++) {
    if (!isOpenAt(new Date(dayStart.getTime() + t * 60_000), s)) break;
    t += STEP;
  }
  return t;
}

/** Filled segments (in reference-tz minutes 0–1440) for one session on the reference day. */
export function daySegments(dayStart: Date, refTz: string, s: MarketSession): Segment[] {
  const segs: Segment[] = [];
  let cur: { start: number } | null = null;

  const push = (start: number, end: number) => {
    const endClipped = Math.min(end, 1440);
    const openMin = start === 0 ? trueOpenMin(dayStart, s, 0) : start;
    const closeMin = end >= 1440 ? trueCloseMin(dayStart, s, 1440) : end;
    segs.push({
      startMin: start,
      endMin: endClipped,
      openMin,
      closeMin,
      wrapsFromPrevDay: openMin < 0,
      wrapsToNextDay: closeMin > 1440,
      label: s.name,
    });
  };

  for (let m = 0; m <= 1440; m += STEP) {
    const at = new Date(dayStart.getTime() + m * 60_000);
    const open = m < 1440 && isOpenAt(at, s);
    if (open) {
      if (!cur) cur = { start: m };
    } else if (cur) {
      push(cur.start, m);
      cur = null;
    }
  }
  void refTz;
  return segs;
}

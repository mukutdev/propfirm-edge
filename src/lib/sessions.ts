export type Session = { name: string; short: string; tz: string; open: number; close: number; breaks?: [number, number][] };

export const sessions: Session[] = [
  { name: "Sydney", short: "SYD", tz: "Australia/Sydney", open: 10, close: 16 },
  { name: "Tokyo", short: "TYO", tz: "Asia/Tokyo", open: 9, close: 15.5, breaks: [[11.5, 12.5]] },
  { name: "London", short: "LDN", tz: "Europe/London", open: 8, close: 16.5 },
  { name: "New York", short: "NY", tz: "America/New_York", open: 9.5, close: 16 },
];

export function zonedParts(date: Date, tz: string) {
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

export function fmtDuration(mins: number) {
  const m = Math.max(0, Math.round(mins));
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
}

function timezonePart(date: Date, timeZone: string, timeZoneName: "short" | "longOffset", locale: string) {
  return new Intl.DateTimeFormat(locale, { timeZone, timeZoneName })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;
}

/** Current regional abbreviation and UTC offset, derived from the session's IANA timezone. */
export function timezoneStatus(date: Date, timeZone: string) {
  const locale =
    timeZone === "Australia/Sydney"
      ? "en-AU"
      : timeZone === "Asia/Tokyo"
        ? "ja-JP"
        : timeZone === "Europe/London"
          ? "en-GB"
          : "en-US";
  const abbreviation = timezonePart(date, timeZone, "short", locale) ?? timeZone;
  const rawOffset = timezonePart(date, timeZone, "longOffset", "en-US") ?? "GMT";
  const normalizedOffset = rawOffset
    .replace(/^GMT/, "UTC")
    .replace(/([+-])0(\d)/, "$1$2")
    .replace(/:00$/, "");

  return `${abbreviation}, ${normalizedOffset}`;
}

export function sessionState(date: Date, s: Session) {
  const { hour, minute, weekday } = zonedParts(date, s.tz);
  const now = hour * 60 + minute;
  const weekend = weekday === "Sat" || weekday === "Sun";
  // Open windows (local minutes), splitting around any intraday breaks.
  const windows: [number, number][] = [];
  let start = s.open * 60;
  for (const [a, b] of s.breaks ?? []) {
    windows.push([start, a * 60]);
    start = b * 60;
  }
  windows.push([start, s.close * 60]);

  const current = weekend ? undefined : windows.find(([o, c]) => now >= o && now < c);
  const isOpen = Boolean(current);

  let diff: number;
  if (current) diff = current[1] - now;
  else {
    const nextOpen = windows.find(([o]) => o > now);
    diff = nextOpen && !weekend ? nextOpen[0] - now : windows[0][0] - now + 24 * 60;
  }

  return { isOpen, label: `${isOpen ? "Closes in" : "Opens in"} ${fmtDuration(diff)}` };
}

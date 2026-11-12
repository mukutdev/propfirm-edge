import { describe, it, expect } from "vitest";
import { sessions, sessionState } from "./sessions";
import { chartSessions } from "./market-hours";

describe("session hours", () => {
  it("clock/header and chart use identical local hours for every session", () => {
    for (const s of sessions) {
      const c = chartSessions.find((x) => x.tz === s.tz)!;
      expect(c.open).toBe(s.open * 60);
      expect(c.close).toBe(s.close * 60);
      expect((c.breaks ?? []).map(([a, b]) => [a / 60, b / 60])).toEqual(s.breaks ?? []);
    }
  });
  it("Sydney 10:00-16:00, London 08:00-16:30 local", () => {
    expect(sessions.find((s) => s.name === "Sydney")).toMatchObject({ open: 10, close: 16 });
    expect(sessions.find((s) => s.name === "London")).toMatchObject({ open: 8, close: 16.5 });
  });
  it("New York opens in 6h 37m at 07:53 UTC on Nov 12 2026 (EST)", () => {
    const ny = sessions.find((s) => s.name === "New York")!;
    expect(sessionState(new Date("2026-11-12T07:53:00Z"), ny).label).toBe("Opens in 6h 37m");
  });
});

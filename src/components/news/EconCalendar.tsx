import { econEvents } from "@/lib/news-data";

const impactColor = (i: string) =>
  i === "High" ? "bg-red-500" : i === "Medium" ? "bg-orange-500" : "bg-gray-500";

export function EconCalendar() {
  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-bold text-white">Upcoming High-Impact Events</h2>
      <div className="overflow-hidden rounded-xl border border-[#222] bg-[#141414]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-[#0c0c0c] text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Date / Time</th>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Market</th>
                <th className="px-4 py-3 font-medium">Impact</th>
                <th className="px-4 py-3 font-medium">Forecast</th>
                <th className="px-4 py-3 font-medium">Previous</th>
              </tr>
            </thead>
            <tbody>
              {econEvents.map((e, i) => (
                <tr
                  key={i}
                  className={
                    "border-t border-[#1c1c1c] transition hover:bg-white/[0.02] " +
                    (e.today ? "bg-purple-500/[0.06]" : "")
                  }
                >
                  <td className="px-4 py-3 text-white">
                    <div className="font-semibold">{e.date}</div>
                    <div className="text-xs text-muted-foreground">{e.time}</div>
                  </td>
                  <td className="px-4 py-3 text-white">{e.event}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.market}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-xs text-white">
                      <span className={"h-2 w-2 rounded-full " + impactColor(e.impact)} />
                      {e.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-white">{e.forecast}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{e.previous}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-3 text-right">
        <a href="#" className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-sm font-semibold text-transparent">
          View Full Calendar →
        </a>
      </div>
    </section>
  );
}
import { trendingNews, marketSnapshot } from "@/lib/news-data";

export function NewsSidebar() {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-20 lg:self-start">
      {/* Trending */}
      <div className="rounded-xl border border-[#222] bg-[#141414] p-5">
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <span>🔥</span> Trending Now
        </h3>
        <ol className="space-y-3">
          {trendingNews.map((t, i) => (
            <li key={i} className="group flex gap-3">
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text font-display text-2xl font-bold leading-none text-transparent">
                {i + 1}
              </span>
              <a href="#" className="flex-1">
                <p className="line-clamp-2 text-sm font-medium text-white group-hover:text-purple-300">{t.title}</p>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-purple-300">{t.category}</span>
                  <span className="text-muted-foreground">{t.reads}</span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* News alerts */}
      <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-5">
        <h3 className="font-display text-lg font-bold text-white">Prop Firm News Alerts</h3>
        <p className="mt-1 text-sm text-muted-foreground">Get news alerts straight to your inbox.</p>
        <form className="mt-4 flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full rounded-lg border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none"
          />
          <button className="rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
            Subscribe
          </button>
        </form>
        <p className="mt-2 text-[11px] text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </div>

      {/* Market snapshot */}
      <div className="rounded-xl border border-[#222] bg-[#141414] p-5">
        <h3 className="mb-4 font-display text-lg font-bold text-white">Quick Market Snapshot</h3>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {marketSnapshot.map((m) => (
            <div key={m.ticker} className="flex items-center justify-between rounded-lg border border-[#1f1f1f] bg-[#0c0c0c] px-3 py-2">
              <span className="font-display font-bold text-white">{m.ticker}</span>
              <span className="font-mono text-sm text-muted-foreground">{m.price}</span>
              <span className={"font-mono text-xs font-semibold " + (m.up ? "text-emerald-400" : "text-red-400")}>
                {m.change} {m.up ? "▲" : "▼"}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">Data for reference only. Not financial advice.</p>
      </div>

      {/* Discord CTA */}
      <div className="rounded-xl border border-[#222] bg-[#141414] p-5 text-center">
        <p className="text-sm text-muted-foreground">Discuss the markets with other traders</p>
        <a
          href="#"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#5865F2] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Join our Discord
        </a>
      </div>
    </aside>
  );
}
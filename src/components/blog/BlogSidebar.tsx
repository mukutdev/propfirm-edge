import { useState } from "react";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  categoryCounts: { name: string; count: number }[];
};

export function BlogSidebar({ search, onSearch, categoryCounts }: Props) {

  const [email, setEmail] = useState("");
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-20 lg:self-start">
      <div className="rounded-xl border border-[#222] bg-[#141414] p-5">
        <label className="mb-2 block font-display text-sm font-bold text-white">Search Articles</label>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Type to filter…"
          className="w-full rounded-lg border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.25)] focus:outline-none"
        />
      </div>

      <div className="rounded-xl border border-[#222] bg-[#141414] p-5">
        <h3 className="mb-3 font-display text-lg font-bold text-white">Popular Categories</h3>
        <ul className="flex flex-col gap-2">
          {categoryCounts.map((c) => (
            <li key={c.name}>
              <a href="#" className="group flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-white transition hover:bg-white/[0.03] hover:text-purple-300">
                <span>{c.name}</span>
                <span className="rounded-full border border-[#2a2a2a] bg-[#0c0c0c] px-2 py-0.5 text-xs text-muted-foreground group-hover:text-white">
                  {c.count}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-5">
        <h3 className="font-display text-lg font-bold text-white">🧮 Challenge Calculator</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your account size and see your exact profit targets and loss limits.
        </p>
        <a
          href="#"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Use Calculator →
        </a>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#141414] p-5 text-center">
        <div className="mb-2 inline-flex items-center justify-center gap-2 font-display text-base font-bold text-white">
          <span className="text-red-500">▶</span> Watch on YouTube
        </div>
        <p className="text-sm text-muted-foreground">
          Follow Hanuman Trades for real trading content and prop firm walkthroughs.
        </p>
        <a
          href="#"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF0000] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#cc0000]"
        >
          ▶ Subscribe
        </a>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#141414] p-5">
        <h3 className="font-display text-base font-bold text-white">Get weekly tips</h3>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="mt-3 w-full rounded-lg border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none"
        />
      </div>
    </aside>
  );
}
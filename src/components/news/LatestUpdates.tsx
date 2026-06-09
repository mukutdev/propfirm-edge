import { useState } from "react";
import type { NewsArticle } from "@/lib/news-data";
import { Link } from "@tanstack/react-router";

export function LatestUpdates({ items }: { items: NewsArticle[] }) {
  const [limit, setLimit] = useState(6);
  const visible = items.slice(0, limit);
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <h2 className="font-display text-2xl font-bold text-white">Latest Updates</h2>
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#222] bg-[#141414]">
        {visible.map((a, i) => (
          <Link
            key={a.id}
            to="/news/$slug"
            params={{ slug: a.id }}
            className="group flex items-center gap-4 border-l-2 border-transparent border-b border-b-[#222] p-4 transition-all duration-200 last:border-b-0 hover:border-l-purple-500 hover:bg-white/[0.02]"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-purple-900/40 to-pink-900/30">
              <svg viewBox="0 0 60 60" className="h-full w-full">
                <polyline
                  points={`0,${40 + (i % 3) * 5} 15,${30 - i} 30,${35 + i} 45,${20 + (i % 4) * 3} 60,${15 + (i % 5)}`}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 font-medium text-purple-300">
                  {a.category}
                </span>
                <span className="text-muted-foreground">{a.timeAgo}</span>
              </div>
              <p className="truncate text-sm font-medium text-white group-hover:text-purple-200">
                {a.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {limit < items.length && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setLimit((l) => l + 4)}
            className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] p-[1px] text-sm font-semibold"
          >
            <span className="block rounded-full bg-[#0c0c0c] px-6 py-2 text-white transition hover:bg-transparent">
              Load More
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
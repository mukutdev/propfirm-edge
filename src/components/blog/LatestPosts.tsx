import { useState } from "react";
import type { BlogPostRow } from "@/lib/blog.functions";
import { ArticleCard } from "./ArticleCard";

export function LatestPosts({ posts }: { posts: BlogPostRow[] }) {
  const [limit, setLimit] = useState(6);
  const visible = posts.slice(0, limit);
  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-bold text-white">Latest Posts</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <ArticleCard post={p} seed={30 + i} />
          </div>
        ))}
      </div>
      {limit < posts.length && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setLimit((l) => l + 3)}
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

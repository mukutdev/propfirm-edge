import type { BlogPostRow } from "@/lib/blog.functions";
import { ArticleCard } from "./ArticleCard";
import { Link } from "@tanstack/react-router";

type Props = {
  icon: string;
  category: string;
  posts: BlogPostRow[];
  seedOffset?: number;
};

export function CategorySection({ icon, category, posts, seedOffset = 0 }: Props) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 border-l-2 border-transparent pl-3 font-display text-xl font-bold text-white sm:text-2xl">
          <span
            aria-hidden
            className="-ml-3 h-7 w-1 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#EC4899]"
          />
          <span className="text-2xl">{icon}</span>
          {category}
        </h2>
        <Link to="/blog" className="shrink-0 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-sm font-semibold text-transparent">
          View All →
        </Link>
      </div>
      <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {posts.map((p, i) => (
          <div key={p.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <ArticleCard post={p} seed={seedOffset + i + 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

import type { BlogPostRow } from "@/lib/blog.functions";
import { categoryLabel, formatPostDate } from "@/lib/blog-data";
import { ChartArt } from "@/components/news/ChartArt";
import { Link } from "@tanstack/react-router";

export function ArticleCard({ post, seed = 1 }: { post: BlogPostRow; seed?: number }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#222] bg-[#141414] transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_10px_40px_-15px_rgba(124,58,237,0.5)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {post.featuredImage ? (
          <img src={post.featuredImage} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <ChartArt seed={seed} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-purple-500/15 px-2 py-0.5 font-medium text-purple-300">{categoryLabel(post.category)}</span>
          <span className="text-muted-foreground">⏱ {post.readTimeMins} min read</span>
        </div>
        <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#EC4899] group-hover:bg-clip-text group-hover:text-transparent">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
            <span className="text-white">{post.authorName}</span>
          </div>
          <span className="text-muted-foreground">{formatPostDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/lib/blog-data";
import { getRelatedBlogPosts } from "@/lib/blog-data";
import { ChartArt } from "@/components/news/ChartArt";
import { ArticleCard } from "./ArticleCard";

function paragraphs(post: BlogPost): string[] {
  return [
    post.excerpt,
    `In this guide we break down exactly what ${post.title.toLowerCase().replace(/\.$/, "")} means for funded traders in 2026 — without the fluff. You'll get the rules, the trade-offs and the practical takeaways you can apply on your next session.`,
    `Most traders skip the boring stuff and pay for it later. The rules below are the same ones we use when we evaluate a prop firm for our own capital, and the same checklist we hand to every trader we coach inside the community.`,
    `If you only remember three things from this article, remember these: protect your max drawdown, respect the daily loss limit, and never break a rule for a trade that "looks too good to miss". Edge compounds. Mistakes compound faster.`,
    `Below we walk through the framework, share the numbers behind our recommendation, and finish with a short checklist you can save for your next evaluation.`,
  ];
}

export function BlogArticle({ post }: { post: BlogPost }) {
  const related = getRelatedBlogPosts(post, 3);
  const body = paragraphs(post);
  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-8">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-white">Home</Link>
        <span className="px-2">/</span>
        <Link to="/blog" className="hover:text-white">Blog</Link>
        <span className="px-2">/</span>
        <span className="text-white">{post.category}</span>
      </nav>

      <header className="mb-8 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center rounded-full bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-300">
          {post.category}
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-3 border-y border-[#222] py-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
            <div>
              <div className="font-semibold text-white">{post.author}</div>
              <div className="text-xs text-muted-foreground">{post.date} · ⏱ {post.readTime}</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="rounded-full border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-1.5 text-xs text-muted-foreground transition hover:text-white">Share</button>
            <button className="rounded-full border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-1.5 text-xs text-muted-foreground transition hover:text-white">Save</button>
          </div>
        </div>
      </header>

      <div className="relative mb-10 aspect-[16/8] w-full overflow-hidden rounded-2xl border border-[#222]">
        <ChartArt seed={post.id.length + 5} />
      </div>

      <div className="prose prose-invert max-w-none">
        {body.map((p, i) => (
          <p key={i} className="mb-5 text-base leading-relaxed text-[#d4d4d8]">{p}</p>
        ))}

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-white">The Framework</h2>
        <p className="mb-5 text-base leading-relaxed text-[#d4d4d8]">
          Use this 3-step framework on every challenge attempt — it forces you to slow down and trade the plan, not the screen.
        </p>
        <ul className="mb-6 space-y-2 pl-5 text-[#d4d4d8] [&>li]:list-disc">
          <li>Define your daily max loss in dollars — write it on a sticky note.</li>
          <li>Cap your trades per session. Quality over quantity, every time.</li>
          <li>Journal each trade with the rule it followed or broke.</li>
        </ul>

        <blockquote className="my-8 rounded-r-xl border-l-4 border-purple-500 bg-[#141414] px-5 py-4 italic text-white">
          "The traders who get funded fastest are the ones who treat the evaluation like a job, not a lottery ticket."
        </blockquote>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-white">Final Word</h2>
        <p className="mb-5 text-base leading-relaxed text-[#d4d4d8]">
          Save this post, share it with a trading friend, and check the related guides below for deeper reads on the topics we touched on.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-6 text-center">
        <h3 className="font-display text-xl font-bold text-white">Ready to find your prop firm?</h3>
        <p className="mt-1 text-sm text-muted-foreground">Browse our handpicked reviews of the top firms in 2026.</p>
        <Link
          to="/reviews"
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          See Top Prop Firms →
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-display text-2xl font-bold text-white">Related Articles</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ArticleCard key={p.id} post={p} seed={i + 50} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
import { Link } from "@tanstack/react-router";
import type { BlogPostRow } from "@/lib/blog.functions";
import { categoryLabel, formatPostDate } from "@/lib/blog-data";
import { ChartArt } from "@/components/news/ChartArt";
import { ArticleCard } from "./ArticleCard";

type Block =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

function parseContent(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split("\n");
  let para: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      blocks.push({ kind: "p", text: para.join(" ") });
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list.type === "ul" ? { kind: "ul", items: list.items } : { kind: "ol", items: list.items });
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push({ kind: "h2", text: line.slice(3) });
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(line.slice(2));
      continue;
    }
    const ordered = /^\d+\.\s+/.exec(line);
    if (ordered) {
      flushPara();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(line.slice(ordered[0].length));
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

export function BlogArticle({ post, related }: { post: BlogPostRow; related: BlogPostRow[] }) {
  const blocks = parseContent(post.content);
  return (
    <article className="mx-auto max-w-3xl px-4 pb-14 pt-6">
      <nav className="mb-5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-white">Home</Link>
        <span className="px-2">/</span>
        <Link to="/blog" className="hover:text-white">Blog</Link>
        <span className="px-2">/</span>
        <span className="line-clamp-1 inline text-white">{post.title}</span>
      </nav>

      <header className="mb-6 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center rounded-full bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-300">
          {categoryLabel(post.category)}
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{post.title}</h1>
        <p className="text-base text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-3 border-y border-[#1e1e1e] py-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
            <div>
              <div className="font-semibold text-white">{post.authorName}</div>
              <div className="text-xs text-muted-foreground">
                {formatPostDate(post.publishedAt)} · ⏱ {post.readTimeMins} min read
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative mb-8 aspect-[16/8] w-full overflow-hidden rounded-2xl border border-[#222]">
        {post.featuredImage ? (
          <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover" />
        ) : (
          <ChartArt seed={post.slug.length + 5} />
        )}
      </div>

      <div className="max-w-none">
        {blocks.map((b, i) => {
          if (b.kind === "h2") {
            return (
              <h2 key={i} className="mb-3 mt-8 font-display text-2xl font-bold text-white">
                {b.text}
              </h2>
            );
          }
          if (b.kind === "ul") {
            return (
              <ul key={i} className="mb-5 space-y-2 pl-5 text-[#d4d4d8] [&>li]:list-disc">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          }
          if (b.kind === "ol") {
            return (
              <ol key={i} className="mb-5 space-y-2 pl-5 text-[#d4d4d8] [&>li]:list-decimal">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          }
          return (
            <p key={i} className="mb-5 text-base leading-relaxed text-[#d4d4d8]">
              {b.text}
            </p>
          );
        })}
      </div>

      <div className="mt-10 flex items-start gap-4 rounded-2xl border border-[#222] bg-[#141414] p-5">
        <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
        <div>
          <div className="font-display text-base font-bold text-white">{post.authorName}</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Funded futures trader and contributor at Trading With Prop Firms. Writes on evaluation rules, drawdown
            mechanics and payout terms across the firms we track.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-6 text-center">
        <h3 className="font-display text-xl font-bold text-white">Comparing firms next?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Drawdown type, payout speed and profit split for every firm we track — side by side.
        </p>
        <Link
          to="/compare"
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Compare Prop Firms →
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-white">More From {categoryLabel(post.category)}</h2>
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

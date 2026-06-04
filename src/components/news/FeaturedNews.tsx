import { featuredArticle } from "@/lib/news-data";
import { ChartArt } from "./ChartArt";

export function FeaturedNews() {
  const a = featuredArticle;
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <article className="group relative grid grid-cols-1 overflow-hidden rounded-2xl border border-purple-500/20 bg-[#141414] shadow-[0_0_60px_-30px_rgba(124,58,237,0.6)] md:grid-cols-5">
        <div className="order-2 flex flex-col gap-4 p-6 md:order-1 md:col-span-3 md:p-10">
          <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {a.category}
          </span>
          <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {a.title}
          </h2>
          <p className="line-clamp-2 text-base text-muted-foreground">{a.excerpt}</p>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
            <span className="text-white">{a.author}</span>
            <span className="text-muted-foreground">· {a.date}</span>
          </div>
          <a
            href="#"
            className="mt-2 inline-flex w-fit items-center gap-1 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-sm font-semibold text-transparent"
          >
            Read Full Story →
          </a>
        </div>
        <div className="relative order-1 h-56 overflow-hidden md:order-2 md:col-span-2 md:h-auto">
          <ChartArt seed={7} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent md:bg-gradient-to-l" />
        </div>
      </article>
    </section>
  );
}
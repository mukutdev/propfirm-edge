import { ArrowRight } from "lucide-react";
import { newsItems } from "@/lib/home-data";
import { useReveal } from "@/hooks/use-reveal";

export function MarketNews() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-32 border-y border-[#222] bg-[#0a0a0a]" aria-label="Latest market news">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl gradient-underline">
            Markets & Trading News
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((n) => (
            <article key={n.title} className="card-surface p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#7c3aed]/40 text-[#c4a8ff]">
                  {n.category}
                </span>
                <span className="text-xs text-[#888]">{n.date}</span>
              </div>
              <h3 className="font-display font-bold text-xl leading-snug">{n.title}</h3>
              <p className="text-sm text-[#888] leading-relaxed">{n.excerpt}</p>
              <a href="#" className="mt-auto inline-flex items-center gap-1 text-sm text-[#a78bfa] hover:text-white transition-colors">
                Read More <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
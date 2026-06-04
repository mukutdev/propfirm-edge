import { propFirmNews } from "@/lib/news-data";
import { ChartArt } from "./ChartArt";

export function PropFirmIndustry() {
  return (
    <section>
      <h2 className="mb-5 inline-block font-display text-2xl font-bold text-white">
        Prop Firm Industry Updates
        <span className="mt-1 block h-0.5 w-24 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {propFirmNews.map((a, i) => (
          <article
            key={a.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-[#222] bg-[#141414] transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_10px_40px_-15px_rgba(124,58,237,0.5)]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <ChartArt seed={i + 9} />
              {a.badge && (
                <span
                  className={
                    "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold " +
                    (a.badge.color === "orange"
                      ? "bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/40"
                      : "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40")
                  }
                >
                  {a.badge.label}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 font-medium text-purple-300">{a.category}</span>
                <span className="text-muted-foreground">{a.timeAgo}</span>
              </div>
              <h3 className="line-clamp-2 font-display text-base font-bold leading-snug text-white group-hover:text-purple-200">
                {a.title}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <a href="#" className="mt-auto inline-flex w-fit pt-2 text-sm font-semibold text-purple-400 hover:text-purple-300">
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
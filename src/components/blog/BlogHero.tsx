import { blogCategories } from "@/lib/blog-data";

type Props = { active: string; onChange: (c: string) => void };

export function BlogHero({ active, onChange }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[#1a1a1a] bg-[#080808] px-4 py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #4c1d95, transparent)" }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-5">
        <nav className="text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
          <span className="mx-2 opacity-60">/</span>
          <span className="text-foreground">Blog</span>
        </nav>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Trading Education &amp; Guides
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Everything you need to understand prop trading, pass your challenge and become a consistently funded trader.
        </p>
        <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {blogCategories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => onChange(cat)}
                className={
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 " +
                  (isActive
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-[0_0_20px_-5px_rgba(124,58,237,0.6)]"
                    : "border border-[#2a2a2a] text-muted-foreground hover:border-purple-500/50 hover:text-white")
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
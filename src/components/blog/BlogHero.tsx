import { blogCategoryMeta } from "@/lib/blog-data";

type Props = { active: string; onChange: (c: string) => void };

export function BlogHero({ active, onChange }: Props) {
  const options: { slug: string; label: string }[] = [
    { slug: "All", label: "All" },
    ...blogCategoryMeta.map((c) => ({ slug: c.slug as string, label: c.label })),
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#1a1a1a] bg-[#080808] px-4 py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #4c1d95, transparent)" }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4">
        <nav className="text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
          <span className="mx-2 opacity-60">/</span>
          <span className="text-foreground">Blog</span>
        </nav>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Prop Trading Education
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Drawdown rules, position sizing, contract specs and payout mechanics — written for traders working through an evaluation, not for beginners chasing signals.
        </p>
        <div className="-mx-1 mt-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {options.map((cat) => {
            const isActive = active === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onChange(cat.slug)}
                className={
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 " +
                  (isActive
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-[0_0_20px_-5px_rgba(124,58,237,0.6)]"
                    : "border border-[#2a2a2a] text-muted-foreground hover:border-purple-500/50 hover:text-white")
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

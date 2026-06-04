const cols = [
  {
    icon: "💰",
    title: "How We Make Money",
    body: "Some links on this site are affiliate links. When you sign up through our link we may earn a commission at no extra cost to you.",
  },
  {
    icon: "🚫",
    title: "What This Does NOT Mean",
    body: "We never accept payment for positive reviews. A firm being an affiliate partner does not influence our rating or recommendation.",
  },
  {
    icon: "🤝",
    title: "Our Promise to You",
    body: "If a firm is bad we will say so. We've turned down affiliate partnerships with firms we don't believe in. Your trust matters more.",
  },
];

export function Transparency() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#F59E0B]/30 bg-[#181818] shadow-[0_0_60px_-30px_rgba(245,158,11,0.5)]">
        <div className="border-b border-[#F59E0B]/20 bg-gradient-to-r from-[#F59E0B]/10 to-transparent p-6 sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F59E0B]">
            🛡 Honest Disclosure
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Our Affiliate Disclaimer — Plain English
          </h2>
        </div>
        <div className="grid grid-cols-1 divide-y divide-[#222] md:grid-cols-3 md:divide-x md:divide-y-0">
          {cols.map((c) => (
            <div key={c.title} className="p-6 sm:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F59E0B]/15 text-lg">{c.icon}</div>
              <h3 className="mt-3 font-display text-lg font-bold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
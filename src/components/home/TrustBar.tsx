const stats = [
  { value: "12+", label: "Prop Firms Reviewed" },
  { value: "10+", label: "Years Trading Experience" },
  { value: "$0", label: "Hidden Bias" },
  { value: "Weekly", label: "Updated Cadence" },
];

export function TrustBar() {
  return (
    <section className="border-b border-[#222]" aria-label="Trust stats">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8 divide-x divide-[#222]">
        {stats.map((s, i) => (
          <div key={i} className="text-center px-4">
            <div className="font-display font-bold text-4xl md:text-5xl text-gradient">{s.value}</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-[#888]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
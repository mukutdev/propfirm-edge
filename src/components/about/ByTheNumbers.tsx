const stats = [
  { value: "10+", label: "Years Trading" },
  { value: "4", label: "Active Funded Accounts" },
  { value: "12+", label: "Firms Reviewed" },
  { value: "$0", label: "Paid Placements" },
  { value: "Weekly", label: "Updates" },
];

export function ByTheNumbers() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#222] bg-[#141414] p-8 sm:p-10">
        <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          By the Numbers
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text font-display text-4xl font-bold text-transparent sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
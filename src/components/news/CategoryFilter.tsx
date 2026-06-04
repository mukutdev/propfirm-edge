import { useState } from "react";
import { newsCategories } from "@/lib/news-data";

type Props = {
  active: string;
  onChange: (c: string) => void;
};

export function CategoryFilter({ active, onChange }: Props) {
  const [range, setRange] = useState<"week" | "month" | "all">("week");
  return (
    <div className="sticky top-0 z-30 border-b border-[#222] bg-[#141414]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {newsCategories.map((cat) => {
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
        <div className="inline-flex shrink-0 rounded-full border border-[#2a2a2a] bg-[#0c0c0c] p-1 text-xs">
          {(["week", "month", "all"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                "rounded-full px-3 py-1 transition " +
                (range === r ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white")
              }
            >
              {r === "week" ? "This Week" : r === "month" ? "This Month" : "All Time"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
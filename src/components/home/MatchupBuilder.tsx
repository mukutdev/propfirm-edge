import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { reviewFirms } from "@/lib/home-data";

const slots = [0, 1, 2, 3, 4];

function initials(name: string) {
  return name
    .replace(/\.com/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function MatchupBuilder() {
  const [picked, setPicked] = useState<string[]>(["", "", "", "", ""]);
  const selected = picked.filter(Boolean);
  const ready = selected.length >= 2;

  const set = (i: number, value: string) =>
    setPicked((prev) => prev.map((p, idx) => (idx === i ? value : p)));

  return (
    <div className="mt-12 max-w-[720px] mx-auto gradient-border">
      <div className="rounded-[15px] bg-[#141414] p-7 text-center">
        <div className="icon-breathe mx-auto h-12 w-12 rounded-full bg-gradient-brand flex items-center justify-center">
          <Scale size={20} className="text-white" />
        </div>
        <h3 className="mt-4 font-display font-bold text-2xl md:text-3xl">Build Your Own Comparison</h3>
        <p className="mt-2 text-sm text-[#888] max-w-lg mx-auto">
          Pick up to 5 firms and put their evaluation rules, drawdown type, profit split and payout
          schedule side by side.
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          {slots.map((i) => {
            const value = picked[i];
            return (
              <label
                key={i}
                className={`relative flex items-center gap-2 rounded-lg border bg-[#101010] px-2.5 py-2 text-left transition-colors ${
                  value ? "border-[#7c3aed]" : "border-[#2a2a2a]"
                } ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-bold ${
                    value ? "bg-gradient-brand text-white" : "bg-[#1c1c1c] text-[#555]"
                  }`}
                >
                  {value ? initials(value) : i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] text-white/85">
                  {value || `Select firm ${i + 1}`}
                </span>
                <select
                  value={value}
                  aria-label={`Select firm ${i + 1}`}
                  onChange={(e) => set(i, e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                >
                  <option value="">Select firm {i + 1}</option>
                  {reviewFirms.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {ready ? (
            <Link to="/compare" hash="custom-compare" className="btn-gradient glow-pulse">
              Build My Matchup →
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-6 py-3 text-sm font-semibold text-[#666]"
            >
              Build My Matchup →
            </span>
          )}

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {selected.map((name) => (
                <span
                  key={name}
                  title={name}
                  className="grid h-7 w-7 place-items-center rounded-full border border-[#141414] bg-gradient-brand text-[9px] font-bold text-white"
                >
                  {initials(name)}
                </span>
              ))}
            </div>
            <span className="text-xs text-[#888]">
              {selected.length === 0
                ? "Pick at least 2 firms"
                : `${selected.length} firm${selected.length > 1 ? "s" : ""} selected`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

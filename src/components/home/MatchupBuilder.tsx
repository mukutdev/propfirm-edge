import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { reviewFirms } from "@/lib/home-data";

const slots = [1, 2, 3, 4, 5];

export function MatchupBuilder() {
  return (
    <div className="mt-14 max-w-[700px] mx-auto card-surface p-8 text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-gradient-brand flex items-center justify-center">
        <Scale size={20} className="text-white" />
      </div>
      <h3 className="mt-5 font-display font-bold text-2xl md:text-3xl">Want a Custom Comparison?</h3>
      <p className="mt-3 text-sm text-[#888] max-w-lg mx-auto">
        Pick up to 5 prop firms and compare them side by side — evaluation rules, funded rules, pricing, everything.
      </p>

      <div className="mt-7 grid grid-cols-2 md:grid-cols-5 gap-3">
        {slots.map((n) => (
          <select
            key={n}
            defaultValue=""
            aria-label={`Select Firm ${n}`}
            className={`w-full bg-[#141414] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-xs text-white transition-shadow focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.25)] ${
              n === 5 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <option value="">Select Firm {n}</option>
            {reviewFirms.map((f) => (
              <option key={f.name} value={f.name} className="bg-[#141414]">
                {f.name}
              </option>
            ))}
          </select>
        ))}
      </div>

      <Link to="/compare" hash="custom-compare" className="btn-gradient mt-7">
        Build My Matchup →
      </Link>
    </div>
  );
}

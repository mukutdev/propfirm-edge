import { Star } from "lucide-react";
import { featuredFirms, type Firm } from "@/lib/home-data";
import { useReveal } from "@/hooks/use-reveal";

function badgeClass(color: Firm["badgeColor"]) {
  if (color === "purple") return "bg-[#7c3aed]/15 text-[#c4a8ff] border-[#7c3aed]/40";
  if (color === "pink") return "bg-[#ec4899]/15 text-[#ffb1d4] border-[#ec4899]/40";
  return "bg-[#00d97e]/10 text-[#5cf3ad] border-[#00d97e]/40";
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="font-display font-bold text-base text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[#888] mt-1">{label}</div>
    </div>
  );
}

function FirmCard({ firm }: { firm: Firm }) {
  return (
    <article className="card-surface p-6 flex flex-col gap-5 min-w-[300px] snap-start">
      <div className="flex items-start justify-between">
        <div className="h-12 w-28 rounded-md bg-[#1f1f1f] flex items-center justify-center text-xs text-white/60 font-medium">
          {firm.name}
        </div>
        <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeClass(firm.badgeColor)}`}>
          {firm.badge}
        </span>
      </div>

      <div>
        <h3 className="font-display font-bold text-2xl">{firm.name}</h3>
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={14} className={i <= Math.round(firm.rating) ? "fill-[#facc15] text-[#facc15]" : "text-[#333]"} />
          ))}
          <span className="text-xs text-[#888] ml-2">{firm.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#222]">
        <Stat label="Max Funding" value={firm.maxFunding} />
        <Stat label="Profit Split" value={firm.split} />
        <Stat label="Monthly Fee" value={firm.fee} />
      </div>

      <div className="flex gap-3 mt-auto">
        <a href="#" className="btn-ghost flex-1 text-sm py-2.5">Read Review</a>
        <a href="#" className="btn-gradient flex-1 text-sm py-2.5">Get Discount</a>
      </div>
    </article>
  );
}

export function FeaturedFirms() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="firms" className="py-24 md:py-32" aria-label="Top rated prop firms">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl gradient-underline">
            Top Rated Prop Firms
          </h2>
          <p className="mt-4 text-[#888] max-w-xl">
            Our editor-curated picks of the strongest funded-trading programs running right now.
          </p>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {featuredFirms.map((f) => (
            <FirmCard key={f.name} firm={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
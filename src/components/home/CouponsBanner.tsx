import { Link } from "@tanstack/react-router";
import { ArrowRight, Tag } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { coupons } from "@/lib/coupons-data";
import { CopyCodeButton } from "@/components/coupons/CopyCodeButton";

const picks = coupons.filter((c) => !c.expired).slice(0, 3);

export function CouponsBanner() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-14 md:py-20" aria-label="Coupon codes">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="gradient-border">
          <div className="rounded-[15px] bg-[#0d0d0d] px-6 md:px-10 py-10 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border border-[#2a2a2a] text-white/80">
                  <Tag size={12} className="text-[#ec4899]" /> Exclusive Discounts
                </span>
                <h2 className="mt-5 font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05]">
                  Never pay <span className="text-gradient">full price</span> for a challenge.
                </h2>
                <p className="mt-3 text-[#888]">
                  Codes negotiated directly with the firms — verified weekly, no expired junk.
                </p>
              </div>
              <Link
                to="/coupons"
                className="btn-gradient btn-shimmer self-start lg:self-auto"
              >
                See All Coupons <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-4">
              {picks.map((c) => (
                <div
                  key={c.code}
                  className="relative overflow-hidden rounded-xl bg-[#141414] border border-[#222] p-5 transition-all duration-300 hover:border-[#7c3aed]/60 hover:-translate-y-1"
                >
                  <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#0d0d0d]" />
                  <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#0d0d0d]" />
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display font-bold text-lg leading-tight">{c.firm}</p>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-gradient-brand text-white whitespace-nowrap">
                      {c.discountLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#888] leading-relaxed">{c.headline}</p>
                  <div className="mt-4 pt-4 border-t border-dashed border-[#2a2a2a] flex items-center justify-between gap-3">
                    <code className="font-mono text-sm tracking-wider text-white/90">{c.code}</code>
                    <CopyCodeButton code={c.code} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

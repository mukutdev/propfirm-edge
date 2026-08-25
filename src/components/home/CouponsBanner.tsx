import { useReveal } from "@/hooks/use-reveal";

export function CouponsBanner() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-14 md:py-20" aria-label="Coupon codes">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-brand px-8 md:px-14 py-14 md:py-20 text-center md:text-left md:flex md:items-center md:justify-between gap-10 shadow-[0_30px_80px_-30px_rgba(124,58,237,0.7)]">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">
              Exclusive Discount Codes — Save On Your Challenge Fee
            </h2>
            <p className="mt-4 text-white/85 text-lg">
              We negotiate deals directly with prop firms so you don't overpay.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center mt-8 md:mt-0 px-7 py-4 rounded-full bg-white text-[#080808] font-semibold hover:scale-[1.02] transition-transform whitespace-nowrap"
          >
            See All Coupons
          </a>
        </div>
      </div>
    </section>
  );
}
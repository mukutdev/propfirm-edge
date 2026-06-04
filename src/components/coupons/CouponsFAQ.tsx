import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do prop firm coupon codes actually work?",
    a: "Yes — every code on this page is negotiated directly with the prop firm and tested by our team. If a code stops working, we mark it expired within 24 hours.",
  },
  {
    q: "How often are new discount codes added?",
    a: "We refresh this page weekly and add new codes the moment firms run a promotion. Subscribe to our email list to get notified the same day a deal drops.",
  },
  {
    q: "Can I use a coupon code on a funded account upgrade?",
    a: "Most discount codes apply only to the initial evaluation purchase. A handful of firms run upgrade-specific promos — those are clearly labeled in the deal description above.",
  },
];

export function CouponsFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center gradient-underline">FAQ</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`card-surface overflow-hidden transition-colors ${isOpen ? "border-l-2 border-l-[#7c3aed] bg-[#1a1a1a]" : ""}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-display font-semibold text-base">{f.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-[#888] transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : ""}`} />
                </button>
                <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-[#bbb] leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
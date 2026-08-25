import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is the best prop firm for futures trading?",
    a: "Our top-rated futures prop firm right now is Apex Trader Funding, thanks to its 90% profit split, generous account sizes up to $300K and a long track record of fast payouts. Topstep, MyFundedFutures and TradeDay round out the top tier.",
  },
  {
    q: "What is a trailing drawdown and why does it matter?",
    a: "A trailing drawdown is a moving stop-out level that follows your peak account balance. The higher your equity climbs, the higher your floor moves, locking in profits. It is more restrictive than a static drawdown but rewards disciplined risk management.",
  },
  {
    q: "How do prop firm challenge fees work?",
    a: "Challenge fees are typically charged monthly or one-time and grant you access to a simulated evaluation account. Pass the rules and you are promoted to a funded account, often with the first month's fee refunded with your first payout.",
  },
  {
    q: "Which prop firm has the highest profit split?",
    a: "Several firms now offer a 90% profit split, including Apex Trader Funding, MyFundedFutures, Take Profit Trader and FundedNext Futures. A handful of programs reach 100% on the first portion of profits before reverting to standard splits.",
  },
];

export function CompareFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-14">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center gradient-underline">Frequently Asked Questions</h2>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`card-surface overflow-hidden transition-colors ${
                  isOpen ? "border-l-2 border-l-[#7c3aed] bg-[#1a1a1a]" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display font-semibold text-base">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#888] transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : ""}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
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
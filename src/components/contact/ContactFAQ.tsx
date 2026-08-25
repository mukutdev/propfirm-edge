import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How long does it take to get a response?", a: "We respond to every legitimate enquiry within 24 hours, Monday through Friday. Partnership and media requests may take up to 48 hours during busy weeks." },
  { q: "Do you accept paid reviews or sponsored posts?", a: "No. Every review on the site is independent and based on a real funded account. We earn through affiliate links — but only after a firm passes our quality standards." },
  { q: "My firm's information is wrong — how do I update it?", a: "Use the Report Outdated Info option in the form above with the firm name and what changed. We verify and update within 72 hours." },
];

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-14">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center">Frequently Asked</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`bg-[#141414] border border-[#222] rounded-xl overflow-hidden transition-colors ${isOpen ? "border-l-2 border-l-[#7c3aed] bg-[#1a1a1a]" : ""}`}>
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
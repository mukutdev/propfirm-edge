import { Check } from "lucide-react";

export function ForPropFirms() {
  const items = [
    "Honest, independent evaluation — we run the challenge ourselves",
    "Real funded-account testing before any listing goes live",
    "Audience of funded-account-ready futures traders",
    "Reviews re-checked monthly as rules and fees shift",
  ];
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#181818] border border-[#222] rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Are You a <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>Prop Firm?</span>
            </h2>
            <p className="mt-4 text-[#bbb] leading-relaxed">We list prop firms that pass a real evaluation and fund affiliate links for the ones that clear our quality bar. No pay-to-play, no inflated ratings.</p>
            <a href="#contact-form" className="inline-block mt-6 px-6 py-3 rounded-full font-display font-bold text-sm text-white transition-all hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]" style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>Discuss a Partnership →</a>
          </div>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#ddd]">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: "rgba(0,217,126,0.15)" }}>
                  <Check size={14} className="text-[#00D97E]" strokeWidth={3} />
                </span>
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
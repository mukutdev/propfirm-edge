import { Check } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const bullets = [
  "10+ years active futures trading experience",
  "Real accounts tested, not just spec sheets",
  "No firm pays us for a positive review",
  "Updated every time firm rules change",
];

export function WhyTrustUs() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-32" aria-label="Why trust us">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#888] mb-6">Why Trust Us</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05]">
            Built by a <span className="text-gradient">trader.</span><br />
            Not a marketer.
          </h2>
        </div>
        <ul className="space-y-5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-4 text-lg">
              <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#00d97e]/15 text-[#00d97e]">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="text-white/90">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
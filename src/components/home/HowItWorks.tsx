import { Search, Target, TrendingUp } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const steps = [
  { n: "01", icon: Search, title: "Browse & Compare", text: "Filter prop firms by funding, rules, fees, and our independent ratings." },
  { n: "02", icon: Target, title: "Pick Your Firm", text: "Choose the program that matches your trading style — and grab a discount." },
  { n: "03", icon: TrendingUp, title: "Get Funded & Trade", text: "Pass the evaluation, scale your account, and start trading real capital." },
];

export function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-14 md:py-20 border-y border-[#222] bg-[#0a0a0a]" aria-label="How it works">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl">How It Works</h2>
          <p className="mt-4 text-[#888]">Three steps to a funded futures account.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ n, icon: Icon, title, text }) => (
            <div key={n} className="relative card-surface p-8 overflow-hidden">
              <span className="absolute -top-4 -right-2 text-8xl font-display font-bold opacity-10 text-gradient leading-none">
                {n}
              </span>
              <Icon size={32} className="text-[#7c3aed]" />
              <h3 className="mt-6 font-display font-bold text-2xl">{title}</h3>
              <p className="mt-3 text-[#888] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
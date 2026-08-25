import { MessageCircle, Hash, Zap, Users } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const channels = ["#payout-proof", "#nq-setups", "#firm-alerts", "#eval-help"];

export function DiscordCTA() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="pb-24" aria-label="Discord community">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#5865F2]/25 bg-[#101018] px-7 md:px-12 py-10 md:py-12">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(55%_70%_at_100%_0%,rgba(88,101,242,0.22),transparent_70%)]" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-9 lg:gap-14">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-xl bg-[#5865F2] text-white flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(88,101,242,0.8)]">
                  <MessageCircle size={20} />
                </span>
                <div>
                  <p className="font-display font-semibold">Trading With Prop Firms</p>
                  <p className="text-xs text-[#7d8aff] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00d97e]" /> 2,400+ members · free
                  </p>
                </div>
              </div>

              <h2 className="mt-6 font-display font-bold text-3xl md:text-[2.6rem] leading-[1.05]">
                Where funded traders <span className="text-[#7d8aff]">actually talk.</span>
              </h2>
              <p className="mt-3 text-[#888] max-w-lg leading-relaxed">
                Payout screenshots, rule-change alerts and honest firm feedback — before it hits the blogs.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {channels.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/25 text-[#aab2ff]"
                  >
                    <Hash size={11} /> {c.replace("#", "")}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:w-[300px] shrink-0 rounded-xl border border-[#5865F2]/25 bg-[#0c0c14] p-6">
              <div className="space-y-4 text-sm">
                <p className="flex items-start gap-3 text-white/85">
                  <Zap size={16} className="mt-0.5 text-[#7d8aff] shrink-0" /> Instant alerts when a firm changes its rules
                </p>
                <p className="flex items-start gap-3 text-white/85">
                  <Users size={16} className="mt-0.5 text-[#7d8aff] shrink-0" /> Ask traders who passed the eval you&apos;re on
                </p>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-[#5865F2] hover:bg-[#4752c4] transition-colors"
              >
                <MessageCircle size={17} /> Join Free Discord
              </a>
              <p className="mt-3 text-center text-[11px] text-[#666]">No spam. Leave any time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

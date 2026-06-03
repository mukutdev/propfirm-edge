import { MessageCircle } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export function DiscordCTA() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="pb-24" aria-label="Discord community">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6">
        <div className="card-surface text-center px-8 py-14 md:py-20">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-[#5865F2]/15 text-[#7d8aff] flex items-center justify-center">
            <MessageCircle size={28} />
          </div>
          <h2 className="mt-6 font-display font-bold text-3xl md:text-5xl">Join the Community</h2>
          <p className="mt-4 text-[#888] max-w-xl mx-auto text-lg">
            Connect with funded traders, share setups and get prop firm tips in our free Discord.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 mt-8 px-7 py-3.5 rounded-full font-semibold text-white bg-[#5865F2] hover:bg-[#4752c4] transition-colors"
          >
            <MessageCircle size={18} /> Join Free Discord
          </a>
        </div>
      </div>
    </section>
  );
}
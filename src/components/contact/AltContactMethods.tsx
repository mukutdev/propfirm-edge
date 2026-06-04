import { MessageCircle, Youtube, Mail } from "lucide-react";

export function AltContactMethods() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="group bg-[#141414] border border-[#222] rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(88,101,242,0.5)]">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#5865F2,#404EED)" }}>
            <MessageCircle size={22} className="text-white" />
          </div>
          <h3 className="font-display font-bold text-lg mb-1.5">Join our Discord</h3>
          <p className="text-sm text-[#888] mb-5 leading-relaxed">Fastest way to get a response — ask questions in real time.</p>
          <a href="#" className="inline-block w-full text-center py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90" style={{ background: "#5865F2" }}>Join Discord →</a>
        </div>
        <div className="group bg-[#141414] border border-[#222] rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(255,0,0,0.4)]">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#FF0000,#CC0000)" }}>
            <Youtube size={22} className="text-white" />
          </div>
          <h3 className="font-display font-bold text-lg mb-1.5">Comment on YouTube</h3>
          <p className="text-sm text-[#888] mb-5 leading-relaxed">Drop a comment on any video at Hanuman Trades on YouTube.</p>
          <a href="#" className="inline-block w-full text-center py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90" style={{ background: "#FF0000" }}>Visit Channel →</a>
        </div>
        <div className="group bg-[#141414] border border-[#222] rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(236,72,153,0.4)]">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>
            <Mail size={22} className="text-white" />
          </div>
          <h3 className="font-display font-bold text-lg mb-1.5">Direct Email</h3>
          <p className="text-sm text-[#888] mb-3 leading-relaxed">Prefer email? Drop us a line directly.</p>
          <a href="mailto:hello@tradingwithpropfirms.com" className="font-semibold text-sm bg-clip-text text-transparent break-all" style={{ backgroundImage: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>hello@tradingwithpropfirms.com</a>
        </div>
      </div>
    </section>
  );
}
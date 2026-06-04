import { useState } from "react";

export function EmailStrip() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mt-24">
      <div
        className="card-surface p-10 text-center"
        style={{
          boxShadow: "0 -1px 0 rgba(124,58,237,0.4), 0 1px 0 rgba(124,58,237,0.4), 0 0 40px -10px rgba(124,58,237,0.4)",
          borderTop: "1px solid rgba(124,58,237,0.5)",
          borderBottom: "1px solid rgba(124,58,237,0.5)",
        }}
      >
        <h2 className="font-display font-bold text-2xl md:text-3xl">Get New Deals Straight to Your Inbox</h2>
        <p className="text-[#888] mt-3 max-w-xl mx-auto">
          We'll email you when new discount codes drop. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@trader.com"
            className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-full px-5 py-3 text-sm text-white placeholder:text-[#666] focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)] transition"
          />
          <button type="submit" className="btn-gradient text-sm">
            {sent ? "✓ Subscribed" : "Notify Me"}
          </button>
        </form>
        <p className="text-xs text-[#666] mt-4">Join 1,200+ traders already subscribed</p>
      </div>
    </section>
  );
}
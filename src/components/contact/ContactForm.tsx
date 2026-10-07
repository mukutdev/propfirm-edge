import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";

export type Reason = "general" | "partnership" | "report" | "media";

const reasonMeta: Record<Reason, { headline: string; subject: string }> = {
  general: { headline: "Send Us a Message", subject: "General Enquiry" },
  partnership: { headline: "Tell Us About Your Firm", subject: "Prop Firm Affiliates" },
  report: { headline: "What Needs Updating?", subject: "Report Outdated Info" },
  media: { headline: "Let's Collaborate", subject: "Media or Collaboration" },
};

export const REASONS: Array<{ id: Reason; icon: string; label: string; desc: string }> = [
  { id: "general", icon: "📩", label: "General Enquiry", desc: "Question about trading, a specific firm, or something on this site." },
  { id: "partnership", icon: "🤝", label: "Prop Firm Affiliates", desc: "Do you want to be in business with Trading With Prop Firms?" },
  { id: "report", icon: "🐛", label: "Report Outdated Info", desc: "Help us provide the most accurate information as Prop Firms are constantly evolving in this space." },
  { id: "media", icon: "🎙️", label: "Media or Collaboration", desc: "Podcast, YouTube collab, or press enquiry — let's talk" },
];

function ReasonCards({ value, onChange }: { value: Reason; onChange: (r: Reason) => void }) {
  return (
    <div className="max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      {REASONS.map((r) => {
        const selected = value === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onChange(r.id)}
            className={`group relative text-left rounded-xl p-5 transition-all duration-200 ${
              selected
                ? "bg-[#1A1A2E] shadow-[0_0_0_1.5px_rgba(124,58,237,0.7),0_10px_30px_-10px_rgba(124,58,237,0.4)]"
                : "bg-[#141414] border border-[#222] hover:border-[#333]"
            }`}
          >
            {selected && (
              <span
                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
            )}
            <div
              className={`text-3xl mb-3 transition-all ${selected ? "scale-110" : ""}`}
              style={
                selected
                  ? {
                      backgroundImage: "linear-gradient(135deg,#7C3AED,#EC4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : undefined
              }
            >
              {r.icon}
            </div>
            <div className="font-display font-bold text-base mb-1">{r.label}</div>
            <p className="text-xs text-[#888] leading-relaxed">{r.desc}</p>
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-[#888] mb-1.5 font-medium">{label}</span>
      {children}
      {error && <span className="block text-xs text-[#FF3B5C] mt-1">{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full bg-[#0D0D0D] border border-[#222] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[#555] outline-none transition-all duration-200 focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]";

export function ContactForm() {
  const [reason, setReason] = useState<Reason>("general");
  const [subject, setSubject] = useState(reasonMeta.general.subject);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const setReasonAndSubject = (r: Reason) => {
    setReason(r);
    setSubject(reasonMeta[r].subject);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto px-6">
        <ReasonCards value={reason} onChange={setReasonAndSubject} />

        <div className="mt-10 max-w-[600px] mx-auto bg-[#141414] border border-[#222] rounded-xl p-6 md:p-8">
          {status === "success" ? (
            <div className="text-center py-10 animate-in fade-in duration-500">
              <div
                className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg,#00D97E,#0bbf6e)" }}
              >
                <Check size={28} strokeWidth={3} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-2">Message Sent!</h3>
              <p className="text-[#bbb] text-sm">Thanks! We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-display font-bold text-2xl mb-2">{reasonMeta[reason].headline}</h2>

              <div>
                <span className="block text-xs text-[#888] mb-1.5 font-medium">Contact Name</span>
                <div className="grid grid-cols-2 gap-3">
                  <input required type="text" placeholder="First" aria-label="First name" className={inputCls} />
                  <input required type="text" placeholder="Last" aria-label="Last name" className={inputCls} />
                </div>
              </div>
              <Field label="Email Address">
                <input required type="email" placeholder="you@example.com" className={inputCls} />
              </Field>
              <Field label="Subject">
                <input
                  required
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputCls}
                />
              </Field>

              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: reason === "partnership" ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="space-y-4 pt-1">
                    <Field label="Firm Name">
                      <input type="text" placeholder="Your Prop Firm" className={inputCls} />
                    </Field>
                    <Field label="Website URL">
                      <input type="url" placeholder="https://" className={inputCls} />
                    </Field>
                    <Field label="Monthly Challenge Volume">
                      <select className={inputCls}>
                        <option>Under 100</option>
                        <option>100-500</option>
                        <option>500-1000</option>
                        <option>1000+</option>
                      </select>
                    </Field>
                  </div>
                </div>
              </div>

              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: reason === "report" ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="space-y-4 pt-1">
                    <Field label="Which Firm?">
                      <input type="text" className={inputCls} />
                    </Field>
                    <Field label="What needs updating?">
                      <select className={inputCls}>
                        <option>Pricing</option>
                        <option>Rules</option>
                        <option>Drawdown</option>
                        <option>Payout Info</option>
                        <option>Firm Closed</option>
                        <option>Other</option>
                      </select>
                    </Field>
                  </div>
                </div>
              </div>

              <Field label="Message">
                <textarea required rows={5} placeholder="Tell us what's on your mind…" className={inputCls} />
              </Field>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full py-3.5 font-display font-bold text-white text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] disabled:opacity-80"
                style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}
              >
                {status === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
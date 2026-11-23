import { useEffect, useRef, useState } from "react";
import { Star, Check, Copy, ChevronDown } from "lucide-react";
import { formatTrustpilotDate, type PromoCode } from "@/lib/promo-codes";

export type RatingFirm = {
  name: string;
  trustpilotScore: number | null;
  trustpilotUrl?: string | undefined;
  trustpilotUpdatedAt?: string | null | undefined;
};

export function RatingStars({ firm }: { firm: RatingFirm }) {
  const score = firm.trustpilotScore;
  const date = formatTrustpilotDate(firm.trustpilotUpdatedAt);
  const inner = (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = score == null ? 0 : Math.max(0, Math.min(1, score - i));
          return (
            <span key={i} className="relative inline-block h-3.5 w-3.5">
              <Star size={14} className="absolute inset-0 text-muted-foreground/40" />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star size={14} className="fill-accent text-accent" />
              </span>
            </span>
          );
        })}
      </span>
      <span className="text-sm font-semibold">{score == null ? "N/A" : score.toFixed(1)}</span>
    </span>
  );
  if (score == null) return <span className="text-xs text-muted-foreground">Rating coming soon</span>;
  const title = score == null ? "No Trustpilot rating yet" : `Trustpilot rating${date ? `, updated ${date}` : ""}`;
  if (!firm.trustpilotUrl || score == null) return <span title={title}>{inner}</span>;
  return (
    <a href={firm.trustpilotUrl} target="_blank" rel="noopener noreferrer" title={title} aria-label={`${firm.name}: ${title}`} className="hover:opacity-80">
      {inner}
    </a>
  );
}

export function CopyPill({ code, compact = false }: { code: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-muted px-3 ${compact ? "py-1 text-[11px]" : "py-1.5 text-xs"} font-mono transition hover:border-primary`}
    >
      {copied ? <Check size={12} className="text-primary" /> : <Copy size={12} className="text-muted-foreground" />}
      {copied ? "Copied!" : compact ? code : `Copy code: ${code}`}
    </button>
  );
}

export function CodeCell({ codes }: { codes: PromoCode[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const first = codes[0];
  if (!first) return <span className="text-muted-foreground">—</span>;
  const extra = codes.length - 1;
  return (
    <div ref={ref} className="relative inline-flex flex-col items-start gap-1">
      <CopyPill code={first.code} />
      {extra > 0 && (
        <button type="button" onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground hover:text-foreground">
          +{extra} more <ChevronDown size={11} className={open ? "rotate-180 transition" : "transition"} />
        </button>
      )}
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-64 rounded-xl border border-border bg-card p-2 shadow-xl">
          {codes.map((c) => (
            <div key={c.code} className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 hover:bg-muted/40">
              <div className="min-w-0">
                <div className="font-mono text-xs font-semibold">{c.code}</div>
                <div className="text-[10px] text-muted-foreground">
                  {c.discountLabel}
                  {c.accountType ? ` · ${c.accountType}` : ""}
                </div>
              </div>
              <CopyPill code={c.code} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FirmLogo({ firm, size = 36 }: { firm: { name: string; logo: string }; size?: number }) {
  const style = { width: size, height: size };
  return firm.logo ? (
    <img src={firm.logo} alt={`${firm.name} logo`} style={style} className="shrink-0 rounded-md object-contain" loading="lazy" />
  ) : (
    <span style={style} className="flex shrink-0 items-center justify-center text-xs font-semibold">{firm.name[0]}</span>
  );
}

export function VisitButton({ firm }: { firm: { slug: string; affiliateUrl: string } }) {
  return (
    <a
      href={firm.affiliateUrl || `/reviews/${firm.slug}`}
      target="_blank"
      rel="sponsored noopener"
      className="btn-gradient text-xs py-1.5 px-4"
    >
      Visit
    </a>
  );
}


export const discountOf = (codes: PromoCode[]) => codes[0]?.discountLabel || "—";

import { CopyCodeButton } from "@/components/coupons/CopyCodeButton";
import type { PromoCode } from "@/lib/promo-codes";

export function PromoCodeList({ codes, compact = false }: { codes: PromoCode[]; compact?: boolean }) {
  if (!codes.length) return null;
  return (
    <ul className="space-y-2">
      {codes.map((c) => (
        <li key={c.code} className="flex items-center gap-2 flex-wrap">
          <code className={`border border-dashed border-primary rounded-md px-3 py-1.5 font-mono ${compact ? "text-xs" : "text-sm"} bg-background`}>
            {c.code}
          </code>
          <span className="text-xs text-muted-foreground flex-1 min-w-0">
            {c.discountLabel}
            {c.accountType ? ` · ${c.accountType}` : ""}
          </span>
          <CopyCodeButton code={c.code} />
        </li>
      ))}
    </ul>
  );
}

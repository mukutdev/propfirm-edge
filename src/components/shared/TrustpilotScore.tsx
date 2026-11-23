import { Star } from "lucide-react";
import { formatTrustpilotDate } from "@/lib/promo-codes";

/** Plain-text Trustpilot score with a generic star. Never uses Trustpilot's logo or star art. */
export function TrustpilotScore({
  score,
  url,
  updatedAt,
  showUpdated = true,
  className = "",
}: {
  score: number | null;
  url?: string | undefined;
  updatedAt?: string | null | undefined;
  showUpdated?: boolean;
  className?: string;
}) {
  const label = score == null ? "N/A" : `${score.toFixed(1)} on Trustpilot`;
  const date = formatTrustpilotDate(updatedAt);
  return (
    <span className={`inline-flex flex-col leading-tight ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <Star size={13} className="text-muted-foreground shrink-0" aria-hidden />
        {url && score != null ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">
            {label} ↗
          </a>
        ) : (
          <span className="text-sm font-semibold">{label}</span>
        )}
      </span>
      {showUpdated && score != null && date && (
        <span className="text-[10px] text-muted-foreground mt-0.5">Updated {date}</span>
      )}
    </span>
  );
}

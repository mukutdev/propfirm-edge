export type PromoCode = { code: string; discountLabel: string; accountType?: string };

/** Parses the prop_firms.promo_codes JSON array into typed promo codes. */
export function parsePromoCodes(raw: unknown): PromoCode[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((r) => (r ?? {}) as Record<string, unknown>)
    .filter((r) => typeof r["code"] === "string" && r["code"])
    .map((r) => {
      const p: PromoCode = { code: String(r["code"]), discountLabel: String(r["discount_label"] ?? "") };
      if (r["account_type"]) p.accountType = String(r["account_type"]);
      return p;
    });
}

/** Sorts by Trustpilot score, highest first; firms with no score go last. */
export function compareTrustpilot(a: number | null, b: number | null, dir: "asc" | "desc" = "desc") {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return dir === "desc" ? b - a : a - b;
}

export function formatTrustpilotDate(d: string | null | undefined) {
  if (!d) return "";
  const date = new Date(`${d.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

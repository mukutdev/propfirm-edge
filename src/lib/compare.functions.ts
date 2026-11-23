import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { parsePromoCodes, compareTrustpilot, type PromoCode } from "@/lib/promo-codes";

export type CompareFirmRow = {
  id: string;
  slug: string;
  name: string;
  trustpilotScore: number | null;
  trustpilotUpdatedAt: string | null;
  maxAccount: string;
  profitSplit: string;
  monthlyFee: string;
  drawdownType: string;
  payoutSpeed: string;
  evaluationType: string;
  platforms: string[];
  assets: string[];
  promoCodes: PromoCode[];
  affiliateUrl: string;
  trustpilotUrl?: string;
  logo: string;
};

const COLUMNS =
  "id, slug, name, trustpilot_score, trustpilot_updated_at, max_account, profit_split, challenge_fee, drawdown_type, payout_frequency, evaluation_type, platforms, assets, promo_codes, affiliate_url, trustpilot_url, funding_numeric, fee_numeric";

const SORT_COLUMNS: Record<string, string> = {
  rating: "trustpilot_score",
  maxFunding: "funding_numeric",
  fee: "fee_numeric",
  name: "name",
  drawdownType: "drawdown_type",
  payoutSpeed: "payout_frequency",
  profitSplit: "profit_split",
};

function publicClient() {
  return createClient(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

function mapRow(f: Record<string, unknown>): CompareFirmRow {
  let host = "";
  try {
    host = new URL(String(f["affiliate_url"] || "")).hostname;
  } catch {
    host = "";
  }
  return {
    id: String(f["id"]),
    slug: String(f["slug"]),
    name: String(f["name"]),
    trustpilotScore: f["trustpilot_score"] == null ? null : Number(f["trustpilot_score"]),
    trustpilotUpdatedAt: f["trustpilot_updated_at"] ? String(f["trustpilot_updated_at"]) : null,
    maxAccount: String(f["max_account"] ?? ""),
    profitSplit: String(f["profit_split"] ?? ""),
    monthlyFee: String(f["challenge_fee"] ?? ""),
    drawdownType: String(f["drawdown_type"] ?? ""),
    payoutSpeed: String(f["payout_frequency"] ?? ""),
    evaluationType: String(f["evaluation_type"] ?? ""),
    platforms: (f["platforms"] as string[] | null) ?? [],
    assets: (f["assets"] as string[] | null) ?? [],
    promoCodes: parsePromoCodes(f["promo_codes"]),
    affiliateUrl: String(f["affiliate_url"] ?? ""),
    trustpilotUrl: f["trustpilot_url"] ? String(f["trustpilot_url"]) : undefined,
    logo: host ? `https://www.google.com/s2/favicons?sz=64&domain=${host}` : "",
  };
}

export const listCompareFirms = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z
      .object({
        asset: z.string().optional(),
        sortKey: z.string().optional(),
        dir: z.string().optional(),
      })
      .parse(data ?? {}),
  )
  .handler(async ({ data }): Promise<CompareFirmRow[]> => {
    const supabase = publicClient();
    const column = SORT_COLUMNS[data.sortKey ?? "rating"] ?? "rating";
    const ascending = data.dir === "asc";

    let query = supabase.from("prop_firms").select(COLUMNS).eq("is_active", true).order(column, { ascending });
    if (data.asset && data.asset !== "All") {
      query = query.contains("assets", [data.asset]);
    }

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    const mapped = (rows ?? []).map((r) => mapRow(r as Record<string, unknown>));
    if (column === "trustpilot_score") mapped.sort((a, b) => compareTrustpilot(a.trustpilotScore, b.trustpilotScore, ascending ? "asc" : "desc"));
    return mapped;
  });

export const getFirmsByIds = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ ids: z.array(z.string().uuid()).min(1).max(5) }).parse(data))
  .handler(async ({ data }): Promise<CompareFirmRow[]> => {
    const supabase = publicClient();
    const { data: rows, error } = await supabase
      .from("prop_firms")
      .select(COLUMNS)
      .eq("is_active", true)
      .in("id", data.ids);
    if (error) throw new Error(error.message);
    return (rows ?? [])
      .map((r) => mapRow(r as Record<string, unknown>))
      .sort((a, b) => compareTrustpilot(a.trustpilotScore, b.trustpilotScore));
  });

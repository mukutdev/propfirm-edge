import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { buildFirmDetail, type FirmAlternative, type FirmDetail, type FirmRow } from "@/lib/firm-detail-data";

const FIRM_COLUMNS =
  "id, slug, name, rating, recommended, verdict, max_account, profit_split, challenge_fee, drawdown_type, payout_frequency, evaluation_type, platforms, instrument_list, coupon_code, affiliate_url, trustpilot_url, funding_numeric, fee_numeric, updated_at";

function publicClient() {
  return createClient(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type FirmReviewEntry = {
  id: string;
  traderName: string;
  rating: number;
  reviewText: string;
  isVerified: boolean;
  createdAt: string;
};

export type FirmPageData = {
  firm: FirmDetail;
  reviews: FirmReviewEntry[];
  averageRating: number;
  reviewCount: number;
};

export const getFirmPage = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<FirmPageData | null> => {
    const supabase = publicClient();

    const { data: row, error } = await supabase
      .from("prop_firms")
      .select(FIRM_COLUMNS)
      .eq("slug", data.slug)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!row) return null;

    const firmRow = row as unknown as FirmRow;

    const [{ data: others }, { data: reviewRows }] = await Promise.all([
      supabase
        .from("prop_firms")
        .select("slug, name, rating, max_account, profit_split")
        .neq("slug", data.slug)
        .order("rating", { ascending: false })
        .limit(3),
      supabase
        .from("firm_reviews")
        .select("id, trader_name, rating, review_text, is_verified, created_at")
        .eq("firm_id", firmRow.id)
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    const alternatives: FirmAlternative[] = (others ?? []).map((o: Record<string, unknown>) => ({
      slug: String(o["slug"]),
      name: String(o["name"]),
      rating: Number(o["rating"]),
      maxFunding: String(o["max_account"]),
      split: String(o["profit_split"]),
    }));

    const reviews: FirmReviewEntry[] = (reviewRows ?? []).map((r: Record<string, unknown>) => ({
      id: String(r["id"]),
      traderName: String(r["trader_name"]),
      rating: Number(r["rating"]),
      reviewText: String(r["review_text"]),
      isVerified: Boolean(r["is_verified"]),
      createdAt: String(r["created_at"]),
    }));

    const averageRating = reviews.length
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
      : 0;

    return {
      firm: buildFirmDetail(firmRow, alternatives),
      reviews,
      averageRating,
      reviewCount: reviews.length,
    };
  });

export const submitFirmReview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        firmId: z.string().uuid(),
        traderName: z.string().trim().min(2).max(60),
        rating: z.number().int().min(1).max(5),
        reviewText: z.string().trim().min(20).max(4000),
        claimedPayout: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { error } = await supabase.from("firm_reviews").insert({
      firm_id: data.firmId,
      trader_name: data.traderName,
      rating: data.rating,
      review_text: data.reviewText,
      status: "pending",
      is_verified: false,
      claimed_payout: data.claimedPayout ?? false,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export type FirmOption = {
  id: string;
  slug: string;
  name: string;
  logo: string;
};

export const listFirmOptions = createServerFn({ method: "GET" }).handler(
  async (): Promise<FirmOption[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("prop_firms")
      .select("id, slug, name, affiliate_url")
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map((f: Record<string, unknown>) => {
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
        logo: host ? `https://www.google.com/s2/favicons?sz=64&domain=${host}` : "",
      };
    });
  },
);

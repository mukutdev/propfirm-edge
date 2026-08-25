import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export type CouponRow = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  code: string;
  discount: number;
  dealType: "percentage" | "free_trial" | "special";
  expiry: string | null;
  challengeFee: string;
  assets: string[];
  affiliateUrl: string;
  logo: string;
};

function publicClient() {
  return createClient(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const listCoupons = createServerFn({ method: "GET" }).handler(async (): Promise<CouponRow[]> => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("prop_firms")
    .select(
      "id, slug, name, rating, coupon_code, promo_discount, deal_type, promo_expiry, challenge_fee, assets, affiliate_url",
    )
    .not("coupon_code", "is", null)
    .neq("coupon_code", "")
    .order("promo_discount", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((f) => {
    const row = f as Record<string, unknown>;
    let host = "";
    try {
      host = new URL(String(row["affiliate_url"] || "")).hostname;
    } catch {
      host = "";
    }
    const dealType = String(row["deal_type"] ?? "percentage");
    return {
      id: String(row["id"]),
      slug: String(row["slug"]),
      name: String(row["name"]),
      rating: Number(row["rating"] ?? 0),
      code: String(row["coupon_code"] ?? ""),
      discount: Number(row["promo_discount"] ?? 0),
      dealType: (dealType === "free_trial" || dealType === "special" ? dealType : "percentage") as CouponRow["dealType"],
      expiry: row["promo_expiry"] ? String(row["promo_expiry"]) : null,
      challengeFee: String(row["challenge_fee"] ?? ""),
      assets: (row["assets"] as string[] | null) ?? [],
      affiliateUrl: String(row["affiliate_url"] ?? ""),
      logo: host ? `https://www.google.com/s2/favicons?sz=64&domain=${host}` : "",
    };
  });
});

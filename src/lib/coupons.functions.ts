import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { parsePromoCodes, type PromoCode } from "@/lib/promo-codes";

export type CouponRow = {
  id: string;
  slug: string;
  name: string;
  code: string;
  codes: PromoCode[];
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
      "id, slug, name, promo_codes, promo_discount, deal_type, promo_expiry, challenge_fee, assets, affiliate_url",
    )
    .eq("is_active", true)
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
      codes: parsePromoCodes(row["promo_codes"]),
      code: parsePromoCodes(row["promo_codes"])[0]?.code ?? "",
      discount: Number(row["promo_discount"] ?? 0),
      dealType: (dealType === "free_trial" || dealType === "special" ? dealType : "percentage") as CouponRow["dealType"],
      expiry: row["promo_expiry"] ? String(row["promo_expiry"]) : null,
      challengeFee: String(row["challenge_fee"] ?? ""),
      assets: (row["assets"] as string[] | null) ?? [],
      affiliateUrl: String(row["affiliate_url"] ?? ""),
      logo: host ? `https://www.google.com/s2/favicons?sz=128&domain=${host}` : "",
    };
  });
});

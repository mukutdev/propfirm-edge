import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listCompareFirms, type CompareFirmRow } from "@/lib/compare.functions";

export const firmSlugFromName = (name: string) =>
  name.toLowerCase().replace(/\.com/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Live, active firms keyed by slug — source of Trustpilot scores and promo codes for static lists. */
export function useLiveFirms() {
  const fetchFirms = useServerFn(listCompareFirms);
  const { data, isSuccess } = useQuery({
    queryKey: ["live-firms"],
    queryFn: () => fetchFirms({ data: { sortKey: "name", dir: "asc" } }),
    staleTime: 5 * 60 * 1000,
  });
  const bySlug = useMemo(() => new Map<string, CompareFirmRow>((data ?? []).map((f) => [f.slug, f])), [data]);
  return { bySlug, loaded: isSuccess, get: (name: string) => bySlug.get(firmSlugFromName(name)) };
}

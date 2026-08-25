export type BlogCategorySlug =
  | "prop-firm-guides"
  | "futures-trading"
  | "risk-management"
  | "trading-psychology";

export const blogCategoryMeta: { slug: BlogCategorySlug; label: string; icon: string }[] = [
  { slug: "prop-firm-guides", label: "Prop Firm Guides", icon: "🏛️" },
  { slug: "futures-trading", label: "Futures Trading", icon: "📈" },
  { slug: "risk-management", label: "Risk Management", icon: "🛡️" },
  { slug: "trading-psychology", label: "Trading Psychology", icon: "🧠" },
];

export function categoryLabel(slug: string): string {
  return (
    blogCategoryMeta.find((c) => c.slug === slug)?.label ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
  );
}

export function categoryIcon(slug: string): string {
  return blogCategoryMeta.find((c) => c.slug === slug)?.icon ?? "📄";
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

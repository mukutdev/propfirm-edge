export type RssArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  link: string;
  source: string;
  category: string;
  pubDate: string;
  timeAgo: string;
};

const FEEDS: { url: string; source: string; category: string }[] = [
  {
    url: "https://www.cnbc.com/id/20910258/device/rss/rss.html",
    source: "CNBC",
    category: "Markets",
  },
];

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function timeAgo(iso: string) {
  const then = new Date(iso.replace(" ", "T")).getTime();
  if (Number.isNaN(then)) return "";
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

export function formatPublished(iso: string) {
  const d = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type Rss2JsonItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  description?: string;
  content?: string;
  categories?: string[];
};

async function fetchFeed(feed: (typeof FEEDS)[number]): Promise<RssArticle[]> {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`,
  );
  if (!res.ok) throw new Error(`Feed ${feed.source} failed (${res.status})`);
  const json = (await res.json()) as { status?: string; items?: Rss2JsonItem[] };
  const items = json.items ?? [];
  return items
    .filter((i) => i.title && i.link)
    .map((i) => {
      const title = stripHtml(i.title!);
      const pubDate = i.pubDate ?? "";
      const summary = stripHtml(i.description || i.content || "").slice(0, 400);
      return {
        id: i.guid || i.link!,
        slug: slugify(title) || slugify(i.guid || i.link!),
        title,
        excerpt: summary,
        link: i.link!,
        source: feed.source,
        category: i.categories?.[0] ? stripHtml(i.categories[0]).slice(0, 24) : feed.category,
        pubDate,
        timeAgo: timeAgo(pubDate),
      };
    });
}

/** Fetch + merge all feeds, newest first. Never rejects unless every feed fails. */
export async function fetchLiveNews(): Promise<RssArticle[]> {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const merged = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  if (merged.length === 0) throw new Error("No news feeds available");

  const seen = new Set<string>();
  return merged
    .filter((a) => {
      if (seen.has(a.slug)) return false;
      seen.add(a.slug);
      return true;
    })
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

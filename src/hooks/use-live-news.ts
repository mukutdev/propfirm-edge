import { useEffect, useState } from "react";
import { fetchLiveNews, type RssArticle } from "@/lib/rss-news";

let cache: RssArticle[] | null = null;

/** Fetches merged RSS headlines on mount and re-fetches every 5 minutes. */
export function useLiveNews() {
  const [articles, setArticles] = useState<RssArticle[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const next = await fetchLiveNews();
        if (!alive) return;
        cache = next;
        setArticles(next);
        setError(null);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "Unable to load news");
      } finally {
        if (alive) setLoading(false);
      }
    };

    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return { articles, loading, error };
}

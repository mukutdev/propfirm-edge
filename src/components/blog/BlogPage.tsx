import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BlogHero } from "./BlogHero";
import { FeaturedPost } from "./FeaturedPost";
import { CategorySection } from "./CategorySection";
import { FeaturedGuideBanner } from "./FeaturedGuideBanner";
import { PopularArticles } from "./PopularArticles";
import { LatestPosts } from "./LatestPosts";
import { BlogSidebar } from "./BlogSidebar";
import { blogCategoryMeta, categoryLabel } from "@/lib/blog-data";
import { listBlogPosts } from "@/lib/blog.functions";

export function BlogPage() {
  const [active, setActive] = useState<string>("All");
  const [search, setSearch] = useState("");

  const fetchPosts = useServerFn(listBlogPosts);
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => fetchPosts(),
  });

  const matchesSearch = (title: string) =>
    !search.trim() || title.toLowerCase().includes(search.trim().toLowerCase());

  const featured = useMemo(() => posts.find((p) => p.isFeatured) ?? posts[0], [posts]);

  const sections = useMemo(() => {
    return blogCategoryMeta
      .filter((meta) => active === "All" || active === meta.slug)
      .map((meta) => ({
        ...meta,
        posts: posts
          .filter((p) => p.category === meta.slug && matchesSearch(p.title))
          .slice(0, 3),
      }))
      .filter((s) => s.posts.length > 0);
  }, [posts, active, search]);

  const latest = useMemo(
    () =>
      posts.filter(
        (p) => matchesSearch(p.title) && (active === "All" || p.category === active),
      ),
    [posts, active, search],
  );

  const popular = useMemo(() => posts.slice(0, 5), [posts]);

  const categoryCounts = useMemo(
    () =>
      blogCategoryMeta.map((meta) => ({
        name: categoryLabel(meta.slug),
        count: posts.filter((p) => p.category === meta.slug).length,
      })),
    [posts],
  );

  return (
    <>
      <BlogHero active={active} onChange={setActive} />
      {featured && <FeaturedPost post={featured} />}
      <div className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-10">
            {isLoading && <p className="text-sm text-muted-foreground">Loading articles…</p>}
            {sections.map((s, i) => (
              <CategorySection
                key={s.slug}
                icon={s.icon}
                category={s.label}
                posts={s.posts}
                seedOffset={i * 10}
              />
            ))}
            {featured && <FeaturedGuideBanner slug={featured.slug} />}
            <PopularArticles posts={popular} />
            <LatestPosts posts={latest} />
          </div>
          <BlogSidebar search={search} onSearch={setSearch} categoryCounts={categoryCounts} />
        </div>
      </div>
    </>
  );
}

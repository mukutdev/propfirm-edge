import { useMemo, useState } from "react";
import { BlogHero } from "./BlogHero";
import { FeaturedPost } from "./FeaturedPost";
import { CategorySection } from "./CategorySection";
import { FeaturedGuideBanner } from "./FeaturedGuideBanner";
import { PopularArticles } from "./PopularArticles";
import { LatestPosts } from "./LatestPosts";
import { BlogSidebar } from "./BlogSidebar";
import { categorySections } from "@/lib/blog-data";

export function BlogPage() {
  const [active, setActive] = useState<string>("All");
  const [search, setSearch] = useState("");

  const sections = useMemo(() => {
    const matchesSearch = (title: string) =>
      !search.trim() || title.toLowerCase().includes(search.toLowerCase());
    return categorySections
      .filter((s) => active === "All" || active === s.category)
      .map((s) => ({ ...s, posts: s.posts.filter((p) => matchesSearch(p.title)) }))
      .filter((s) => s.posts.length > 0);
  }, [active, search]);

  return (
    <>
      <BlogHero active={active} onChange={setActive} />
      <FeaturedPost />
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-14">
            {sections.map((s, i) => (
              <CategorySection
                key={s.category}
                icon={s.icon}
                category={s.category}
                posts={s.posts}
                seedOffset={i * 10}
              />
            ))}
            <FeaturedGuideBanner />
            <PopularArticles />
            <LatestPosts />
          </div>
          <BlogSidebar search={search} onSearch={setSearch} />
        </div>
      </div>
    </>
  );
}
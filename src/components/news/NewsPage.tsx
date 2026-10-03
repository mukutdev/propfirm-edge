import { useMemo, useState } from "react";
import { BreakingTicker } from "./BreakingTicker";
import { CategoryFilter } from "./CategoryFilter";
import { FeaturedNews } from "./FeaturedNews";
import { TopStories } from "./TopStories";
import { LatestUpdates } from "./LatestUpdates";
import { PropFirmIndustry } from "./PropFirmIndustry";
import { EconCalendar } from "./EconCalendar";
import { NewsSidebar } from "./NewsSidebar";
import { LiveNewsFeed } from "./LiveNewsFeed";
import { topStories, latestUpdates } from "@/lib/news-data";

export function NewsPage() {
  const [active, setActive] = useState<string>("All");

  const filteredTop = useMemo(
    () => (active === "All" ? topStories : topStories.filter((a) => a.category === active)),
    [active]
  );
  const filteredLatest = useMemo(
    () => (active === "All" ? latestUpdates : latestUpdates.filter((a) => a.category === active)),
    [active]
  );

  return (
    <>
      <EconCalendar />
      <BreakingTicker />
      <CategoryFilter active={active} onChange={setActive} />
      <FeaturedNews />
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-12">
            <LiveNewsFeed />
            {filteredTop.length > 0 && <TopStories articles={filteredTop} />}
            {filteredLatest.length > 0 && <LatestUpdates items={filteredLatest} />}
            <PropFirmIndustry />
          </div>
          <NewsSidebar />
        </div>
      </div>
    </>
  );
}
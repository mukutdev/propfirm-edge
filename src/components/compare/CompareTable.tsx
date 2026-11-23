import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { CodeCell, FirmLogo, RatingStars, VisitButton, discountOf } from "@/components/shared/FirmBits";
import { listCompareFirms } from "@/lib/compare.functions";

type SortKey = "name" | "rating" | "maxAccounts";


export function CompareTable({ embedded = false }: { embedded?: boolean } = {}) {
  const fetchFirms = useServerFn(listCompareFirms);
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const { data, isPending, isError } = useQuery({
    queryKey: ["compare-firms", "All", sortKey, dir],
    queryFn: () => fetchFirms({ data: { sortKey, dir } }),
  });
  const rows = data ?? [];

  function toggleSort(key: SortKey) {
    if (sortKey === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setDir(key === "name" ? "asc" : "desc");
    }
  }

  const SortHead = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 uppercase hover:text-foreground">
      {label}
      <ArrowUpDown size={10} className={sortKey === k ? "opacity-100" : "opacity-40"} />
    </button>
  );

  const status = isPending ? (
    <p className="py-16 text-center text-sm text-muted-foreground">
      <Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Loading firms…
    </p>
  ) : isError ? (
    <p className="py-16 text-center text-sm text-muted-foreground">We couldn't load the firms. Please refresh and try again.</p>
  ) : null;

  return (
    <section id={embedded ? "firms-table" : "compare-table"} className={embedded ? "mt-14" : "mx-auto max-w-7xl scroll-mt-24 px-6 py-14"}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-bold md:text-3xl">The Best Prop Firms In The Industry</h2>
        <Link to="/reviews" className="btn-gradient text-sm py-2 px-5">View All Firms</Link>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-foreground/[0.08] text-left whitespace-nowrap text-[11px] font-semibold tracking-wider text-foreground/55 [&>th]:px-3 [&>th:first-child]:pl-0 [&>th:not(:last-child)]:border-r [&>th:not(:last-child)]:border-foreground/10">
              <th className="w-[22%] pb-3 pr-3"><SortHead k="name" label="Firm Name" /></th>
              <th className="w-[15%] pb-3 pr-3"><SortHead k="rating" label="Rating" /></th>
              <th className="w-[10%] pb-3 pr-3 text-center"><SortHead k="maxAccounts" label="Max Accounts" /></th>
              <th className="w-[17%] pb-3 pr-3 text-center uppercase">Trading Platforms</th>
              <th className="w-[9%] pb-3 pr-3 uppercase">Discount</th>
              <th className="w-[19%] pb-3 pr-3 uppercase">Discount Code</th>
              <th className="w-[8%] pb-3 text-right uppercase">Website</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((firm) => (
              <tr key={firm.id} className="h-20 border-b border-foreground/[0.08] align-middle [&>td]:px-3 [&>td:first-child]:pl-0">
                <td className="py-5 pr-3">
                  <div className="flex items-center gap-3">
                    <FirmLogo firm={firm} />
                    <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="whitespace-nowrap font-display font-semibold hover:text-primary">
                      {firm.name}
                    </Link>
                  </div>
                </td>
                <td className="py-5 pr-3"><RatingStars firm={firm} /></td>
                <td className="py-5 pr-3 text-center font-semibold">{firm.maxAccounts ?? "-"}</td>
                <td className="py-5 pr-3 text-center text-muted-foreground"><span className="line-clamp-2">{firm.platforms.join(", ") || "—"}</span></td>
                <td className="py-5 pr-3 font-semibold">{discountOf(firm.promoCodes)}</td>
                <td className="py-5 pr-3"><CodeCell codes={firm.promoCodes} /></td>
                <td className="py-5 text-right"><VisitButton firm={firm} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {status}
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((firm) => (
          <article key={firm.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <FirmLogo firm={firm} />
              <div className="min-w-0 flex-1">
                <Link to="/reviews/$slug" params={{ slug: firm.slug }} className="block truncate font-display font-semibold">
                  {firm.name}
                </Link>
                <RatingStars firm={firm} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold">{discountOf(firm.promoCodes)}</span>
              <CodeCell codes={firm.promoCodes} />
              <span className="ml-auto"><VisitButton firm={firm} /></span>
            </div>
          </article>
        ))}
        {status}
      </div>
    </section>
  );
}

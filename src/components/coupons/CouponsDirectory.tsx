import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Search, Clipboard, MousePointerClick, Tag, LayoutGrid, List, ChevronDown, ExternalLink } from "lucide-react";
import { listCoupons, type CouponRow } from "@/lib/coupons.functions";
import { CopyCodeButton } from "./CopyCodeButton";

type Filter = "All Deals" | "Percentage Off" | "Free Trial" | "Special Offer" | "Futures Only";
const filters: Filter[] = ["All Deals", "Percentage Off", "Free Trial", "Special Offer", "Futures Only"];

const filterToDealType: Record<string, CouponRow["dealType"] | undefined> = {
  "Percentage Off": "percentage",
  "Free Trial": "free_trial",
  "Special Offer": "special",
};

function isExpired(row: CouponRow) {
  if (!row.expiry) return false;
  const end = new Date(`${row.expiry}T23:59:59`).getTime();
  return end < Date.now();
}

function isExpiringSoon(row: CouponRow) {
  if (!row.expiry) return false;
  const end = new Date(`${row.expiry}T23:59:59`).getTime();
  const diff = end - Date.now();
  return diff > 0 && diff < 14 * 24 * 60 * 60 * 1000;
}

function expiryLabel(row: CouponRow) {
  if (!row.expiry) return "No set expiry";
  return new Date(`${row.expiry}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function discountLabel(row: CouponRow) {
  if (row.dealType === "free_trial") return "FREE TRIAL";
  if (row.dealType === "special") return row.discount > 0 ? `${row.discount}% + PERKS` : "SPECIAL OFFER";
  return `${row.discount}% OFF`;
}

function headlineFor(row: CouponRow) {
  if (row.dealType === "free_trial") return `Test ${row.name}'s evaluation free before you fund`;
  if (row.dealType === "special") return `Bundled perks on every ${row.name} account tier`;
  return `${row.discount}% off every ${row.name} evaluation`;
}

function descriptionFor(row: CouponRow) {
  if (row.dealType === "free_trial") return `Run the ${row.name} eval on live data with no upfront fee — same drawdown rules, same payout path.`;
  if (row.dealType === "special") return `Reset credits and scaling perks stacked on top of the standard ${row.name} evaluation terms.`;
  return `Applies to all account sizes at checkout — cuts your monthly eval fee from ${row.challengeFee || "list price"} down before your first trade.`;
}

function dealStripStyle(type: CouponRow["dealType"]) {
  if (type === "percentage") return { bg: "bg-gradient-brand", text: "text-white" };
  if (type === "free_trial") return { bg: "bg-[#F59E0B]", text: "text-black" };
  return { bg: "bg-[#14B8A6]", text: "text-black" };
}

function FirmLogo({ row }: { row: CouponRow }) {
  return (
    <div className="h-12 w-full rounded-md bg-[#1C1C1C] border border-[#222] flex items-center justify-center gap-2 px-2">
      {row.logo && <img src={row.logo} alt="" className="h-5 w-5 rounded" loading="lazy" />}
      <span className="text-xs font-semibold text-white/80 text-center">{row.name}</span>
    </div>
  );
}

function CouponCard({ row }: { row: CouponRow }) {
  const expired = isExpired(row);
  const { bg, text } = dealStripStyle(row.dealType);

  return (
    <article className={`card-surface flex flex-col overflow-hidden ${expired ? "opacity-60 saturate-50" : ""} relative`}>
      <div className={`${bg} px-5 py-3 flex items-center justify-between`}>
        <span className={`font-display font-bold text-lg tracking-wide ${text}`}>{discountLabel(row)}</span>
        {isExpiringSoon(row) && !expired && (
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/30 text-white font-semibold">Ending Soon</span>
        )}
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <FirmLogo row={row} />
        <div>
          <div className="font-display font-bold text-base">{row.name}</div>
          <div className="font-display font-semibold text-base mt-1">{headlineFor(row)}</div>
          <p className="text-sm text-[#888] mt-2 leading-relaxed line-clamp-2">{descriptionFor(row)}</p>
        </div>

        <div className="flex items-center gap-2 border border-dashed border-[#7c3aed] rounded-lg px-3 py-2 bg-[#0a0a0a]">
          <code className="flex-1 font-mono font-bold text-sm text-gradient tracking-wider truncate">{row.code}</code>
          <CopyCodeButton code={row.code} />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className={isExpiringSoon(row) ? "text-[#F59E0B] animate-pulse" : "text-[#888]"}>
            ⏳ {row.expiry ? `Expires ${expiryLabel(row)}` : "No set expiry"}
          </span>
          <a href={`/reviews/${row.slug}`} className="text-[#c4a8ff] hover:text-white font-semibold">Read review →</a>
        </div>

        <a
          href={row.affiliateUrl || "#"}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="btn-gradient w-full text-sm py-2.5 mt-auto"
        >
          Get This Deal
        </a>
      </div>

      {expired && (
        <div className="absolute inset-0 bg-[#080808]/80 flex flex-col items-center justify-center gap-2 text-center px-6">
          <div className="font-display font-bold text-lg">This code has expired</div>
          <a href={`/reviews/${row.slug}`} className="text-sm text-[#c4a8ff] hover:text-white">See current {row.name} terms →</a>
        </div>
      )}
    </article>
  );
}

function FeaturedDeal({ row }: { row: CouponRow }) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">
      <article
        className="relative rounded-2xl overflow-hidden p-8 md:p-12 animate-fade-in"
        style={{
          background: "linear-gradient(135deg, #1C1A2E 0%, #141414 70%)",
          boxShadow: "0 0 0 1px rgba(124,58,237,0.5), 0 20px 60px -20px rgba(124,58,237,0.6)",
        }}
      >
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-gradient-brand text-white font-semibold">
          🌟 Biggest Live Discount
        </span>

        <div className="mt-6 grid md:grid-cols-[180px_1fr] gap-8 items-center">
          <div className="h-24 w-full rounded-xl bg-[#1C1C1C] border border-[#222] flex flex-col items-center justify-center gap-2 font-display font-bold text-white/85 text-lg">
            {row.logo && <img src={row.logo} alt="" className="h-7 w-7 rounded" />}
            <span className="text-sm text-center px-2">{row.name}</span>
          </div>

          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight">{headlineFor(row)}</h2>
            <p className="text-[#bbb] mt-3 max-w-xl">{descriptionFor(row)}</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex-1 flex items-center gap-3 border-2 border-dashed border-[#7c3aed] rounded-xl px-4 py-3 bg-[#0a0a0a]">
                <code className="flex-1 font-mono font-bold text-xl text-gradient tracking-widest text-center">{row.code}</code>
              </div>
              <CopyCodeButton code={row.code} variant="gradient" size="lg" />
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-[#F59E0B]">
              <span>⏳</span> {row.expiry ? `Expires ${expiryLabel(row)}` : "No set expiry — pulled when the firm changes terms"}
            </div>

            <div className="mt-6">
              <a
                href={row.affiliateUrl || "#"}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="btn-gradient inline-flex"
              >
                Visit {row.name} & Use Code <ExternalLink size={14} />
              </a>
              <p className="text-xs text-[#666] mt-3 max-w-md">
                Affiliate link — we may earn a commission at no cost to you.
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

function HowToUse() {
  const steps = [
    { n: 1, icon: Clipboard, title: "Copy the code", desc: "Tap copy on any card — the code is pulled live from our deal database." },
    { n: 2, icon: MousePointerClick, title: "Open the firm", desc: "Click through on our link so the discount is tracked to your checkout." },
    { n: 3, icon: Tag, title: "Paste before payment", desc: "Apply it on the evaluation checkout page — the eval fee drops instantly." },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 mt-14">
      <div className="card-surface p-8 border-l-2 border-l-[#7c3aed]">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-center">How To Use A Code</h2>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-gradient-brand flex items-center justify-center font-display font-bold text-white">
                {s.n}
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <s.icon size={16} className="text-[#c4a8ff]" />
                <span className="font-display font-semibold text-base">{s.title}</span>
              </div>
              <p className="text-sm text-[#888] mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AllDealsTable({ list }: { list: CouponRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#222]">
      <table className="w-full text-sm" style={{ minWidth: 720 }}>
        <thead>
          <tr className="bg-gradient-brand text-white">
            {["Firm", "Discount", "Code", "Valid Until", "Action"].map((h) => (
              <th key={h} className="text-left font-display font-semibold px-5 py-4 text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((c, i) => (
            <tr key={c.id} className={i % 2 === 0 ? "bg-[#141414]" : "bg-[#1a1a1a]"}>
              <td className="px-5 py-4 font-semibold">{c.name}</td>
              <td className="px-5 py-4 text-gradient font-semibold">{discountLabel(c)}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-xs px-2 py-1 rounded bg-[#0a0a0a] border border-dashed border-[#7c3aed] text-white">{c.code}</code>
                  <CopyCodeButton code={c.code} />
                </div>
              </td>
              <td className="px-5 py-4 text-[#888]">{expiryLabel(c)}</td>
              <td className="px-5 py-4">
                <a href={c.affiliateUrl || "#"} target="_blank" rel="nofollow sponsored noopener" className="btn-gradient text-xs py-2 px-3.5">Get Deal</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CouponsDirectory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All Deals");
  const [view, setView] = useState<"card" | "table">("card");
  const [showExpired, setShowExpired] = useState(false);

  const fetchCoupons = useServerFn(listCoupons);
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => fetchCoupons(),
  });

  const live = useMemo(() => rows.filter((r) => !isExpired(r)), [rows]);
  const expiredDeals = useMemo(() => rows.filter((r) => isExpired(r)), [rows]);
  const featured = live[0];

  const active = useMemo(() => {
    return live
      .filter((r) => r.id !== featured?.id)
      .filter((r) => r.name.toLowerCase().includes(search.trim().toLowerCase()))
      .filter((r) => {
        if (filter === "All Deals") return true;
        if (filter === "Futures Only") return r.assets.length === 1 && r.assets[0] === "Futures";
        return r.dealType === filterToDealType[filter];
      });
  }, [live, featured, search, filter]);

  return (
    <>
      {/* Live counter strip */}
      <div className="bg-[#141414] border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-[#888]">
          <span className="flex items-center gap-2">
            🔥 <span className="text-white font-semibold">{live.length} live codes</span> verified right now
          </span>
          <span>
            {live.filter((r) => isExpiringSoon(r)).length} ending within 14 days
          </span>
          <span>Dead codes auto-move to the expired list</span>
        </div>
      </div>

      {isLoading && (
        <div className="max-w-7xl mx-auto px-6 mt-10 text-sm text-[#888]">Loading live codes…</div>
      )}

      {featured && <FeaturedDeal row={featured} />}

      {/* Search & filter */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prop firms..."
              className="w-full bg-[#141414] border border-[#2a2a2a] rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#666] focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)] transition"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 snap-x flex-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 snap-start px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  filter === f
                    ? "bg-gradient-brand text-white border border-transparent"
                    : "border border-[#2a2a2a] text-[#aaa] hover:text-white hover:border-[#7c3aed]"
                }`}
              >{f}</button>
            ))}
          </div>

          <div className="flex border border-[#2a2a2a] rounded-full overflow-hidden shrink-0">
            <button onClick={() => setView("card")} aria-label="Card view" className={`p-2.5 transition ${view === "card" ? "bg-[#7c3aed]/20 text-white" : "text-[#888] hover:text-white"}`}><LayoutGrid size={14} /></button>
            <button onClick={() => setView("table")} aria-label="Table view" className={`p-2.5 transition ${view === "table" ? "bg-[#7c3aed]/20 text-white" : "text-[#888] hover:text-white"}`}><List size={14} /></button>
          </div>
        </div>

        <div className="mt-6">
          {active.length === 0 && !isLoading ? (
            <p className="text-sm text-[#888]">No live codes match that search or filter.</p>
          ) : view === "card" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((c) => (
                <CouponCard key={c.id} row={c} />
              ))}
            </div>
          ) : (
            <AllDealsTable list={active} />
          )}
        </div>
      </section>

      <HowToUse />

      {/* Expired */}
      <section className="max-w-7xl mx-auto px-6 mt-14">
        <button
          onClick={() => setShowExpired((v) => !v)}
          className="flex items-center gap-2 text-sm text-[#888] hover:text-white"
        >
          <ChevronDown size={16} className={`transition-transform ${showExpired ? "rotate-180" : ""}`} />
          {showExpired ? "Hide" : "Show"} Expired Deals ({expiredDeals.length})
        </button>

        {showExpired && (
          <>
            <p className="text-xs text-[#666] mt-3">Past their end date — some firms still honour them at checkout, so it costs nothing to try.</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5">
              {expiredDeals.map((c) => (
                <CouponCard key={c.id} row={c} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

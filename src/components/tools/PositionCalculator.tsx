import { useState } from "react";
import { Copy, Check, RotateCcw, Calculator, Zap } from "lucide-react";
import { FUTURES_CONTRACTS, TOTAL_CONTRACTS, type FuturesContract } from "@/lib/futures-contracts";

const flatContracts: Array<FuturesContract> = Object.values(FUTURES_CONTRACTS).flat();

type Tab = "sizer" | "pnl";

const fmt$ = (n: number, sign = false) =>
  `${sign && n >= 0 ? "+" : n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const inputCls =
  "w-full bg-[#0f0f0f] border border-[#222] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#7C3AED] transition-colors";

function ContractPicker({
  contract,
  onChange,
}: {
  contract: FuturesContract;
  onChange: (c: FuturesContract) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#888] mb-2">
        Contract
      </label>
      <select
        value={contract.symbol}
        onChange={(e) => onChange(flatContracts.find((c) => c.symbol === e.target.value)!)}
        className={`${inputCls} appearance-none cursor-pointer`}
      >
        {(Object.entries(FUTURES_CONTRACTS) as Array<[string, FuturesContract[]]>).map(
          ([sector, list]) => (
            <optgroup key={sector} label={sector} className="bg-[#141414]">
              {list.map((c) => (
                <option key={c.symbol} value={c.symbol} className="bg-[#141414]">
                  {c.symbol} — {c.name}
                </option>
              ))}
            </optgroup>
          )
        )}
      </select>
      <div className="mt-3 flex flex-wrap gap-2">
        <SpecPill label="Tick" value={String(contract.tick)} />
        <SpecPill label="Tick Value" value={`$${contract.tickValue}`} />
        <SpecPill label="Point Value" value={`$${contract.pointValue.toLocaleString()}`} />
      </div>
    </div>
  );
}

function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-[#2a2a2a] bg-[#0f0f0f] text-[#bbb]">
      <span className="text-[#888]">{label}:</span> <span className="text-white">{value}</span>
    </span>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#888] mb-2">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-[#666]">{hint}</p>}
    </div>
  );
}

function Toggle({
  options,
  value,
  onChange,
}: {
  options: Array<{ id: string; label: string; tone?: "green" | "red" }>;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex rounded-lg border border-[#222] bg-[#0f0f0f] p-1 gap-1">
      {options.map((o) => {
        const active = value === o.id;
        const activeCls =
          o.tone === "green"
            ? "bg-[#00d97e]/15 text-[#00d97e] border-[#00d97e]/40"
            : o.tone === "red"
              ? "bg-[#ff3b5c]/15 text-[#ff3b5c] border-[#ff3b5c]/40"
              : "bg-gradient-brand text-white border-transparent";
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`flex-1 text-xs font-semibold py-2 rounded-md border transition-all duration-200 ${
              active ? activeCls : "border-transparent text-[#888] hover:text-white"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="min-w-0 bg-[#0f0f0f] border border-[#222] rounded-xl p-5 overflow-hidden">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#888]">{label}</p>
      <p
        className="mt-2 font-display font-bold text-xl sm:text-2xl break-all leading-tight"
        style={{ color: color ?? "#fff" }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-[#888] break-words">{sub}</p>}
    </div>
  );
}

function ActionButtons({
  onCopy,
  onReset,
  copied,
}: {
  onCopy: () => void;
  onReset: () => void;
  copied: boolean;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" onClick={onCopy} className="btn-ghost text-xs py-2.5 px-5">
        {copied ? <Check size={14} className="text-[#00d97e]" /> : <Copy size={14} />}
        {copied ? "Copied!" : "Copy Results"}
      </button>
      <button type="button" onClick={onReset} className="btn-ghost text-xs py-2.5 px-5">
        <RotateCcw size={14} />
        Reset
      </button>
    </div>
  );
}

/* ---------- Tab 1: Position Sizer ---------- */

function PositionSizer({ contract }: { contract: FuturesContract }) {
  const [account, setAccount] = useState("50000");
  const [riskType, setRiskType] = useState<"dollar" | "percent">("dollar");
  const [riskValue, setRiskValue] = useState("3");
  const [stopType, setStopType] = useState<"points" | "ticks">("points");
  const [stopValue, setStopValue] = useState("10");
  const [rr, setRr] = useState("2");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<null | {
    contracts: number;
    exact: number;
    dollarRisk: number;
    riskPerContract: number;
    riskPct: number;
    ticks: number;
    points: number;
    profitTarget: number | null;
    rrRatio: number | null;
  }>(null);

  const calculate = () => {
    const bal = parseFloat(account) || 0;
    const rv = parseFloat(riskValue) || 0;
    const sv = parseFloat(stopValue) || 0;
    if (bal <= 0 || rv <= 0 || sv <= 0) return;

    const points = stopType === "ticks" ? sv * contract.tick : sv;
    const ticks = points / contract.tick;
    const dollarRisk = riskType === "percent" ? bal * (rv / 100) : rv;
    const riskPerContract = points * contract.pointValue;
    if (riskPerContract <= 0) return;
    const exact = dollarRisk / riskPerContract;
    const contracts = Math.floor(exact);
    const rrRatio = parseFloat(rr) || null;
    const profitTarget = rrRatio ? riskPerContract * contracts * rrRatio : null;
    const riskPct = (riskPerContract * contracts / bal) * 100;

    setResult({ contracts, exact, dollarRisk: riskPerContract * contracts, riskPerContract, riskPct, ticks, points, profitTarget, rrRatio });
    setCopied(false);
  };

  const reset = () => {
    setAccount("50000"); setRiskType("dollar"); setRiskValue("3");
    setStopType("points"); setStopValue("10"); setRr("2");
    setResult(null); setCopied(false);
  };

  const copy = () => {
    if (!result) return;
    const lines = [
      `${contract.symbol} — ${contract.name} Position Size`,
      `Contracts: ${result.contracts} (exact ${result.exact.toFixed(2)})`,
      `Dollar Risk: ${fmt$(result.dollarRisk)} (${result.riskPct.toFixed(2)}% of account)`,
      `Risk Per Contract: ${fmt$(result.riskPerContract)} (${result.ticks.toFixed(1)} ticks · ${result.points.toFixed(2)} pts)`,
    ];
    if (result.profitTarget != null && result.rrRatio)
      lines.push(`Profit Target: ${fmt$(result.profitTarget)} (${result.rrRatio}:1 R:R)`);
    navigator.clipboard?.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const barColor =
    result && result.riskPct > 5 ? "#FF3B5C" : result && result.riskPct > 2 ? "#f59e0b" : "#00D97E";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Account Balance ($)">
          <input type="number" step="5000" value={account} onChange={(e) => setAccount(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Risk Type">
          <Toggle
            options={[{ id: "dollar", label: "Dollar" }, { id: "percent", label: "Percent" }]}
            value={riskType}
            onChange={(id) => setRiskType(id as "dollar" | "percent")}
          />
        </Field>
        <Field label={riskType === "dollar" ? "Risk per Trade ($)" : "Risk per Trade (%)"}>
          <input type="number" step="0.5" value={riskValue} onChange={(e) => setRiskValue(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Stop Distance Type">
          <Toggle
            options={[{ id: "points", label: "Points" }, { id: "ticks", label: "Ticks" }]}
            value={stopType}
            onChange={(id) => setStopType(id as "points" | "ticks")}
          />
        </Field>
        <Field label={stopType === "points" ? "Stop Distance (points)" : "Stop Distance (ticks)"}>
          <input type="number" step={contract.tick} value={stopValue} onChange={(e) => setStopValue(e.target.value)} className={inputCls} />
        </Field>
        <Field label="R:R Ratio (optional)" hint="Calculates profit target in dollars">
          <input type="number" step="0.5" value={rr} onChange={(e) => setRr(e.target.value)} placeholder="e.g. 2" className={inputCls} />
        </Field>
      </div>

      <button type="button" onClick={calculate} className="btn-gradient btn-shimmer text-sm px-8 py-3.5">
        <Calculator size={15} /> Calculate Position Size
      </button>

      {result && (
        <div className="animate-[fadeInUp_0.45s_ease]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard label="Contracts" value={String(result.contracts)} sub={`Rounded down from ${result.exact.toFixed(2)}`} />
            <ResultCard label="Dollar Risk" value={fmt$(result.dollarRisk)} sub={`${result.riskPct.toFixed(2)}% of account`} />
            <ResultCard label="Risk Per Contract" value={fmt$(result.riskPerContract)} sub={`${result.ticks.toFixed(1)} ticks · ${result.points.toFixed(2)} pts`} />
            {result.profitTarget != null && result.rrRatio && (
              <ResultCard label="Profit Target" value={fmt$(result.profitTarget)} sub={`${(result.points * result.rrRatio).toFixed(2)} pts · ${result.rrRatio}:1 R:R`} color="#00D97E" />
            )}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider text-[#888]">Risk as % of account</span>
              <span className="font-mono font-bold" style={{ color: barColor }}>{result.riskPct.toFixed(2)}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-[#1a1a1a] border border-[#222] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (result.riskPct / 8) * 100)}%`, background: barColor }}
              />
            </div>
          </div>

          <ActionButtons onCopy={copy} onReset={reset} copied={copied} />
        </div>
      )}
    </div>
  );
}

/* ---------- Tab 2: P&L Estimator ---------- */

function PnLEstimator({ contract }: { contract: FuturesContract }) {
  const [qty, setQty] = useState("1");
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<null | { pnl: number; points: number; ticks: number }>(null);

  const calculate = () => {
    const n = parseFloat(qty) || 0;
    const e = parseFloat(entry);
    const x = parseFloat(exit);
    if (n <= 0 || isNaN(e) || isNaN(x)) return;
    const points = direction === "long" ? x - e : e - x;
    const ticks = points / contract.tick;
    const pnl = points * contract.pointValue * n;
    setResult({ pnl, points, ticks });
    setCopied(false);
  };

  const reset = () => {
    setQty("1"); setEntry(""); setExit(""); setDirection("long");
    setResult(null); setCopied(false);
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard?.writeText(
      [
        `${contract.symbol} — ${contract.name} P&L (${direction.toUpperCase()} × ${qty})`,
        `P&L: ${fmt$(result.pnl, true)}`,
        `Move: ${result.points.toFixed(2)} pts · ${result.ticks.toFixed(1)} ticks`,
      ].join("\n")
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const signColor = result ? (result.pnl >= 0 ? "#00D97E" : "#FF3B5C") : undefined;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Number of Contracts">
          <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Direction">
          <Toggle
            options={[
              { id: "long", label: "Long (Buy)", tone: "green" },
              { id: "short", label: "Short (Sell)", tone: "red" },
            ]}
            value={direction}
            onChange={(id) => setDirection(id as "long" | "short")}
          />
        </Field>
        <Field label="Entry Price">
          <input type="number" step={contract.tick} value={entry} onChange={(e) => setEntry(e.target.value)} placeholder="e.g. 21450.25" className={inputCls} />
        </Field>
        <Field label="Exit Price">
          <input type="number" step={contract.tick} value={exit} onChange={(e) => setExit(e.target.value)} placeholder="e.g. 21510.75" className={inputCls} />
        </Field>
      </div>

      <button type="button" onClick={calculate} className="btn-gradient btn-shimmer text-sm px-8 py-3.5">
        <Calculator size={15} /> Calculate P&amp;L
      </button>

      {result && (
        <div className="animate-[fadeInUp_0.45s_ease]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard label="P&L" value={fmt$(result.pnl, true)} color={signColor} sub={`${qty} contract(s) ${direction}`} />
            <ResultCard label="Move in Points" value={fmt$(result.points, true).replace("$", "")} color={signColor} />
            <ResultCard label="Move in Ticks" value={`${result.ticks >= 0 ? "+" : ""}${result.ticks.toFixed(1)}`} color={signColor} />
          </div>
          <ActionButtons onCopy={copy} onReset={reset} copied={copied} />
        </div>
      )}
    </div>
  );
}

/* ---------- Page ---------- */

export function PositionCalculatorPage() {
  const [tab, setTab] = useState<Tab>("sizer");
  const [contract, setContract] = useState<FuturesContract>(FUTURES_CONTRACTS["E-mini"][0]);

  return (
    <div className="bg-background text-foreground pt-28 pb-20">
      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 text-[#c4b5fd] mb-5">
            <Zap size={12} /> {TOTAL_CONTRACTS} Contracts
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">
            Futures Position Size &amp; <span className="text-gradient">P&amp;L Calculator</span>
          </h1>
          <p className="mt-4 text-[#999] leading-relaxed max-w-xl mx-auto">
            Every major futures instrument, accurate tick value, zero guesswork.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 md:p-8">
          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#222] mb-7">
            {(["sizer", "pnl"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-semibold transition-colors relative ${
                  tab === t ? "text-white" : "text-[#666] hover:text-[#aaa]"
                }`}
              >
                {t === "sizer" ? "Position Sizer" : "P&L Estimator"}
                {tab === t && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-brand rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="mb-7">
            <ContractPicker contract={contract} onChange={setContract} />
          </div>

          <div key={tab} className="animate-[fadeInUp_0.3s_ease]">
            {tab === "sizer" ? (
              <PositionSizer key={contract.symbol} contract={contract} />
            ) : (
              <PnLEstimator key={contract.symbol} contract={contract} />
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-[11px] leading-relaxed text-[#666] text-center max-w-2xl mx-auto">
          For educational use only. Calculations do not account for commissions, exchange fees, NFA
          pass-through fees, slippage, or broker margin requirements. Results do not constitute
          trading advice. Futures trading involves substantial risk of loss and is not suitable for
          all investors.
        </p>
      </div>
    </div>
  );
}

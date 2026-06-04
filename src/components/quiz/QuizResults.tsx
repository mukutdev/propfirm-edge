import { useState } from "react";
import { recommendation, type QuizFirm } from "@/lib/quiz-data";

function ResultCard({ firm, rank }: { firm: QuizFirm; rank: 1 | 2 | 3 }) {
  const [copied, setCopied] = useState(false);
  const isTop = rank === 1;
  const badge =
    rank === 1 ? "🏆 #1 Best Match for You" : rank === 2 ? "🥈 #2 Runner Up" : "🥉 #3 Also Consider";

  return (
    <article
      className={
        "relative flex flex-col gap-5 rounded-2xl border bg-[#141414] p-6 sm:p-8 " +
        (isTop
          ? "border-purple-500/40 shadow-[0_0_60px_-20px_rgba(236,72,153,0.6)]"
          : "border-[#222]")
      }
    >
      <span
        className={
          "inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider " +
          (isTop
            ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white"
            : "border border-[#2a2a2a] bg-[#0c0c0c] text-muted-foreground")
        }
      >
        {badge}
      </span>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] font-display text-xl font-bold text-white">
          {firm.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{firm.name}</h3>
          <p className="text-sm text-yellow-400">{"★".repeat(Math.round(firm.rating))} <span className="text-muted-foreground">{firm.rating}/5</span></p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Why this firm suits you</p>
        <ul className="flex flex-col gap-1.5 text-sm text-white">
          {firm.reasons.map((r) => (
            <li key={r} className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text font-bold text-transparent">✓</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-3 gap-3 rounded-xl border border-[#222] bg-[#0c0c0c] p-4 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Funding</p>
          <p className="mt-1 font-display font-bold text-white">{firm.funding}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Split</p>
          <p className="mt-1 font-display font-bold text-white">{firm.split}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Fee</p>
          <p className="mt-1 font-display font-bold text-white">{firm.fee}</p>
        </div>
      </div>
      {firm.code && isTop && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-purple-500/40 bg-purple-500/5 p-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Your exclusive code</p>
            <p className="font-mono text-lg font-bold text-white">{firm.code}</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(firm.code!);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            }}
            className="rounded-lg border border-purple-500/50 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-500/10"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <div className={"flex flex-col gap-2 sm:flex-row " + (isTop ? "" : "")}>
        <a
          href={`/reviews/${firm.slug}`}
          className="flex-1 rounded-full border border-[#2a2a2a] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:border-purple-500/50"
        >
          Read Full Review
        </a>
        <a
          href="#"
          className="flex-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          Visit + Get Discount
        </a>
      </div>
    </article>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 36 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const dur = 1.6 + Math.random() * 1.2;
        const color = i % 2 ? "#7C3AED" : "#EC4899";
        return (
          <span
            key={i}
            className="absolute top-0 h-2 w-2 rounded-sm"
            style={{
              left: `${left}%`,
              background: color,
              animation: `qfall ${dur}s ease-out ${delay}s forwards`,
              opacity: 0,
            }}
          />
        );
      })}
      <style>{`@keyframes qfall { 0% { transform: translateY(-20px) rotate(0); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }`}</style>
    </div>
  );
}

export function QuizResults({ onRetake }: { onRetake: () => void }) {
  return (
    <div className="flex flex-col gap-6" style={{ animation: "qResultIn 500ms ease-out" }}>
      <style>{`@keyframes qResultIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
      <Confetti />
      <div className="text-center">
        <h2 className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl">
          Your Perfect Match
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Based on your answers, here are your top 3 recommended prop firms:
        </p>
      </div>
      <ResultCard firm={recommendation[0]} rank={1} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ResultCard firm={recommendation[1]} rank={2} />
        <ResultCard firm={recommendation[2]} rank={3} />
      </div>
      <div className="flex flex-col items-center gap-3 pt-2">
        <button onClick={onRetake} className="text-sm text-muted-foreground hover:text-white">
          ↻ Not what you expected? Retake the quiz
        </button>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>Share your result:</span>
          {["X", "Discord", "Copy Link"].map((s) => (
            <button key={s} className="rounded-full border border-[#2a2a2a] bg-[#141414] px-3 py-1 transition hover:border-purple-500/50 hover:text-white">
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#222] bg-[#141414] p-6 sm:flex-row">
        <p className="text-center text-sm text-white sm:text-left">
          Want to compare all firms before deciding?
        </p>
        <a
          href="/compare"
          className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          View Full Comparison →
        </a>
      </div>
    </div>
  );
}